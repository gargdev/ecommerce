import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/common/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading, error } = useSelector((state) => state.products);

  // Find the product by id
  const product = products.find((item) => item._id === id);

  // Determine if product has variants and if it's customizable
  const hasVariants = product && product.variants && product.variants.length > 0;
  const isCustomizable = product && product.isCustomizable;

  // State to decide which pricing mode to use.
  // If a product is customizable and also has variants, user can toggle.
  const [useCustomization, setUseCustomization] = useState(isCustomizable);
  
  // States for customization options
  const [length, setLength] = useState('');
  const [breadth, setBreadth] = useState('');
  const [height, setHeight] = useState('');
  const [selectedWood, setSelectedWood] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // States for variant selection
  const [selectedVariants, setSelectedVariants] = useState({});
  const [variantPrice, setVariantPrice] = useState(0);

  // When product loads, set defaults for wood option, variant options, and pricing mode.
  useEffect(() => {
    if (product) {
      if (isCustomizable && product.woodTypes && product.woodTypes.length > 0) {
        setSelectedWood(product.woodTypes[0]._id);
      }
      if (hasVariants) {
        const defaults = {};
        product.variants.forEach((variant) => {
          if (variant.options && variant.options.length > 0) {
            defaults[variant._id] = variant.options[0]._id;
          }
        });
        setSelectedVariants(defaults);
      }
      // Default mode: if product is customizable, use customization; otherwise variant mode.
      setUseCustomization(isCustomizable);
    }
  }, [product, isCustomizable, hasVariants]);

  // Recalculate customization price when dimensions or selected wood type change.
  useEffect(() => {
    if (product && isCustomizable) {
      const l = parseFloat(length);
      const b = parseFloat(breadth);
      const h = parseFloat(height);
      if (isNaN(l) || isNaN(b) || isNaN(h)) {
        setCalculatedPrice(0);
        return;
      }
      const volume = l * b * h; // volume in cubic meters
      const woodOption = product.woodTypes.find((wood) => wood._id === selectedWood);
      if (!woodOption) {
        setCalculatedPrice(0);
        return;
      }
      const woodPrice = woodOption.price; // price per cubic meter
      setCalculatedPrice(volume * woodPrice);
    }
  }, [length, breadth, height, selectedWood, product, isCustomizable]);

  // Recalculate variant price when variant selections change.
  useEffect(() => {
    if (product && hasVariants) {
      let total = 0;
      product.variants.forEach((variant) => {
        const selectedOptionId = selectedVariants[variant._id];
        const option = variant.options.find((opt) => opt._id === selectedOptionId);
        if (option) {
          total += option.priceAdjustment; // add variant price adjustment
        }
      });
      setVariantPrice(total);
    }
  }, [selectedVariants, product, hasVariants]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div className="text-gray-500">Product not found.</div>;

  // Calculate the final price based on the selected mode.
  const finalPrice = useCustomization
    ? calculatedPrice
    : product.basePrice + variantPrice;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image ? `/uploads/${product.image}` : 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">Price: ${finalPrice.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>

          {/* Toggle only when product is customizable and has variant options */}
          {isCustomizable && hasVariants && (
            <div className="mb-4">
              <button
                onClick={() => setUseCustomization(true)}
                className={`mr-2 p-2 border ${useCustomization ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
              >
                Customize
              </button>
              <button
                onClick={() => setUseCustomization(false)}
                className={`p-2 border ${!useCustomization ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
              >
                Select Variant
              </button>
            </div>
          )}

          {/* Render Customization Form if in customization mode */}
          {(isCustomizable && useCustomization) && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Customize Your Product</h2>
              <form className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div>
                    <label htmlFor="length" className="block font-medium">
                      Length (m)
                    </label>
                    <input
                      id="length"
                      type="number"
                      step="0.01"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="breadth" className="block font-medium">
                      Breadth (m)
                    </label>
                    <input
                      id="breadth"
                      type="number"
                      step="0.01"
                      value={breadth}
                      onChange={(e) => setBreadth(e.target.value)}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="height" className="block font-medium">
                      Height (m)
                    </label>
                    <input
                      id="height"
                      type="number"
                      step="0.01"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="border rounded p-2"
                    />
                  </div>
                </div>
                {product.woodTypes && product.woodTypes.length > 0 && (
                  <div>
                    <label htmlFor="woodType" className="block font-medium">
                      Select Wood Type
                    </label>
                    <select
                      id="woodType"
                      value={selectedWood}
                      onChange={(e) => setSelectedWood(e.target.value)}
                      className="border rounded p-2"
                    >
                      {product.woodTypes.map((wood) => (
                        <option key={wood._id} value={wood._id}>
                          {wood.woodType.name.trim()} - ${wood.price.toFixed(2)}/m³
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </form>
              <div className="mt-4">
                <h3 className="text-xl font-medium">Calculated Price:</h3>
                <p className="text-lg font-bold">${calculatedPrice.toFixed(2)}</p>
              </div>
            </div>
          )}

          {/* Render Variant Selection Form if in variant mode or if product is not customizable */}
          {((!isCustomizable) || (hasVariants && !useCustomization)) && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Select Variants</h2>
              <form className="space-y-4">
                {product.variants.map((variant) => (
                  <div key={variant._id}>
                    <label htmlFor={`variant-${variant._id}`} className="block font-medium">
                      {variant.type}
                    </label>
                    <select
                      id={`variant-${variant._id}`}
                      value={selectedVariants[variant._id] || ''}
                      onChange={(e) =>
                        setSelectedVariants((prev) => ({
                          ...prev,
                          [variant._id]: e.target.value,
                        }))
                      }
                      className="border rounded p-2"
                    >
                      {variant.options.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name} {option.priceAdjustment ? `(+ $${option.priceAdjustment.toFixed(2)})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </form>
              <div className="mt-4">
                <h3 className="text-xl font-medium">Price:</h3>
                <p className="text-lg font-bold">${(product.basePrice + variantPrice).toFixed(2)}</p>
              </div>
            </div>
          )}

          {/* Fallback: for non-customizable products without variants, list wood options if available */}
          {!isCustomizable && !hasVariants && product.woodTypes && product.woodTypes.length > 0 && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Wood Options</h2>
              <ul>
                {product.woodTypes.map((wood) => (
                  <li key={wood._id} className="mb-1">
                    <span className="font-semibold">{wood.woodType.name.trim()}</span> - ${wood.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
