import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeItemFromCart } from '../features/cart/cartSlice';
import Loader from '../components/common/Loader';
import { Link } from 'react-router-dom';
import Shiping from '../components/Home/Shiping';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Calculate total price from cart items
  const totalPrice = cart
    ? cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  // Remove using the unique cart item ID
  const handleRemove = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  return (
    <div className='mt-30'>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : cart && cart.items.length > 0 ? (
        <div className="space-y-4">
          {cart.items.map((item) => {
            // Determine product info for display purposes
            const productId =
              typeof item.product === 'object' ? item.product._id : item.product;
            return (
              <div key={item._id} className="flex items-center justify-between border p-4 rounded">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images?.[0]}
                    alt={typeof item.product === 'object' ? item.product.name : 'Product'}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {typeof item.product === 'object' ? item.product.name : 'Product'}
                    </h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="text-right text-xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <div className="text-right">
            <Link to="/checkout" className="bg-blue-500 text-white px-6 py-2 rounded">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/products" className="text-blue-500">Shop now</Link>
        </div>
      )}
      {<Shiping/>}
    </div>
  );
};

export default Cart;
