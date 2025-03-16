import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 8));
    }
  }, [products]);

  // Function to get the correct price
  const getProductPrice = (product) => {
    if (product.basePrice) return product.basePrice;
    if (product.variants?.length > 0 && product.variants[0].options?.length > 0) {
      return product.variants[0].options[0].price;
    }
    return "Price not available"; // Fallback
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md overflow-hidden cursor-pointer relative group"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img 
              src={product.images?.[0] || "/placeholder.jpg"} 
              alt={product.name} 
              className="w-full h-56 object-cover" />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-2">
                  <span className="text-xl font-bold text-gray-900">
                    Rs {getProductPrice(product).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-50 flex items-center justify-center transition-opacity duration-300">
                <button className="bg-white px-4 py-2 font-semibold shadow-md">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
      <button
  className="bg-white text-[#B88E2F] px-6 py-2 font-semibold border border-[#B88E2F] hover:bg-[#B88E2F] hover:text-white transition-colors duration-300"
  onClick={() => navigate("/products")}
>
  Show More
</button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
