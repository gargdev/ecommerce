import React from "react";

const categories = [
  {
    name: "Dining",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80",
  },
  {
    name: "Living",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80",
  },
  {
    name: "Bedroom",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80",
  },
];

const Browse = () => {
  return (
    <div className="mb-10 relative overflow-hidden mt-10 px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold">Browse The Range</h1>
        <p className="text-md text-gray-600">
          Find our best collection that fits your home
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={category.image}
              alt={category.name}
              className="w-80 h-100 object-cover rounded-lg shadow-md"
            />
            <p className="mt-2 text-lg font-medium">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
