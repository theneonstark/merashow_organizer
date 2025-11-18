"use client"

import { User, Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export default function UserProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
              <User size={32} className="text-background" />
            </div>
            <div>
              <p className="text-xl font-bold">{user.name}</p>
              <p className="text-slate-400">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 border border-slate-600 hover:bg-slate-700 rounded-lg transition"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="space-y-4 border-t border-slate-700 pt-6">
          <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg">
            <Mail className="text-accent" />
            <div>
              <p className="text-sm text-slate-400">Email Address</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg">
            <Phone className="text-accent" />
            <div>
              <p className="text-sm text-slate-400">Phone Number</p>
              <p className="font-medium">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg">
            <MapPin className="text-accent" />
            <div>
              <p className="text-sm text-slate-400">City</p>
              <p className="font-medium">Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
