"use client"

import { useState } from "react"
import useProductStore from "../Store/useProductstore"
import { Link } from "react-router-dom"
import React from "react"
const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image"

export default function ProductShowcase() {
  const { products } = useProductStore()
  const [imageErrors, setImageErrors] = useState({})
  const [selectedCategory, setSelectedCategory] = useState("all")

  const handleImageError = (productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }))
  }

  // Get unique categories from products
  const categories = ["all", ...new Set(products.map((p) => p.category).filter(Boolean))]

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center">
            <span className="mr-3">🧰</span> Climbing Gear
          </h2>
          <p className="text-slate-600 max-w-2xl">
            Book high-quality climbing gear for your adventure. All equipment is regularly inspected and maintained for
            your safety.
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="mt-4 md:mt-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No Products Available</h3>
          <p className="text-slate-600">We're currently restocking our inventory. Please check back later!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-slate-200 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={imageErrors[product.id] || !product.imageUrl ? placeholderImage : product.imageUrl}
                  alt={product.title || "Product"}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={() => handleImageError(product.id)}
                />

                {/* Price Tag */}
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="font-bold text-teal-600">Rs. {product.price || "N/A"}</span>
                </div>

                {/* Category Tag */}
                {product.category && (
                  <div className="absolute top-3 left-3 bg-slate-800 bg-opacity-75 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium text-white">{product.category}</span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">{product.title || "Untitled Product"}</h3>

                {product.name && product.name !== product.title && (
                  <p className="text-sm text-slate-600 mb-2">{product.name}</p>
                )}

                {product.description && (
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>
                )}

                {/* Product Details */}
                <div className="mt-auto">
                  {product.expiresAt && (
                    <div className="flex items-center text-xs text-slate-500 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Available until: {new Date(product.expiresAt).toLocaleDateString()}
                    </div>
                  )}

                  <Link
                    to={`/bookproduct/${product.id}`}
                    className="block w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg text-center transition-colors duration-300"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
