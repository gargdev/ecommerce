import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../features/orders/orderSlice';
import Loader from '../components/common/Loader';
import { Link } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">User Information</h2>
        <p>
          <strong>Name:</strong> {userInfo.name}
        </p>
        <p>
          <strong>Email:</strong> {userInfo.email}
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <Link to={`/order/${order._id}`} className="text-blue-500">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>You have not placed any orders yet.</p>
        )}
      </section>
    </div>
  );
};

export default Profile;
