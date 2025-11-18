"use client"

import { Heart } from "lucide-react"
import EventCard from "../event-card"
import { events } from "@/data/mock-events"

export default function UserWishlist() {
  const wishlistEvents = events.slice(0, 4)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlistEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlistEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Heart size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">Your wishlist is empty</p>
        </div>
      )}
    </div>
  )
}
