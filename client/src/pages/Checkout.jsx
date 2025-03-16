import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../features/orders/orderSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { orders } = useSelector((state) => state.orders);

  // Calculate total price from cart items
  const totalPrice = cart
    ? cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const handlePlaceOrder = async () => {
    try {
      // Build order data from cart items
      const orderData = {
        items: cart.items,
        totalAmount: totalPrice,
      };
      // Dispatch the place order async action
      const resultAction = await dispatch(placeOrder(orderData));
      if (placeOrder.fulfilled.match(resultAction)) {
        // Order placed successfully; navigate to order confirmation page
        navigate('/order-confirmation');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-30">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {loading && <Loader />}
      {error && <div className="text-red-500">{error}</div>}
      {cart && cart.items.length > 0 ? (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.product} className="flex justify-between border-b pb-2">
              <div>
                <h2 className="text-xl">{item.product.name}</h2>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="text-right text-2xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <div className="text-right">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div>Your cart is empty.</div>
      )}
    </div>
  );
};

export default Checkout;
