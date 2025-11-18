"use client"

import { Ticket, Download, Calendar } from "lucide-react"

const bookings = [
  {
    id: "B001",
    eventName: "Coldplay Live in Concert",
    date: "2024-12-15",
    tickets: 2,
    totalAmount: 9998,
    status: "confirmed",
  },
  {
    id: "B002",
    eventName: "The Game Premiere",
    date: "2024-12-20",
    tickets: 1,
    totalAmount: 499,
    status: "confirmed",
  },
]

export default function UserBookings() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Ticket className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">{booking.eventName}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(booking.date).toLocaleDateString()}
                    </span>
                    <span>{booking.tickets} Ticket(s)</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-accent">₹{booking.totalAmount}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <button className="block mt-3 text-accent hover:underline text-sm flex items-center gap-1 ml-auto">
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Ticket size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No bookings yet. Start exploring events!</p>
        </div>
      )}
    </div>
  )
}
