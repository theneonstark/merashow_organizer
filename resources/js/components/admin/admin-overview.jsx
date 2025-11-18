"use client"

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 40000, users: 2400 },
  { month: "Feb", revenue: 50000, users: 2800 },
  { month: "Mar", revenue: 45000, users: 3200 },
  { month: "Apr", revenue: 65000, users: 3800 },
  { month: "May", revenue: 75000, users: 4500 },
  { month: "Jun", revenue: 85000, users: 5200 },
]

const categoryData = [
  { name: "Concert", value: 35, color: "#3b82f6" },
  { name: "Movie", value: 25, color: "#10b981" },
  { name: "Comedy", value: 20, color: "#f59e0b" },
  { name: "Theater", value: 12, color: "#8b5cf6" },
  { name: "Sports", value: 8, color: "#ef4444" },
]

export default function AdminOverview() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Platform Overview</h2>

      <div className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Revenue & User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Event Distribution by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name} ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4">Top Performing Events</h3>
            <div className="space-y-3">
              {[
                { name: "Coldplay Live in Concert", revenue: "₹22,50,000", tickets: 450 },
                { name: "The Game Premiere", revenue: "₹12,45,000", tickets: 280 },
                { name: "Ed Sheeran Tour", revenue: "₹8,75,000", tickets: 175 },
                { name: "Tennis Finals", revenue: "₹5,95,000", tickets: 198 },
              ].map((event, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded">
                  <div>
                    <p className="font-medium text-sm">{event.name}</p>
                    <p className="text-xs text-slate-400">{event.tickets} tickets</p>
                  </div>
                  <p className="font-bold text-accent">{event.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
