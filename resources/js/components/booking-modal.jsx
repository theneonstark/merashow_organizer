"use client"

import { X, Loader2 } from "lucide-react"
import { useState } from "react"

export default function BookingModal({ event, onClose }) {
  const [tickets, setTickets] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleBooking = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert(`Successfully booked ${tickets} ticket(s) for ${event.name}!`)
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold">Book Tickets</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm text-slate-400 mb-1">{event.name}</p>
            <p className="font-medium">{event.venue}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Number of Tickets</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTickets(Math.max(1, tickets - 1))}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition"
              >
                −
              </button>
              <span className="text-2xl font-bold w-12 text-center">{tickets}</span>
              <button
                onClick={() => setTickets(Math.min(10, tickets + 1))}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition"
              >
                +
              </button>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Price per ticket</span>
              <span>₹{event.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Qty</span>
              <span>{tickets}</span>
            </div>
            <div className="border-t border-slate-600 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-accent">₹{event.price * tickets}</span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full py-3 bg-accent hover:bg-accent-dark rounded-lg font-bold text-background transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
