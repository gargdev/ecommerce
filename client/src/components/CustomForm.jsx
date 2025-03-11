// src/components/CustomForm.jsx
import React from 'react';

const CustomForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onSubmit({}); // Replace with actual form data
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Length:</label>
        <input type="number" className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label className="block">Width:</label>
        <input type="number" className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label className="block">Height:</label>
        <input type="number" className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label className="block">Select Wood Type:</label>
        <select className="w-full p-2 border rounded" required>
          <option value="">Select Wood Type</option>
          {/* Populate options from wood types */}
        </select>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Calculate Price
      </button>
    </form>
  );
};

export default CustomForm;
