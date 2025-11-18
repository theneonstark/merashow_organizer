"use client"

import { Link } from "@inertiajs/react"
import { Heart, MapPin, Calendar, Users } from "lucide-react"
import { useState } from "react"

export default function EventCard({ event, featured = false }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div className="group">
      <Link href={`/events/${event.id}`}>
        <div
          className={`card relative overflow-hidden hover:border-accent transition cursor-pointer ${featured ? "md:col-span-1" : ""}`}
        >
          <div className="relative overflow-hidden rounded-lg mb-4 bg-slate-700 h-48 md:h-64">
            <img
              src={event.poster || "/placeholder.svg"}
              alt={event.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <button
              onClick={(e) => {
                e.preventDefault()
                setIsWishlisted(!isWishlisted)
              }}
              className="absolute top-3 right-3 p-2 bg-slate-900/80 backdrop-blur rounded-full hover:bg-slate-800 transition"
            >
              <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-slate-300"} />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-bold text-sm line-clamp-2 group-hover:text-accent transition">{event.name}</h3>
                <p className="text-xs text-slate-400">{event.artist}</p>
              </div>
              <span className="px-2 py-1 bg-slate-700 text-xs rounded whitespace-nowrap">{event.category}</span>
            </div>

            <div className="space-y-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span className="line-clamp-1">
                  {event.venue}, {event.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} />
                <span>{event.availableSeats} seats available</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
              <span className="font-bold text-accent">₹{event.price}</span>
              <button className="px-3 py-1 bg-accent hover:bg-accent-dark rounded text-sm text-background font-medium transition">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
