"use client";

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
} from "recharts";

const chartData = [
  { name: "Week 1", views: 2400, ticketsSold: 1200, revenue: 600000 },
  { name: "Week 2", views: 3000, ticketsSold: 1550, revenue: 775000 },
  { name: "Week 3", views: 3200, ticketsSold: 1800, revenue: 900000 },
  { name: "Week 4", views: 4100, ticketsSold: 2100, revenue: 1050000 },
  { name: "Week 5", views: 3800, ticketsSold: 2400, revenue: 1200000 },
];

export default function OrganizerAnalytics() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>

      <div className="space-y-6">

        {/* LINE CHART */}
        <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Views & Ticket Sales Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />

              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                  color: "hsl(var(--card-foreground))",
                }}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="views"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6" }}
              />

              <Line
                type="monotone"
                dataKey="ticketsSold"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Revenue Growth (₹)</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />

              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />

              <Bar dataKey="revenue" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm">Total Views</p>
            <p className="text-3xl font-bold mt-2">16,500</p>
          </div>

          <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm">Conversion Rate</p>
            <p className="text-3xl font-bold mt-2 text-primary">8.9%</p>
          </div>
        </div>

      </div>
    </div>
  );
}