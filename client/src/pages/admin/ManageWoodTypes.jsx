// src/components/ManageWoodTypes.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/common/Loader';
import { fetchWoodTypes, addWoodType, updateWoodType, deleteWoodType } from '../../features/woodtype/woodTypeSlice';

const ManageWoodTypes = () => {
  const dispatch = useDispatch();
  const { woodTypes, loading, error } = useSelector((state) => state.woodTypes);
  
  const [newWoodType, setNewWoodType] = useState({ name: '', pricePerCubicMeter: '' });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', pricePerCubicMeter: '' });

  useEffect(() => {
    dispatch(fetchWoodTypes());
  }, [dispatch]);

  const handleAddWoodType = (e) => {
    e.preventDefault();
    dispatch(addWoodType(newWoodType));
    setNewWoodType({ name: '', pricePerCubicMeter: '' });
  };

  const handleEditClick = (woodType) => {
    setEditId(woodType._id);
    setEditData({ name: woodType.name, pricePerCubicMeter: woodType.pricePerCubicMeter });
  };

  const handleUpdateWoodType = (e) => {
    e.preventDefault();
    dispatch(updateWoodType({ id: editId, woodTypeData: editData }));
    setEditId(null);
  };

  const handleDeleteWoodType = (id) => {
    dispatch(deleteWoodType(id));
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
              onChange={(e) => setNewWoodType({ ...newWoodType, pricePerCubicMeter: e.target.value })}
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
        {woodTypes && woodTypes.length > 0 ? (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Price per Cubic Meter</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {woodTypes.map((wt) => (
                <tr key={wt._id} className="border-b">
                  <td className="px-4 py-2">
                    {editId === wt._id ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="p-2 border rounded"
                      />
                    ) : (
                      wt.name
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editId === wt._id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editData.pricePerCubicMeter}
                        onChange={(e) => setEditData({ ...editData, pricePerCubicMeter: e.target.value })}
                        className="p-2 border rounded"
                      />
                    ) : (
                      wt.pricePerCubicMeter
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editId === wt._id ? (
                      <>
                        <button
                          onClick={handleUpdateWoodType}
                          className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(wt)}
                          className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteWoodType(wt._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
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
