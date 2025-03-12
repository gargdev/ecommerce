import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productSlice';
import Loader from '../../components/common/Loader';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (productId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      await axios.delete(`/api/products/${productId}`, config);
      dispatch(fetchProducts()); // Refresh the product list after deletion
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>

      <div className="flex justify-end mb-4">
        <Link
          to="/admin/product/new"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Add New Product
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-gray-500 text-center">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg shadow-lg p-4 bg-white">
              {/* Product Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={`/uploads/${product.image}`}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded"
                />
              </div>

              {/* Product Details */}
              <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-lg font-semibold text-blue-500">
                Price: ${product.basePrice.toFixed(2)}
              </p>
              <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
              </p>

              {/* Variants */}
              {product.variants?.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-700">Variants:</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {product.variants.map((variant) => (
                      <li key={variant._id}>
                        <strong>{variant.type}:</strong>{' '}
                        {variant.options.map((opt) => `${opt.name} (+$${opt.priceAdjustment})`).join(', ')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Wood Types */}
              {product.woodTypes?.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-700">Wood Types:</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {product.woodTypes.map(({ woodType, price }) => (
                      <li key={woodType._id}>
                        {woodType.name} - ${price} per cubic meter
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 flex justify-between items-center">
                <Link to={`/admin/product/edit/${product._id}`} className="text-blue-500 hover:underline">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
