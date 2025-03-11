import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Loader from '../../components/common/Loader';

const ManageWoodTypes = () => {
  const [woodTypes, setWoodTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newWoodType, setNewWoodType] = useState({ name: '', pricePerCubicMeter: '' });

  const fetchWoodTypes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/wood');
      setWoodTypes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch wood types');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWoodTypes();
  }, []);

  const handleAddWoodType = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const response = await api.post('/api/wood', newWoodType, config);
      setWoodTypes([...woodTypes, response.data]);
      setNewWoodType({ name: '', pricePerCubicMeter: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add wood type');
    }
  };

  const handleUpdatePrice = async (id, pricePerCubicMeter) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const response = await axios.put(`/api/wood/${id}`, { pricePerCubicMeter }, config);
      setWoodTypes(woodTypes.map((wt) => (wt._id === id ? response.data : wt)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update wood price');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Wood Types</h1>
      {loading && <Loader />}
      {error && <div className="text-red-500">{error}</div>}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Wood Type</h2>
        <form onSubmit={handleAddWoodType} className="space-y-4">
          <div>
            <label className="block">Name:</label>
            <input
              type="text"
              value={newWoodType.name}
              onChange={(e) => setNewWoodType({ ...newWoodType, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block">Price per Cubic Meter:</label>
            <input
              type="number"
              step="0.01"
              value={newWoodType.pricePerCubicMeter}
              onChange={(e) =>
                setNewWoodType({ ...newWoodType, pricePerCubicMeter: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Wood Type
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Existing Wood Types</h2>
        {woodTypes.length > 0 ? (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Price per Cubic Meter</th>
                {/* <th className="px-4 py-2 border">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {woodTypes.map((wt) => (
                <tr key={wt._id} className="border-b">
                  <td className="px-4 py-2">{wt.name}</td>
                  <td className="px-4 py-2">{wt.pricePerCubicMeter}</td>
                  {/* <td className="px-4 py-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="New Price"
                      className="p-2 border rounded mr-2"
                      onBlur={(e) => handleUpdatePrice(wt._id, e.target.value)}
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No wood types found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageWoodTypes;
