// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addItemToCart } from '../features/cart/cartSlice';

// const ProductCard = ({ product }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleAddToCart = async () => {
//     const itemData = {
//       productId: product._id,
//       quantity: 1,
//       price: product.basePrice,
//       // The itemKey will be generated in the cart slice
//       // We don't need to specify it here anymore
//     };

//     try {
//       await dispatch(addItemToCart(itemData)).unwrap();
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//     }
//   };

//   const handleBuyNow = async () => {
//     const itemData = {
//       productId: product._id,
//       quantity: 1,
//       price: product.basePrice,
//     };

//     try {
//       await dispatch(addItemToCart(itemData)).unwrap();
//       navigate('/checkout');
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="border rounded p-4 shadow hover:shadow-lg transition duration-200">
//         <Link to={`/product/${product._id}`}>
//           <img
//             src={product.images?.[0] || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80'}
//             alt={product.name}
//             className="w-full h-48 object-cover mb-4 rounded"
//           />
//           <h3 className="text-lg font-bold mb-2">{product.name}</h3>
//           <p className="text-gray-700">${product.basePrice.toFixed(2)}</p>
//           {product.isCustomizable && (
//             <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
//               Customizable
//             </span>
//           )}
//           {product.variants?.length > 0 && (
//             <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-2 ml-2">
//               Multiple Options
//             </span>
//           )}
//         </Link>
//       </div>
//       <div className="mt-4 flex justify-between gap-4">
//         <button 
//           onClick={handleAddToCart} 
//           className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-200 font-semibold"
//         >
//           Add to Cart
//         </button>
//         <button 
//           onClick={handleBuyNow} 
//           className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-200 font-semibold"
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import { ChevronLeft, ChevronRight, Edit, Trash2, Plus } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.images?.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80'];

  const handleAddToCart = async () => {
    const itemData = {
      productId: product._id,
      quantity: 1,
      price: product.basePrice,
    };

    try {
      await dispatch(addItemToCart(itemData)).unwrap();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleBuyNow = async () => {
    const itemData = {
      productId: product._id,
      quantity: 1,
      price: product.basePrice,
    };

    try {
      await dispatch(addItemToCart(itemData)).unwrap();
      navigate('/checkout');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col">
      <div className="border rounded p-4 shadow hover:shadow-lg transition duration-200 relative">
        
          <div className="relative w-full h-48">
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover rounded"
            />
            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePrevImage} 
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-700"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleNextImage} 
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-700"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
          <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold mt-2">{product.name}</h3>
          <p className="text-gray-700">${product.basePrice.toFixed(2)}</p>
          {product.isCustomizable && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
              Customizable
            </span>
          )}
          {product.variants?.length > 0 && (
            <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-2 ml-2">
              Multiple Options
            </span>
          )}
        </Link>
      </div>
      <div className="mt-4 flex justify-between gap-4">
        <button 
          onClick={handleAddToCart} 
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-200 font-semibold"
        >
          Add to Cart
        </button>
        <button 
          onClick={handleBuyNow} 
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-200 font-semibold"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
