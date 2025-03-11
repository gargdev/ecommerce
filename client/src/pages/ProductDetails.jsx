import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/common/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading, error } = useSelector((state) => state.products);

  // Find the product by id from the list of products
  const product = products.find((item) => item._id === id);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div className="text-gray-500">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image ? `/uploads/${product.image}` : 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          
          {/* If the product is customizable, we can render a customization form */}
          {product.customizable && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Customize Your Product</h2>
              {/* Render a custom form component or additional controls here */}
              <p className="text-gray-500">[Customization options form goes here]</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
