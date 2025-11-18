"use client"
import EventCard from "./event-card"
import { events } from "@/data/mock-events"

export default function EventGrid({ filters = { category: "all", city: "all", priceRange: [0, 5000] } }) {
  const filteredEvents = events.filter((event) => {
    if (filters.category !== "all" && event.category !== filters.category) return false
    if (filters.city !== "all" && event.city !== filters.city) return false
    if (event.price < filters.priceRange[0] || event.price > filters.priceRange[1]) return false
    return true
  })

  return (
    <section className="py-8">
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg">No events found matching your filters</p>
        </div>
      )}
    </section>
  )
}
