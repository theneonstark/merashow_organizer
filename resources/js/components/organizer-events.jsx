"use client";

import { Edit2, Trash2, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteEvent, getEvents, toggleEventStatus } from "@/lib/apis";
import EditEventModal from "@/components/edit-event-modal";

export default function OrganizerEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editEvent, setEditEvent] = useState(null); // 👉 store event for editing

  // FETCH EVENTS
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data.events);
    } catch (err) {
      console.error("EVENT FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update UI after editing event
  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );
  };

  const onToggleStatus = async (id) => {
  try {
    const res = await toggleEventStatus(id);
    const updated = res.data.event;

    setEvents(events.map(ev => ev.id === id ? updated : ev));
  } catch (err) {
    console.log("STATUS ERROR:", err);
  }
};

  const onDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(id);
      setEvents(events.filter(ev => ev.id !== id));
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };


  if (loading) {
    return <p className="text-muted-foreground text-center py-10">Loading events...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Events</h2>

      {events.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">No events found.</p>
      ) : (
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
                        (event.status ?? "active") === "active"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {(event.status ?? "active").charAt(0).toUpperCase() +
                        (event.status ?? "active").slice(1)}
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
                    {event.tickets_sold ?? 0} / {event.total_seats}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Occupancy</p>
                  <p className="font-bold text-lg text-primary">
                    {Math.round(((event.tickets_sold ?? 0) / event.total_seats) * 100)}%
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="font-bold text-lg text-green-500">
                    ₹{(event.tickets_sold ?? 0) * event.price}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">
                {/* EDIT BUTTON */}
                <button
                  onClick={() => setEditEvent(event)} // 👉 open modal
                  className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded transition text-sm"
                >
                  <Edit2 size={16} />
                  Edit
                </button>

                <button
                  onClick={() => onToggleStatus(event.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded transition text-sm"
                >
                  {event.status === "active" ? <Pause size={16} /> : <Play size={16} />}
                  {event.status === "active" ? "Pause" : "Resume"}
                </button>

                <button
                  onClick={() => onDelete(event.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded transition text-sm ml-auto"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 👉 EDIT MODAL OPEN HERE */}
      {editEvent && (
        <EditEventModal
          eventData={editEvent}
          onClose={() => setEditEvent(null)}
          onUpdate={handleUpdateEvent}
        />
      )}
    </div>
  );
}