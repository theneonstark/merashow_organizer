"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const bookingData = [
  { date: "Dec 1", bookings: 120, revenue: 240000 },
  { date: "Dec 5", bookings: 200, revenue: 400000 },
  { date: "Dec 10", bookings: 350, revenue: 700000 },
  { date: "Dec 15", bookings: 500, revenue: 1000000 },
  { date: "Dec 20", bookings: 650, revenue: 1300000 },
  { date: "Dec 25", bookings: 800, revenue: 1600000 },
]

export default function AdminAnalytics() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Platform Analytics</h2>

      <div className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Bookings & Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-4">Daily Revenue (₹)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="revenue" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="card">
            <p className="text-slate-400 text-sm">Avg Revenue Per Booking</p>
            <p className="text-3xl font-bold mt-2 text-accent">₹2,000</p>
          </div>
          <div className="card">
            <p className="text-slate-400 text-sm">Conversion Rate</p>
            <p className="text-3xl font-bold mt-2 text-accent">6.8%</p>
          </div>
          <div className="card">
            <p className="text-slate-400 text-sm">Active Events</p>
            <p className="text-3xl font-bold mt-2 text-accent">342</p>
          </div>
        </div>
      </div>
    </div>
  )
}
