import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition duration-200">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image ? `/uploads/${product.image}` : 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="text-gray-700">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
