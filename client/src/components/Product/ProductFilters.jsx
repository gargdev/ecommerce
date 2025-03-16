import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";

const ProductFilters = () => {
  const dispatch = useDispatch();

  // Filter state
  const [filters, setFilters] = useState({
    viewMode: "grid",
    itemsPerPage: 16,
    sortBy: "default",
  });

  // Handle filter change and dispatch new fetch request
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...newFilters };
      dispatch(fetchProducts(updatedFilters)); // Dispatch action with updated filters
      return updatedFilters;
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between bg-gray-100 p-4 rounded-md">
      {/* Filter Button */}
      <button className="flex items-center gap-2 text-gray-700 hover:text-black font-medium">
        <span className="material-icons">tune</span> Filter
      </button>

      {/* View Mode Toggle */}
      <div className="flex gap-2">
        <button
          className={`p-2 border rounded-md ${filters.viewMode === "list" ? "bg-gray-300" : "hover:bg-gray-200"}`}
          onClick={() => handleFilterChange({ viewMode: "list" })}
        >
          <span className="material-icons">view_list</span>
        </button>
        <button
          className={`p-2 border rounded-md ${filters.viewMode === "grid" ? "bg-gray-300" : "hover:bg-gray-200"}`}
          onClick={() => handleFilterChange({ viewMode: "grid" })}
        >
          <span className="material-icons">grid_view</span>
        </button>
      </div>

      {/* Showing Results Info */}
      <p className="text-gray-600 text-sm">Showing 1-{filters.itemsPerPage} results</p>

      {/* Show Per Page Dropdown */}
      <div className="flex items-center gap-2">
        <span>Show</span>
        <select
          className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none"
          value={filters.itemsPerPage}
          onChange={(e) => handleFilterChange({ itemsPerPage: Number(e.target.value) })}
        >
          {[16, 32, 48, 64].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Sorting Dropdown */}
      <div className="flex items-center gap-2">
        <span>Sort by</span>
        <select
          className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
        >
          <option value="default">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
