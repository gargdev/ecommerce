import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  // Assume the latest order is the last in the orders array
  const { orders } = useSelector((state) => state.orders);
  const latestOrder = orders[orders.length - 1];

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
      {latestOrder ? (
        <div>
          <p className="mb-4">Thank you for your purchase! Your order has been placed successfully.</p>
          <p>Order ID: {latestOrder._id}</p>
          <p>Total Amount: ${latestOrder.totalAmount.toFixed(2)}</p>
          <Link to="/profile" className="text-blue-500 mt-4 inline-block">
            View Order Details
          </Link>
        </div>
      ) : (
        <p>No order details found.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
