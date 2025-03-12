"use client"

import { useState, useEffect } from "react"
import { Ruler, Palette } from "lucide-react"

const COLORS = [
  { id: "natural", name: "Natural", price: 0 },
  { id: "walnut", name: "Walnut Stain", price: 50 },
  { id: "cherry", name: "Cherry Stain", price: 60 },
  { id: "mahogany", name: "Mahogany Stain", price: 70 },
  { id: "ebony", name: "Ebony Stain", price: 80 },
  { id: "white", name: "White Paint", price: 90 },
  { id: "black", name: "Black Paint", price: 90 },
]

const CustomizeProductModal = ({ isOpen, onClose, product, onAddToCart }) => {
  const [dimensions, setDimensions] = useState({
    length: product?.dimensions?.length || 0,
    width: product?.dimensions?.width || 0,
    height: product?.dimensions?.height || 0,
  })
  const [selectedWoodType, setSelectedWoodType] = useState("")
  const [selectedColor, setSelectedColor] = useState("natural")
  const [calculatedPrice, setCalculatedPrice] = useState(product?.basePrice || 0)

  useEffect(() => {
    // Set default wood type
    if (product?.woodTypes?.length > 0 && !selectedWoodType) {
      setSelectedWoodType(product.woodTypes[0].woodType._id)
    }

    // Calculate price based on dimensions and wood type
    calculatePrice()
  }, [product, dimensions, selectedWoodType, selectedColor])

  const calculatePrice = () => {
    if (!product || !product.woodTypes) return

    // Find selected wood type
    const woodType = product.woodTypes.find((w) => w.woodType._id === selectedWoodType)
    if (!woodType) return

    // Calculate volume in cubic meters
    const volumeInCm = dimensions.length * dimensions.width * dimensions.height
    const volumeInM = volumeInCm / 1000000 // Convert to cubic meters

    // Calculate base price based on volume and wood price per cubic meter
    let price = volumeInM * woodType.woodType.pricePerCubicMeter

    // Add color price
    const colorOption = COLORS.find((c) => c.id === selectedColor)
    if (colorOption) {
      price += colorOption.price
    }

    // Ensure minimum price
    price = Math.max(price, product.basePrice)

    setCalculatedPrice(price)
  }

  const handleDimensionChange = (dimension, value) => {
    const numValue = Number.parseFloat(value) || 0
    setDimensions({
      ...dimensions,
      [dimension]: numValue,
    })
  }

  const handleAddToCart = () => {
    const customProduct = {
      id: product._id,
      name: product.name,
      price: calculatedPrice,
      image: product.image,
      quantity: 1,
      woodType: product.woodTypes.find((w) => w.woodType._id === selectedWoodType)?.woodType.name,
      customizations: {
        dimensions,
        color: COLORS.find((c) => c.id === selectedColor)?.name,
        isCustom: true,
      },
    }

    onAddToCart(customProduct)
  }

  if (!product || !isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Customize Your {product.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Adjust dimensions, select wood type and finish to create your custom piece.
        </p>

        <div className="space-y-6">
          {/* Dimensions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              <h3 className="text-lg font-medium">Dimensions (cm)</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="length" className="block text-sm font-medium">
                  Length
                </label>
                <input
                  id="length"
                  type="number"
                  min="1"
                  value={dimensions.length}
                  onChange={(e) => handleDimensionChange("length", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="width" className="block text-sm font-medium">
                  Width
                </label>
                <input
                  id="width"
                  type="number"
                  min="1"
                  value={dimensions.width}
                  onChange={(e) => handleDimensionChange("width", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="height" className="block text-sm font-medium">
                  Height
                </label>
                <input
                  id="height"
                  type="number"
                  min="1"
                  value={dimensions.height}
                  onChange={(e) => handleDimensionChange("height", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Wood Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Wood Type</h3>
            <select
              value={selectedWoodType}
              onChange={(e) => setSelectedWoodType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select wood type</option>
              {product.woodTypes.map((wood) => (
                <option key={wood.woodType._id} value={wood.woodType._id}>
                  {wood.woodType.name.trim()} - ${wood.woodType.pricePerCubicMeter.toFixed(2)}/m³
                </option>
              ))}
            </select>
          </div>

          {/* Color/Finish */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <h3 className="text-lg font-medium">Color/Finish</h3>
            </div>

            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {COLORS.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.name} {color.price > 0 && `(+$${color.price.toFixed(2)})`}
                </option>
              ))}
            </select>
          </div>

          {/* Price Calculation */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Calculated Price:</span>
              <span className="text-xl font-bold text-blue-600">${calculatedPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Price is calculated based on wood type, dimensions, and finish.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomizeProductModal

