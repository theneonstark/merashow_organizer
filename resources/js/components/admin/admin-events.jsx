"use client"

import { Search, CheckCircle, XCircle, Clock } from "lucide-react"
import { useState } from "react"

const allEvents = [
  {
    id: 1,
    name: "Coldplay Live",
    organizer: "Live Events Inc",
    date: "2024-12-15",
    status: "approved",
    revenue: "₹22,50,000",
  },
  { id: 2, name: "Comedy Night", organizer: "Comedy Club", date: "2024-12-18", status: "pending", revenue: "₹0" },
  {
    id: 3,
    name: "Movie Premiere",
    organizer: "Bollywood Studios",
    date: "2024-12-20",
    status: "approved",
    revenue: "₹12,45,000",
  },
  { id: 4, name: "Jazz Festival", organizer: "Music Events", date: "2024-12-28", status: "rejected", revenue: "₹0" },
  {
    id: 5,
    name: "Ed Sheeran Tour",
    organizer: "International Tours",
    date: "2025-01-05",
    status: "pending",
    revenue: "₹0",
  },
]

export default function AdminEvents() {
  const [events, setEvents] = useState(allEvents)
  const [search, setSearch] = useState("")

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.organizer.toLowerCase().includes(search.toLowerCase()),
  )

  const handleApprove = (id) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, status: "approved" } : event)))
  }

  const handleReject = (id) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, status: "rejected" } : event)))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Event Management</h2>

      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
          />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-700">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Event Name</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Organizer</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Date</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Revenue</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-slate-700/30 transition">
                <td className="py-4 px-4 font-medium text-sm">{event.name}</td>
                <td className="py-4 px-4 text-sm text-slate-400">{event.organizer}</td>
                <td className="py-4 px-4 text-sm text-slate-400">{new Date(event.date).toLocaleDateString()}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 w-fit ${
                      event.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : event.status === "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {event.status === "approved" && <CheckCircle size={12} />}
                    {event.status === "rejected" && <XCircle size={12} />}
                    {event.status === "pending" && <Clock size={12} />}
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-accent">{event.revenue}</td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    {event.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(event.id)}
                          className="px-3 py-1 text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(event.id)}
                          className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {event.status === "approved" && (
                      <button
                        onClick={() => handleReject(event.id)}
                        className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
