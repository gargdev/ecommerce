import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/common/Loader';
import ProductPageBanner from '../components/Product/ProductPageBanner';
import ProductFilters from '../components/Product/ProductFilters';
import Shiping from '../components/Home/Shiping';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className='mb-6 mt-18'>
      {/* <h1 className="text-3xl font-bold mb-6 mt-30">Products</h1> */}
      {<ProductPageBanner/>}
      {<ProductFilters/>}
      {loading ? (
  <Loader />
) : error ? (
  <div className="text-red-500 text-center">{error}</div>
) : (
  <div className="px-5 md:px-10 lg:px-20 py-7">
    <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </div>
)}

      {<Shiping/>}
    </div>
  );
};

export default Products;
