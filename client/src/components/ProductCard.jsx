import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice'; // adjust the import path as needed

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const itemData = {
      productId: product._id,
      quantity: 1, // You can adjust or parameterize this value as needed
    };
    dispatch(addItemToCart(itemData));
  };

  const handleBuyNow = async () => {
    const itemData = {
      productId: product._id,
      quantity: 1,
    };
    try {
      // Dispatch the add-to-cart action and wait for it to complete
      await dispatch(addItemToCart(itemData)).unwrap();
      // Navigate to the checkout page once the item is added
      navigate('/checkout');
    } catch (error) {
      console.error('Error adding item to cart', error);
    }
  };

  return (
    <div className='flex flex-col'>
    <div className="border rounded p-4 shadow hover:shadow-lg transition duration-200">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image ? `/uploads/${product.image}` : 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="text-gray-700">${product.basePrice.toFixed(2)}</p>
      </Link>
      
    </div>
    <div className="mt-4 flex justify-between">
    <button 
      onClick={handleAddToCart} 
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
    >
      Add to Cart
    </button>
    <button 
      onClick={handleBuyNow} 
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
    >
      Buy Now
    </button>
  </div>
  </div>
  );
};

export default ProductCard;
