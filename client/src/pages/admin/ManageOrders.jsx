import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrders } from '../../features/admin/adminSlice';
import Loader from '../../components/common/Loader';
import axios from 'axios';

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      await axios.put(`/api/admin/order/${orderId}`, { status: newStatus }, config);
      dispatch(fetchAdminOrders());
    } catch (err) {
      console.error('Status update error', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>User:</strong> {order.user.name}
              </p>
              <p>
                <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
              </p>
              <p>
                <strong>Current Status:</strong> {order.status}
              </p>
              <div className="mt-2">
                <select
                  defaultValue={order.status}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
