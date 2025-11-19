"use client";

import { Edit2, Trash2, Pause, Play } from "lucide-react";
import { useState } from "react";

const organizerEvents = [
  {
    id: "org-001",
    name: "Jazz Night at Venue",
    category: "Concert",
    date: "2024-12-28",
    ticketsSold: 450,
    totalSeats: 500,
    revenue: "₹22,50,000",
    status: "active",
  },
  {
    id: "org-002",
    name: "Comedy Workshop",
    category: "Comedy",
    date: "2024-12-30",
    ticketsSold: 120,
    totalSeats: 200,
    revenue: "₹1,56,000",
    status: "active",
  },
  {
    id: "org-003",
    name: "Photography Masterclass",
    category: "Workshop",
    date: "2025-01-15",
    ticketsSold: 85,
    totalSeats: 150,
    revenue: "₹4,25,000",
    status: "paused",
  },
];

export default function OrganizerEvents() {
  const [events, setEvents] = useState(organizerEvents);

  const handlePause = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id
          ? { ...event, status: event.status === "active" ? "paused" : "active" }
          : event
      )
    );
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Events</h2>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-card text-card-foreground border border-border rounded-lg p-6"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg">{event.name}</h3>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      event.status === "active"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {event.status.charAt(0).toUpperCase() +
                      event.status.slice(1)}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm mt-1">
                  {event.category}
                </p>
              </div>

              <div className="text-right pr-4 border-r border-border">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-accent rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground">Tickets Sold</p>
                <p className="font-bold text-lg">
                  {event.ticketsSold} / {event.totalSeats}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Occupancy</p>
                <p className="font-bold text-lg text-primary">
                  {Math.round((event.ticketsSold / event.totalSeats) * 100)}%
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="font-bold text-lg text-green-500">
                  {event.revenue}
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2">
              {/* Edit */}
              <button className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded transition text-sm">
                <Edit2 size={16} />
                Edit
              </button>

              {/* Pause / Resume */}
              <button
                onClick={() => handlePause(event.id)}
                className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded transition text-sm"
              >
                {event.status === "active" ? <Pause size={16} /> : <Play size={16} />}
                {event.status === "active" ? "Pause" : "Resume"}
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(event.id)}
                className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded transition text-sm ml-auto"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}