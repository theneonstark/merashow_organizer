"use client"

import { Link } from "@inertiajs/react"
import { Menu, Bell, Plus, User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Navbar({ user }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent/10"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          <Link href="/" className="flex items-center gap-3">
            <img src="/merahost/logos/1763619275776.png" alt="MERA SHOW" className="h-9" />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-accent/10" aria-label="Notifications">
            <Bell size={18} />
          </button>

          <Link href={'/events/new'}>
            <Button className="hidden md:inline-flex">
              <Plus size={14} />
              <span className="ml-2">Create Event</span>
          </Button>
          </Link>

          <Link href="/organizer/profile" className="inline-flex items-center gap-2 px-3 py-1 rounded-md hover:bg-accent/10">
            <User size={16} />
            <span className="hidden sm:inline text-sm">{user?.name || "Organizer"}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
