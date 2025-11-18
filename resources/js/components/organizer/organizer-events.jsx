"use client"

import { Edit2, Trash2, Pause, Play } from "lucide-react"
import { useState } from "react"

const organizerEvents = [
  {
    id: "org-001",
    name: "Jazz Night at Venue",
    category: "Concert",
    date: "2024-12-28",
    ticketsSold: 450,
    totalSeats: 500,
    revenue: "₹22,50,000",
    status: "active",
  },
  {
    id: "org-002",
    name: "Comedy Workshop",
    category: "Comedy",
    date: "2024-12-30",
    ticketsSold: 120,
    totalSeats: 200,
    revenue: "₹1,56,000",
    status: "active",
  },
  {
    id: "org-003",
    name: "Photography Masterclass",
    category: "Workshop",
    date: "2025-01-15",
    ticketsSold: 85,
    totalSeats: 150,
    revenue: "₹4,25,000",
    status: "paused",
  },
]

export default function OrganizerEvents() {
  const [events, setEvents] = useState(organizerEvents)

  const handlePause = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: event.status === "active" ? "paused" : "active" } : event,
      ),
    )
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Events</h2>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg">{event.name}</h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      event.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mt-1">{event.category}</p>
              </div>
              <div className="text-right pr-4 border-r border-slate-700">
                <p className="text-sm text-slate-400">Date</p>
                <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-sm text-slate-400">Tickets Sold</p>
                <p className="font-bold text-lg">
                  {event.ticketsSold} / {event.totalSeats}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Occupancy</p>
                <p className="font-bold text-lg text-accent">
                  {Math.round((event.ticketsSold / event.totalSeats) * 100)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Revenue</p>
                <p className="font-bold text-lg text-green-400">{event.revenue}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded transition text-sm">
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handlePause(event.id)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded transition text-sm"
              >
                {event.status === "active" ? <Pause size={16} /> : <Play size={16} />}
                {event.status === "active" ? "Pause" : "Resume"}
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition text-sm ml-auto"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
