import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrders } from '../../features/admin/adminSlice';
import Loader from '../../components/common/Loader';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const pendingOrders = orders.filter((order) => order.status === 'Pending').length;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-2xl">{totalOrders}</p>
          </div>
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Pending Orders</h2>
            <p className="text-2xl">{pendingOrders}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
