"use client"

import { CheckCircle, Download, Share2 } from "lucide-react"

export default function BookingConfirmation({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full">
        <div className="p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
            <CheckCircle className="text-green-400" size={32} />
          </div>

          <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
          <p className="text-slate-400">Your tickets have been booked successfully</p>

          <div className="bg-slate-700/30 rounded-lg p-4 text-left space-y-3">
            <div>
              <p className="text-sm text-slate-400">Booking ID</p>
              <p className="font-bold font-mono">{booking.id}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Event</p>
              <p className="font-bold">{booking.eventName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Number of Tickets</p>
              <p className="font-bold">{booking.tickets}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Amount</p>
              <p className="font-bold text-accent">₹{booking.amount}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark rounded-lg font-medium text-background transition">
              <Download size={18} />
              Download
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-600 hover:bg-slate-700 rounded-lg font-medium transition">
              <Share2 size={18} />
              Share
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-2 px-4 py-2 border border-slate-600 hover:bg-slate-700 rounded-lg font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
