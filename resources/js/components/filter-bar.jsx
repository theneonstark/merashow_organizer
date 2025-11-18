"use client"

import { X } from "lucide-react"
import { useState } from "react"

const categories = ["Concert", "Movie", "Comedy", "Theater", "Sports", "Festival"]
const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Kolkata"]

export default function FilterBar({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleReset = () => {
    setFilters({
      category: "all",
      city: "all",
      priceRange: [0, 5000],
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition text-sm font-medium"
        >
          {isOpen ? "▼ Hide Filters" : "► Show Filters"}
        </button>

        {(filters.category !== "all" ||
          filters.city !== "all" ||
          filters.priceRange[0] !== 0 ||
          filters.priceRange[1] !== 5000) && (
          <button
            onClick={handleReset}
            className="px-4 py-2 text-slate-400 hover:text-accent transition text-sm flex items-center gap-2"
          >
            <X size={16} />
            Clear Filters
          </button>
        )}
      </div>

      {isOpen && (
        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
            >
              <option value="all">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="5000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)],
                })
              }
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}
