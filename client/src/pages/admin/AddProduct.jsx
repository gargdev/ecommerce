import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Loader from '../../components/common/Loader';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    category: '',
    basePrice: '',
    isCustomizable: false,
    length: '',
    width: '',
    height: '',
    selectedWoodTypes: [],
  });

  // State for dynamic variants
  const [variants, setVariants] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [woodTypes, setWoodTypes] = useState([]);

  useEffect(() => {
    const fetchWoodTypes = async () => {
      try {
        const response = await api.get('/api/wood');
        setWoodTypes(response.data);
      } catch (err) {
        console.error("Error fetching wood types:", err);
      }
    };
    fetchWoodTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (type === 'checkbox') {
      setProductData({ ...productData, [name]: checked });
    } else if (type === 'select-multiple') {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setProductData({ ...productData, [name]: selectedValues });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Variant management functions
  const addVariantType = () => {
    setVariants([
      ...variants,
      { type: '', dataType: 'string', options: [{ name: '', priceAdjustment: '' }] },
    ]);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addOption = (variantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options.push({ name: '', priceAdjustment: '' });
    setVariants(newVariants);
  };

  const handleOptionChange = (variantIndex, optionIndex, field, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options[optionIndex][field] = field === 'priceAdjustment' ? parseFloat(value) || '' : value;
    setVariants(newVariants);
  };

  const removeOption = (variantIndex, optionIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options.splice(optionIndex, 1);
    if (newVariants[variantIndex].options.length === 0) {
      newVariants.splice(variantIndex, 1);
    }
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      formData.append('basePrice', productData.basePrice);
      formData.append('isCustomizable', productData.isCustomizable);

      if (productData.isCustomizable) {
        formData.append('length', productData.length);
        formData.append('width', productData.width);
        formData.append('height', productData.height);
      }

      // Append variants as JSON string
      formData.append('variants', JSON.stringify(variants));
      // Append selected wood types as JSON string
      formData.append('woodTypes', JSON.stringify(productData.selectedWoodTypes));

      if (imageFile) {
        formData.append('image', imageFile);
      } else {
        setLoading(false);
        setError("Product image is required.");
        return;
      }

      await api.post('/api/admin/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false);
      navigate('/admin/products');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      {loading && <Loader />}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        {/* Basic Details */}
        <div>
          <label className="block mb-1 font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Base Price:</label>
          <input
            type="number"
            name="basePrice"
            value={productData.basePrice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Toggle for Customizable */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isCustomizable"
            checked={productData.isCustomizable}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-semibold">Customizable</label>
        </div>

        {/* Dimensions if customizable */}
        {productData.isCustomizable && (
          <>
            <div>
              <label className="block mb-1 font-semibold">Length:</label>
              <input
                type="number"
                name="length"
                value={productData.length}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Width:</label>
              <input
                type="number"
                name="width"
                value={productData.width}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Height:</label>
              <input
                type="number"
                name="height"
                value={productData.height}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </>
        )}

        {/* Variants Section */}
        <div>
          <label className="block mb-1 font-semibold">Variants:</label>
          <button
            type="button"
            onClick={addVariantType}
            className="bg-green-500 text-white px-4 py-2 rounded mb-2"
          >
            Add Variant Type
          </button>
          {variants.map((variant, variantIndex) => (
            <div key={variantIndex} className="border p-4 mb-4 rounded">
              <div className="mb-2">
                <label className="block mb-1">Variant Type:</label>
                <input
                  type="text"
                  value={variant.type}
                  onChange={(e) => handleVariantChange(variantIndex, 'type', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Size, Weight"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Data Type:</label>
                <select
                  value={variant.dataType}
                  onChange={(e) => handleVariantChange(variantIndex, 'dataType', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Options:</label>
                {variant.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={option.name}
                      onChange={(e) =>
                        handleOptionChange(variantIndex, optionIndex, 'name', e.target.value)
                      }
                      className="w-1/2 p-2 border rounded"
                      placeholder="Option Name"
                      required
                    />
                    <input
                      type="number"
                      value={option.priceAdjustment}
                      onChange={(e) =>
                        handleOptionChange(variantIndex, optionIndex, 'priceAdjustment', e.target.value)
                      }
                      className="w-1/3 p-2 border rounded"
                      placeholder="Price Adjustment"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(variantIndex, optionIndex)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(variantIndex)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Add Option
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Wood Types Selection */}
        <div>
          <label className="block mb-1 font-semibold">Select Wood Types:</label>
          <select
            name="selectedWoodTypes"
            multiple
            value={productData.selectedWoodTypes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            {woodTypes.map((wood) => (
              <option key={wood._id} value={wood._id}>
                {wood.name} (${wood.pricePerCubicMeter}/m³)
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500">
            Hold down Ctrl (or Command on Mac) to select multiple wood types.
          </p>
        </div>

        {/* Product Image */}
        <div>
          <label className="block mb-1 font-semibold">Product Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;