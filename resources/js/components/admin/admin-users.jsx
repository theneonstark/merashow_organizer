"use client"

import { Search, Trash2, Shield } from "lucide-react"
import { useState } from "react"

const allUsers = [
  { id: 1, name: "Rahul Kumar", email: "rahul@example.com", role: "user", joinedDate: "2024-08-15", status: "active" },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    role: "organizer",
    joinedDate: "2024-09-20",
    status: "active",
  },
  { id: 3, name: "Amit Patel", email: "amit@example.com", role: "user", joinedDate: "2024-10-01", status: "active" },
  {
    id: 4,
    name: "Neha Gupta",
    email: "neha@example.com",
    role: "organizer",
    joinedDate: "2024-07-10",
    status: "suspended",
  },
  {
    id: 5,
    name: "Vikram Reddy",
    email: "vikram@example.com",
    role: "user",
    joinedDate: "2024-11-05",
    status: "active",
  },
]

export default function AdminUsers() {
  const [users, setUsers] = useState(allUsers)
  const [search, setSearch] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()),
  )

  const handleDeleteUser = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const handleToggleSuspend = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "suspended" : "active" } : user,
      ),
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
          />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-700">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Name</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Email</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Role</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Joined</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-700/30 transition">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-white text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-sm">{user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-slate-400">{user.email}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    {user.role === "organizer" && <Shield size={14} className="text-accent" />}
                    <span className="text-sm capitalize">{user.role}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-slate-400">{new Date(user.joinedDate).toLocaleDateString()}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleSuspend(user.id)}
                      className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded transition"
                    >
                      {user.status === "active" ? "Suspend" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition"
                    >
                      <Trash2 size={14} />
                    </button>
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
