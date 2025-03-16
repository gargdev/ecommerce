import React from "react";

const ProductPageBanner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-64 flex items-center justify-center text-center text-black"
      style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1701590725747-ac131d4dcffd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2Vic2l0ZSUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D')" }}
    >
      <div className="bg-transparent bg-opacity-70 px-6 py-4 rounded-md">
        <h1 className="text-white text-3xl font-semibold mb-5">Shop</h1>
        <p className="text-sm text-white">
          <span className="font-bold">Home</span> &gt; Shop
        </p>
      </div>
    </div>
  );
};

export default ProductPageBanner;
