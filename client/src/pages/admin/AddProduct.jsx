// src/pages/admin/AddProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Loader from '../../components/common/Loader';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for product details
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    customizable: false,
    // Optional fields for customizable products
    length: '',
    breadth: '',
    height: '',
    woodType: ''
  });
  const [imageFile, setImageFile] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('customizable', productData.customizable);

      // If the product is customizable, add additional fields
      if (productData.customizable) {
        formData.append('length', productData.length);
        formData.append('breadth', productData.breadth);
        formData.append('height', productData.height);
        formData.append('woodType', productData.woodType);
      }
      if (imageFile) {
        formData.append('image', imageFile);
      }
      // Send POST request to the admin product creation endpoint
      await api.post('/api/admin/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false);
      navigate('/admin/products');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      {loading && <Loader />}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
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
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="customizable"
            checked={productData.customizable}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Customizable</label>
        </div>
        {productData.customizable && (
          <>
            <div>
              <label className="block mb-1">Length:</label>
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
              <label className="block mb-1">Breadth:</label>
              <input
                type="number"
                name="breadth"
                value={productData.breadth}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Height:</label>
              <input
                type="number"
                name="height"
                value={productData.height}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Wood Type ID:</label>
              <input
                type="text"
                name="woodType"
                value={productData.woodType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </>
        )}
        <div>
          <label className="block mb-1">Product Image:</label>
          <input type="file" onChange={handleFileChange} className="w-full" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
