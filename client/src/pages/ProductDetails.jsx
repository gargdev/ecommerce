// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { addItemToCart } from "../features/cart/cartSlice";
// import Loader from "../components/common/Loader";
// import Shiping from "../components/Home/Shiping";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { products, loading, error } = useSelector((state) => state.products);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const product = products.find((item) => item._id === id);
//   const hasVariants =
//     product && product.variants && product.variants.length > 0;
//   const isCustomizable = product && product.isCustomizable;

//   const [useCustomization, setUseCustomization] = useState(isCustomizable);
//   const [quantity, setQuantity] = useState(1);

//   // Customization states
//   const [length, setLength] = useState("");
//   const [breadth, setBreadth] = useState("");
//   const [height, setHeight] = useState("");
//   const [selectedWood, setSelectedWood] = useState("");
//   const [calculatedPrice, setCalculatedPrice] = useState(0);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const images =
//     product?.images?.length > 0
//       ? product.images
//       : [
//           "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80",
//         ];

//   // Variant states
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [variantPrice, setVariantPrice] = useState(0);

//   useEffect(() => {
//     if (product) {
//       if (isCustomizable && product.woodTypes?.length > 0) {
//         setSelectedWood(product.woodTypes[0]._id);
//       }

//       if (hasVariants) {
//         const defaults = {};
//         product.variants.forEach((variant) => {
//           if (variant.options?.length > 0) {
//             defaults[variant._id] = variant.options[0]._id;
//           }
//         });
//         setSelectedVariants(defaults);
//       }

//       setUseCustomization(isCustomizable);
//     }
//   }, [product, isCustomizable, hasVariants]);

//   useEffect(() => {
//     if (product && isCustomizable) {
//       const l = parseFloat(length);
//       const b = parseFloat(breadth);
//       const h = parseFloat(height);

//       const woodOption = product.woodTypes.find(
//         (wood) => wood._id === selectedWood
//       );

//       if (!woodOption) {
//         setCalculatedPrice(0);
//         return;
//       }

//       const woodPrice = woodOption.price;

//       if (isNaN(l) || isNaN(b) || isNaN(h)) {
//         setCalculatedPrice(woodPrice);
//         return;
//       }

//       const volume = l * b * h;
//       setCalculatedPrice(volume * woodPrice);
//     }
//   }, [length, breadth, height, selectedWood, product, isCustomizable]);

//   useEffect(() => {
//     if (product && hasVariants) {
//       let total = 0;

//       product.variants.forEach((variant) => {
//         const selectedOptionId = selectedVariants[variant._id];
//         const option = variant.options.find(
//           (opt) => opt._id === selectedOptionId
//         );
//         if (option?.priceAdjustment) {
//           total += option.priceAdjustment;
//         }
//       });

//       setVariantPrice(total);
//     }
//   }, [selectedVariants, product, hasVariants]);

//   const handleNextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };

//   const handlePrevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   if (loading) return <Loader />;
//   if (error) return <div className="text-red-500">{error}</div>;
//   if (!product) return <div className="text-gray-500">Product not found.</div>;

//   const finalPrice = useCustomization ? calculatedPrice : variantPrice;

//   const handleAddToCart = async () => {
//     const itemData = {
//       productId: product._id,
//       quantity,
//       price: finalPrice,
//     };

//     if (isCustomizable && useCustomization) {
//       itemData.length = parseFloat(length);
//       itemData.breadth = parseFloat(breadth);
//       itemData.height = parseFloat(height);
//       itemData.woodType = selectedWood;
//     }

//     if (!useCustomization && hasVariants) {
//       itemData.selectedVariants = selectedVariants;
//     }

//     try {
//       await dispatch(addItemToCart(itemData)).unwrap();
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   const handleBuyNow = async () => {
//     await handleAddToCart();
//     navigate("/checkout");
//   };

//   return (
//     <>
//       <div className="max-w-4xl mx-auto p-4 mt-30">
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="w-full md:w-1/2 flex">
//             {/* Thumbnails Section */}
//             <div className="flex flex-col gap-3 mr-4">
//               {images.map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`w-20 h-20 rounded-lg overflow-hidden border ${
//                     index === currentImageIndex
//                       ? "border-black"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>

//             {/* Main Image Section (Larger Size) */}
//             <div className="relative rounded-lg overflow-hidden flex-1">
//               <div className="w-[500px] h-auto">
//                 {" "}
//                 {/* Adjust height dynamically */}
//                 <img
//                   src={images[currentImageIndex]}
//                   alt={`${product.name} - Image ${currentImageIndex + 1}`}
//                   className="w-100 h-100 object-cover"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex-1">
//             <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//             <p className="text-xl text-gray-700 mb-4">
//               Price: ${(finalPrice * quantity).toFixed(2)}
//             </p>
//             <p className="mb-4">{product.description}</p>

//             {/* Quantity Selector */}
//             <div className="mb-4">
//               <label htmlFor="quantity" className="block font-medium mb-2">
//                 Quantity
//               </label>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="px-3 py-1 border rounded"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   id="quantity"
//                   min="1"
//                   value={quantity}
//                   onChange={(e) =>
//                     setQuantity(Math.max(1, parseInt(e.target.value) || 1))
//                   }
//                   className="w-20 text-center border rounded p-1"
//                 />
//                 <button
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="px-3 py-1 border rounded"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Toggle Customization/Variant Selection */}
//             {isCustomizable && hasVariants && (
//               <div className="mb-4">
//                 <button
//                   onClick={() => setUseCustomization(true)}
//                   className={`mr-2 p-2 border ${
//                     useCustomization
//                       ? "bg-blue-500 text-white"
//                       : "bg-white text-black"
//                   }`}
//                 >
//                   Customize
//                 </button>
//                 <button
//                   onClick={() => setUseCustomization(false)}
//                   className={`p-2 border ${
//                     !useCustomization
//                       ? "bg-blue-500 text-white"
//                       : "bg-white text-black"
//                   }`}
//                 >
//                   Select Variant
//                 </button>
//               </div>
//             )}

//             {/* Customization Form */}
//             {isCustomizable && useCustomization && (
//               <div className="mt-6">
//                 <h2 className="text-2xl font-semibold mb-2">
//                   Customize Your Product
//                 </h2>
//                 <form className="space-y-4">
//                   <div className="flex flex-col md:flex-row gap-4">
//                     <div>
//                       <label htmlFor="length" className="block font-medium">
//                         Length (m)
//                       </label>
//                       <input
//                         id="length"
//                         type="number"
//                         step="0.01"
//                         value={length}
//                         onChange={(e) => setLength(e.target.value)}
//                         className="border rounded p-2"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="breadth" className="block font-medium">
//                         Breadth (m)
//                       </label>
//                       <input
//                         id="breadth"
//                         type="number"
//                         step="0.01"
//                         value={breadth}
//                         onChange={(e) => setBreadth(e.target.value)}
//                         className="border rounded p-2"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="height" className="block font-medium">
//                         Height (m)
//                       </label>
//                       <input
//                         id="height"
//                         type="number"
//                         step="0.01"
//                         value={height}
//                         onChange={(e) => setHeight(e.target.value)}
//                         className="border rounded p-2"
//                       />
//                     </div>
//                   </div>
//                   {product.woodTypes && product.woodTypes.length > 0 && (
//                     <div>
//                       <label htmlFor="woodType" className="block font-medium">
//                         Select Wood Type
//                       </label>
//                       <select
//                         id="woodType"
//                         value={selectedWood}
//                         onChange={(e) => setSelectedWood(e.target.value)}
//                         className="border rounded p-2"
//                       >
//                         {product.woodTypes.map((wood) => (
//                           <option key={wood._id} value={wood._id}>
//                             {wood.woodType.name.trim()} - $
//                             {wood.price.toFixed(2)}
//                             /m³
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
//                 </form>
//                 <div className="mt-4">
//                   <h3 className="text-xl font-medium">Calculated Price:</h3>
//                   <p className="text-lg font-bold">
//                     ${(calculatedPrice * quantity).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Variant Selection Form */}
//             {(!isCustomizable || (hasVariants && !useCustomization)) && (
//               <div className="mt-6">
//                 <h2 className="text-2xl font-semibold mb-2">Select Variants</h2>
//                 <form className="space-y-4">
//                   {product.variants.map((variant) => (
//                     <div key={variant._id}>
//                       <label
//                         htmlFor={`variant-${variant._id}`}
//                         className="block font-medium"
//                       >
//                         {variant.type}
//                       </label>
//                       <select
//                         id={`variant-${variant._id}`}
//                         value={selectedVariants[variant._id] || ""}
//                         onChange={(e) =>
//                           setSelectedVariants((prev) => ({
//                             ...prev,
//                             [variant._id]: e.target.value,
//                           }))
//                         }
//                         className="border rounded p-2"
//                       >
//                         {variant.options.map((option) => (
//                           <option key={option._id} value={option._id}>
//                             {option.name}
//                             {option.priceAdjustment
//                               ? ` (+ $${option.priceAdjustment.toFixed(2)})`
//                               : ""}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   ))}
//                 </form>
//                 <div className="mt-4">
//                   <h3 className="text-xl font-medium">Price:</h3>
//                   <p className="text-lg font-bold">
//                     ${(variantPrice * quantity).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Wood Options for Non-customizable Products */}
//             {!isCustomizable &&
//               !hasVariants &&
//               product.woodTypes &&
//               product.woodTypes.length > 0 && (
//                 <div className="mt-6">
//                   <h2 className="text-2xl font-semibold mb-2">Wood Options</h2>
//                   <ul>
//                     {product.woodTypes.map((wood) => (
//                       <li key={wood._id} className="mb-1">
//                         <span className="font-semibold">
//                           {wood.woodType.name.trim()}
//                         </span>{" "}
//                         - ${wood.price.toFixed(2)}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//             {/* Action Buttons */}
//             <div className="mt-6 flex justify-between">
//               <button
//                 onClick={handleAddToCart}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
//               >
//                 Add to Cart
//               </button>
//               <button
//                 onClick={handleBuyNow}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {<Shiping />}
//     </>
//   );
// };

// export default ProductDetails;

"use client"
import React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addItemToCart } from "../features/cart/cartSlice"
import Loader from "../components/common/Loader"
import Shiping from "../components/Home/Shiping"

const ProductDetails = () => {
  const { id } = useParams()
  const { products, loading, error } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const product = products.find((item) => item._id === id)
  const hasVariants = product && product.variants && product.variants.length > 0
  const isCustomizable = product && product.isCustomizable

  const [useCustomization, setUseCustomization] = useState(isCustomizable)
  const [quantity, setQuantity] = useState(1)

  // Customization states
  const [length, setLength] = useState("0")
  const [breadth, setBreadth] = useState("0")
  const [height, setHeight] = useState("0")
  const [selectedWood, setSelectedWood] = useState("")
  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Slider min/max values
  const minDimension = 0
  const maxDimension = 5 // 5 meters as max dimension

  const images =
    product?.images?.length > 0
      ? product.images
      : ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80"]

  // Variant states
  const [selectedVariants, setSelectedVariants] = useState({})
  const [variantPrice, setVariantPrice] = useState(0)

  useEffect(() => {
    if (product) {
      if (isCustomizable && product.woodTypes?.length > 0) {
        setSelectedWood(product.woodTypes[0]._id)
      }

      if (hasVariants) {
        const defaults = {}
        product.variants.forEach((variant) => {
          if (variant.options?.length > 0) {
            defaults[variant._id] = variant.options[0]._id
          }
        })
        setSelectedVariants(defaults)
      }

      setUseCustomization(isCustomizable)
    }
  }, [product, isCustomizable, hasVariants])

  useEffect(() => {
    if (product && isCustomizable) {
      const l = Number.parseFloat(length)
      const b = Number.parseFloat(breadth)
      const h = Number.parseFloat(height)

      const woodOption = product.woodTypes.find((wood) => wood._id === selectedWood)

      if (!woodOption) {
        setCalculatedPrice(0)
        return
      }

      const woodPrice = woodOption.price

      if (isNaN(l) || isNaN(b) || isNaN(h)) {
        setCalculatedPrice(woodPrice)
        return
      }

      const volume = l * b * h
      setCalculatedPrice(volume * woodPrice)
    }
  }, [length, breadth, height, selectedWood, product, isCustomizable])

  useEffect(() => {
    if (product && hasVariants) {
      let total = 0

      product.variants.forEach((variant) => {
        const selectedOptionId = selectedVariants[variant._id]
        const option = variant.options.find((opt) => opt._id === selectedOptionId)
        if (option?.priceAdjustment) {
          total += option.priceAdjustment
        }
      })

      setVariantPrice(total)
    }
  }, [selectedVariants, product, hasVariants])

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (loading) return <Loader />
  if (error) return <div className="text-red-500">{error}</div>
  if (!product) return <div className="text-gray-500">Product not found.</div>

  const finalPrice = useCustomization ? calculatedPrice : variantPrice

  const handleAddToCart = async () => {
    const itemData = {
      productId: product._id,
      quantity,
      price: finalPrice,
    }

    if (isCustomizable && useCustomization) {
      itemData.length = Number.parseFloat(length)
      itemData.breadth = Number.parseFloat(breadth)
      itemData.height = Number.parseFloat(height)
      itemData.woodType = selectedWood
    }

    if (!useCustomization && hasVariants) {
      itemData.selectedVariants = selectedVariants
    }

    try {
      await dispatch(addItemToCart(itemData)).unwrap()
    } catch (error) {
      console.error("Error adding item to cart:", error)
    }
  }

  const handleBuyNow = async () => {
    await handleAddToCart()
    navigate("/checkout")
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 mt-30">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 flex">
            {/* Thumbnails Section */}
            <div className="flex flex-col gap-3 mr-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border ${
                    index === currentImageIndex ? "border-black" : "border-gray-300"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image Section (Larger Size) */}
            <div className="relative rounded-lg overflow-hidden flex-1">
              <div className="w-[500px] h-auto">
                {" "}
                {/* Adjust height dynamically */}
                <img
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-100 h-100 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-gray-700 mb-4">Price: ${(finalPrice * quantity).toFixed(2)}</p>
            <p className="mb-4">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 border rounded">
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-20 text-center border rounded p-1"
                />
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 border rounded">
                  +
                </button>
              </div>
            </div>

            {/* Toggle Customization/Variant Selection */}
            {isCustomizable && hasVariants && (
              <div className="mb-4">
                <button
                  onClick={() => setUseCustomization(true)}
                  className={`mr-2 p-2 border ${useCustomization ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                >
                  Customize
                </button>
                <button
                  onClick={() => setUseCustomization(false)}
                  className={`p-2 border ${!useCustomization ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                >
                  Select Variant
                </button>
              </div>
            )}

            {/* Customization Form with Sliders */}
            {isCustomizable && useCustomization && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2">Customize Your Product</h2>
                <form className="space-y-6">
                  {/* Length Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="length" className="block font-medium">
                        Length (m)
                      </label>
                      <span className="text-sm font-medium">{length} m</span>
                    </div>
                    <input
                      id="length"
                      type="range"
                      min={minDimension}
                      max={maxDimension}
                      step="0.01"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{minDimension} m</span>
                      <span>{maxDimension} m</span>
                    </div>
                  </div>

                  {/* Breadth Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="breadth" className="block font-medium">
                        Breadth (m)
                      </label>
                      <span className="text-sm font-medium">{breadth} m</span>
                    </div>
                    <input
                      id="breadth"
                      type="range"
                      min={minDimension}
                      max={maxDimension}
                      step="0.01"
                      value={breadth}
                      onChange={(e) => setBreadth(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{minDimension} m</span>
                      <span>{maxDimension} m</span>
                    </div>
                  </div>

                  {/* Height Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="height" className="block font-medium">
                        Height (m)
                      </label>
                      <span className="text-sm font-medium">{height} m</span>
                    </div>
                    <input
                      id="height"
                      type="range"
                      min={minDimension}
                      max={maxDimension}
                      step="0.01"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{minDimension} m</span>
                      <span>{maxDimension} m</span>
                    </div>
                  </div>

                  {/* Wood Type Selection */}
                  {product.woodTypes && product.woodTypes.length > 0 && (
                    <div>
                      <label htmlFor="woodType" className="block font-medium">
                        Select Wood Type
                      </label>
                      <select
                        id="woodType"
                        value={selectedWood}
                        onChange={(e) => setSelectedWood(e.target.value)}
                        className="border rounded p-2 w-full mt-1"
                      >
                        {product.woodTypes.map((wood) => (
                          <option key={wood._id} value={wood._id}>
                            {wood.woodType.name.trim()} - ${wood.price.toFixed(2)}
                            /m³
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </form>
                <div className="mt-4">
                  <h3 className="text-xl font-medium">Calculated Price:</h3>
                  <p className="text-lg font-bold">${(calculatedPrice * quantity).toFixed(2)}</p>
                </div>
              </div>
            )}

            {/* Variant Selection Form */}
            {(!isCustomizable || (hasVariants && !useCustomization)) && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2">Select Variants</h2>
                <form className="space-y-4">
                  {product.variants.map((variant) => (
                    <div key={variant._id}>
                      <label htmlFor={`variant-${variant._id}`} className="block font-medium">
                        {variant.type}
                      </label>
                      <select
                        id={`variant-${variant._id}`}
                        value={selectedVariants[variant._id] || ""}
                        onChange={(e) =>
                          setSelectedVariants((prev) => ({
                            ...prev,
                            [variant._id]: e.target.value,
                          }))
                        }
                        className="border rounded p-2 w-full mt-1"
                      >
                        {variant.options.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option.name}
                            {option.priceAdjustment ? ` (+ $${option.priceAdjustment.toFixed(2)})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </form>
                <div className="mt-4">
                  <h3 className="text-xl font-medium">Price:</h3>
                  <p className="text-lg font-bold">${(variantPrice * quantity).toFixed(2)}</p>
                </div>
              </div>
            )}

            {/* Wood Options for Non-customizable Products */}
            {!isCustomizable && !hasVariants && product.woodTypes && product.woodTypes.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2">Wood Options</h2>
                <ul>
                  {product.woodTypes.map((wood) => (
                    <li key={wood._id} className="mb-1">
                      <span className="font-semibold">{wood.woodType.name.trim()}</span> - ${wood.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {<Shiping />}
    </>
  )
}

export default ProductDetails

