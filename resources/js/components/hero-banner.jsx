"use client"

import { Search } from "lucide-react"
import { useState } from "react"

export default function HeroBanner() {
  const [search, setSearch] = useState("")

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 border-b border-slate-700 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Your Gateway to <span className="text-gradient">Unforgettable Events</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Discover and book tickets for concerts, movies, comedy shows, and more
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events, artists, venues..."
              className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition text-white placeholder-slate-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
