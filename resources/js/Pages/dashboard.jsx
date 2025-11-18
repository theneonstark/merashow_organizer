"use client"

// import { useAuth } from "@/context/auth-context"
// import { redirect } from "next/navigation"
import { Plus, LogOut, BarChart3, DollarSign, Users } from "lucide-react"
import { useState } from "react"
import OrganizerEvents from "@/components/organizer/organizer-events"
import OrganizerAnalytics from "@/components/organizer/organizer-analytics"
import OrganizerPayouts from "@/components/organizer/organizer-payouts"
import CreateEventModal from "@/components/organizer/create-event-modal"

export default function OrganizerDashboard() {
  const { user, logout } = 'useAuth()'
  const [activeTab, setActiveTab] = useState("events")
  const [showCreateEvent, setShowCreateEvent] = useState(false)

  if (!user || user.role !== "organizer") {
    // redirect("/login")
  }

  const handleLogout = () => {
    logout()
    // redirect("/")
  }

  const stats = [
    { label: "Total Tickets Sold", value: "1,234", icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Total Earnings", value: "₹24,68,000", icon: DollarSign, color: "from-green-500 to-emerald-500" },
    { label: "Live Events", value: "8", icon: BarChart3, color: "from-purple-500 to-pink-500" },
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-slate-400 mt-2">Welcome back, {'user.name'}!</p>
          </div>
          <button
            onClick={() => setShowCreateEvent(true)}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark rounded-lg font-medium text-background transition"
          >
            <Plus size={18} />
            Create Event
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="card space-y-2 sticky top-20">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("events")}
                  className={`w-full px-4 py-3 rounded-lg transition text-left ${
                    activeTab === "events" ? "bg-accent text-background font-medium" : "hover:bg-slate-700/50"
                  }`}
                >
                  My Events
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`w-full px-4 py-3 rounded-lg transition text-left ${
                    activeTab === "analytics" ? "bg-accent text-background font-medium" : "hover:bg-slate-700/50"
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab("payouts")}
                  className={`w-full px-4 py-3 rounded-lg transition text-left ${
                    activeTab === "payouts" ? "bg-accent text-background font-medium" : "hover:bg-slate-700/50"
                  }`}
                >
                  Payouts
                </button>
              </nav>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-600 hover:bg-slate-700/50 rounded-lg transition text-red-400 mt-4"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          <div className="md:col-span-3">
            {activeTab === "events" && <OrganizerEvents />}
            {activeTab === "analytics" && <OrganizerAnalytics />}
            {activeTab === "payouts" && <OrganizerPayouts />}
          </div>
        </div>
      </div>

      {showCreateEvent && <CreateEventModal onClose={() => setShowCreateEvent(false)} />}
    </div>
  )
}
