"use client"

import { useState } from "react"
import { Link } from "@inertiajs/react"
import { useAuth } from "@/context/auth-context"
import { Menu, X, Moon, Sun, LogOut, User } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-gradient">HostMyShow</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm hover:text-accent transition">
              Home
            </Link>
            <Link href="/events" className="text-sm hover:text-accent transition">
              Events
            </Link>
            <Link href="/about" className="text-sm hover:text-accent transition">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-accent transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-800 transition">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition"
                >
                  <User size={18} />
                  <span className="hidden sm:inline text-sm">{user.name}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
                    <Link
                      href={
                        user.role === "user"
                          ? "/user/dashboard"
                          : user.role === "organizer"
                            ? "/organizer/dashboard"
                            : "/admin/dashboard"
                      }
                      className="block px-4 py-2 text-sm hover:bg-slate-700 rounded-t-lg transition"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-slate-700 rounded-b-lg transition flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm rounded-lg border border-accent hover:bg-accent/10 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm rounded-lg bg-accent hover:bg-accent/90 transition text-background"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-2 border-t border-slate-800 pt-4">
            <Link href="/" className="text-sm hover:text-accent transition py-2">
              Home
            </Link>
            <Link href="/events" className="text-sm hover:text-accent transition py-2">
              Events
            </Link>
            <Link href="/about" className="text-sm hover:text-accent transition py-2">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-accent transition py-2">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
