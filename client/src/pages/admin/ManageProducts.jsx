// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, deleteProduct } from '../../features/products/productSlice';
// import Loader from '../../components/common/Loader';
// import { Link } from 'react-router-dom';

// const ManageProducts = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleDelete = (productId) => {
//     dispatch(deleteProduct(productId))
//       .unwrap()
//       .catch((err) => {
//         console.error('Delete error', err);
//       });
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>
//       <div className="flex justify-end mb-4">
//         <Link
//           to="/admin/product/new"
//           className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
//         >
//           Add New Product
//         </Link>
//       </div>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <div className="text-red-500 text-center">{error}</div>
//       ) : products.length === 0 ? (
//         <div className="text-gray-500 text-center">No products found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {products.map((product) => (
//             <div key={product._id} className="border rounded-lg shadow-lg p-4 bg-white">
//               <div className="flex justify-center mb-4">
//                 <img
//                   src={product.image} // Use Cloudinary URL directly
//                   alt={product.name}
//                   className="w-40 h-40 object-cover rounded"
//                 />
//               </div>
//               <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
//               <p className="text-gray-600">Category: {product.category}</p>
//               <p className="text-lg font-semibold text-blue-500">
//                 Price: ${product.basePrice.toFixed(2)}
//               </p>
//               <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                 {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
//               </p>
//               {product.variants?.length > 0 && (
//                 <div className="mt-3">
//                   <h3 className="font-semibold text-gray-700">Variants:</h3>
//                   <ul className="list-disc pl-5 text-gray-600">
//                     {product.variants.map((variant) => (
//                       <li key={variant._id}>
//                         <strong>{variant.type}:</strong>{' '}
//                         {variant.options.map((opt) => `${opt.name} (+$${opt.priceAdjustment})`).join(', ')}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {product.woodTypes?.length > 0 && (
//                 <div className="mt-3">
//                   <h3 className="font-semibold text-gray-700">Wood Types:</h3>
//                   <ul className="list-disc pl-5 text-gray-600">
//                     {product.woodTypes.map(({ woodType, price }) => (
//                       <li key={woodType._id}>
//                         {woodType.name} - ${price} per cubic meter
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               <div className="mt-4 flex justify-between items-center">
//                 <Link to={`/admin/product/edit/${product._id}`} className="text-blue-500 hover:underline">
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(product._id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageProducts;

// import React from 'react';
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchProducts, deleteProduct } from "../../features/products/productSlice"
// import Loader from "../../components/common/Loader"
// import { Link } from "react-router-dom"
// import { ChevronLeft, ChevronRight, Edit, Trash2, Plus } from "lucide-react"

// const ManageProducts = () => {
//   const dispatch = useDispatch()
//   const { products, loading, error } = useSelector((state) => state.products)

//   // State to track current image for each product
//   const [currentImages, setCurrentImages] = useState({})

//   useEffect(() => {
//     dispatch(fetchProducts())
//   }, [dispatch])

//   useEffect(() => {
//     // Initialize current image index for each product
//     if (products?.length) {
//       const imageIndexes = {}
//       products.forEach((product) => {
//         imageIndexes[product._id] = 0
//       })
//       setCurrentImages(imageIndexes)
//     }
//   }, [products])

//   const handleDelete = (productId) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       dispatch(deleteProduct(productId))
//         .unwrap()
//         .catch((err) => {
//           console.error("Delete error", err)
//         })
//     }
//   }

//   const nextImage = (productId, imagesArray) => {
//     setCurrentImages((prev) => ({
//       ...prev,
//       [productId]: (prev[productId] + 1) % imagesArray.length,
//     }))
//   }

//   const prevImage = (productId, imagesArray) => {
//     setCurrentImages((prev) => ({
//       ...prev,
//       [productId]: (prev[productId] - 1 + imagesArray.length) % imagesArray.length,
//     }))
//   }

//   // Helper function to get images array (handles both string and array)
//   const getImagesArray = (image) => {
//     if (Array.isArray(image)) return image
//     return [image] // If it's a string, wrap it in an array
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//         Manage Products
//       </h1>

//       <div className="flex justify-end mb-6">
//         <Link
//           to="/admin/product/new"
//           className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//         >
//           <Plus size={18} />
//           <span>Add New Product</span>
//         </Link>
//       </div>

//       {loading ? (
//         <div className="flex justify-center my-12">
//           <Loader />
//         </div>
//       ) : error ? (
//         <div className="text-red-500 text-center p-8 bg-red-50 rounded-lg border border-red-200">{error}</div>
//       ) : products.length === 0 ? (
//         <div className="text-gray-500 text-center p-12 bg-gray-50 rounded-lg border border-gray-200">
//           No products found. Click "Add New Product" to create one.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => {
//             const imagesArray = getImagesArray(product.image)
//             const currentImageIndex = currentImages[product._id] || 0

//             return (
//               <div
//                 key={product._id}
//                 className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white flex flex-col"
//               >
//                 <div className="relative h-64 bg-gray-100">
//                   {/* Image carousel */}
//                   <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
//                     <img
//                       src={imagesArray[currentImageIndex] || "/placeholder.svg"}
//                       alt={product.name}
//                       className="w-full h-full object-contain"
//                     />

//                     {/* Image navigation arrows (only show if multiple images) */}
//                     {imagesArray.length > 1 && (
//                       <>
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault()
//                             prevImage(product._id, imagesArray)
//                           }}
//                           className="absolute left-2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
//                           aria-label="Previous image"
//                         >
//                           <ChevronLeft size={20} />
//                         </button>
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault()
//                             nextImage(product._id, imagesArray)
//                           }}
//                           className="absolute right-2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
//                           aria-label="Next image"
//                         >
//                           <ChevronRight size={20} />
//                         </button>

//                         {/* Image counter */}
//                         <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
//                           {currentImageIndex + 1}/{imagesArray.length}
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 <div className="p-5 flex-grow flex flex-col">
//                   <div className="mb-4">
//                     <div className="flex justify-between items-start">
//                       <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{product.name}</h2>
//                       <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
//                         {product.category}
//                       </span>
//                     </div>

//                     <div className="mt-3 flex justify-between items-center">
//                       <p className="text-lg font-semibold text-blue-600">${product.basePrice.toFixed(2)}</p>
//                       <p
//                         className={`text-sm font-medium px-2.5 py-1 rounded-full ${
//                           product.stock > 10
//                             ? "bg-green-100 text-green-800"
//                             : product.stock > 0
//                               ? "bg-yellow-100 text-yellow-800"
//                               : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {product.stock > 10
//                           ? `In Stock (${product.stock})`
//                           : product.stock > 0
//                             ? `Low Stock (${product.stock})`
//                             : "Out of Stock"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Variants */}
//                   {product.variants?.length > 0 && (
//                     <div className="mt-2 mb-3">
//                       <h3 className="font-semibold text-gray-700 text-sm mb-1">Variants:</h3>
//                       <div className="max-h-24 overflow-y-auto pr-1 text-sm">
//                         {product.variants.map((variant) => (
//                           <div key={variant._id} className="mb-1.5">
//                             <span className="font-medium text-gray-700">{variant.type}:</span>{" "}
//                             <span className="text-gray-600">
//                               {variant.options.map((opt) => `${opt.name} (+$${opt.priceAdjustment})`).join(", ")}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Wood Types */}
//                   {product.woodTypes?.length > 0 && (
//                     <div className="mt-2 mb-3">
//                       <h3 className="font-semibold text-gray-700 text-sm mb-1">Wood Types:</h3>
//                       <div className="max-h-24 overflow-y-auto pr-1 text-sm">
//                         {product.woodTypes.map(({ woodType, price }) => (
//                           <div key={woodType._id} className="mb-1">
//                             <span className="text-gray-600">
//                               {woodType.name} - ${price} per cubic meter
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
//                     <Link
//                       to={`/admin/product/edit/${product._id}`}
//                       className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                     >
//                       <Edit size={16} />
//                       <span>Edit</span>
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(product._id)}
//                       className="flex items-center gap-1.5 text-red-500 hover:text-red-700 font-medium transition-colors"
//                     >
//                       <Trash2 size={16} />
//                       <span>Delete</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       )}
//     </div>
//   )
// }

// export default ManageProducts

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../features/products/productSlice";
import Loader from "../../components/common/Loader";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Edit, Trash2, Plus } from "lucide-react";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // Track current image index per product
  const [currentImages, setCurrentImages] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products?.length) {
      const imageIndexes = {};
      products.forEach((product) => {
        imageIndexes[product._id] = 0;
      });
      setCurrentImages(imageIndexes);
    }
  }, [products]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId))
        .unwrap()
        .catch((err) => {
          console.error("Delete error", err);
        });
    }
  };

  const nextImage = (productId, imagesArray) => {
    setCurrentImages((prev) => ({
      ...prev,
      [productId]: (prev[productId] + 1) % imagesArray.length,
    }));
  };

  const prevImage = (productId, imagesArray) => {
    setCurrentImages((prev) => ({
      ...prev,
      [productId]: (prev[productId] - 1 + imagesArray.length) % imagesArray.length,
    }));
  };

  // Helper to ensure we always work with an array
  const getImagesArray = (images) => {
    if (Array.isArray(images)) return images;
    return [images];
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Manage Products
      </h1>

      <div className="flex justify-end mb-6">
        <Link
          to="/admin/product/new"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add New Product</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <Loader />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-8 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="text-gray-500 text-center p-12 bg-gray-50 rounded-lg border border-gray-200">
          No products found. Click "Add New Product" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            // Use product.images (not product.image) here
            const imagesArray = getImagesArray(product.images);
            const currentImageIndex = currentImages[product._id] || 0;

            return (
              <div
                key={product._id}
                className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white flex flex-col"
              >
                <div className="relative h-64 bg-gray-100">
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <img
                      src={imagesArray[currentImageIndex] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />

                    {/* Show navigation only if more than one image */}
                    {imagesArray.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            prevImage(product._id, imagesArray);
                          }}
                          className="absolute left-2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            nextImage(product._id, imagesArray);
                          }}
                          className="absolute right-2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                          {currentImageIndex + 1}/{imagesArray.length}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-4">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                        {product.name}
                      </h2>
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <p className="text-lg font-semibold text-blue-600">
                        ${product.basePrice.toFixed(2)}
                      </p>
                      <p
                        className={`text-sm font-medium px-2.5 py-1 rounded-full ${
                          product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock > 10
                          ? `In Stock (${product.stock})`
                          : product.stock > 0
                          ? `Low Stock (${product.stock})`
                          : "Out of Stock"}
                      </p>
                    </div>
                  </div>

                  {product.variants?.length > 0 && (
                    <div className="mt-2 mb-3">
                      <h3 className="font-semibold text-gray-700 text-sm mb-1">
                        Variants:
                      </h3>
                      <div className="max-h-24 overflow-y-auto pr-1 text-sm">
                        {product.variants.map((variant) => (
                          <div key={variant._id} className="mb-1.5">
                            <span className="font-medium text-gray-700">
                              {variant.type}:
                            </span>{" "}
                            <span className="text-gray-600">
                              {variant.options
                                .map(
                                  (opt) =>
                                    `${opt.name} (+$${opt.priceAdjustment})`
                                )
                                .join(", ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.woodTypes?.length > 0 && (
                    <div className="mt-2 mb-3">
                      <h3 className="font-semibold text-gray-700 text-sm mb-1">
                        Wood Types:
                      </h3>
                      <div className="max-h-24 overflow-y-auto pr-1 text-sm">
                        {product.woodTypes.map(({ woodType, price }) => (
                          <div key={woodType._id} className="mb-1">
                            <span className="text-gray-600">
                              {woodType.name} - ${price} per cubic meter
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
                    <Link
                      to={`/admin/product/edit/${product._id}`}
                      className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center gap-1.5 text-red-500 hover:text-red-700 font-medium transition-colors"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
