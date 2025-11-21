"use client";

import { updateEvent } from "@/lib/apis";
import { X, Loader2 } from "lucide-react";
import { useState } from "react";

export default function EditEventModal({ eventData, onClose, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: eventData.id,
    name: eventData.name,
    artist: eventData.artist,
    category: eventData.category,
    description: eventData.description,
    date: eventData.date,
    time: eventData.time,
    venue: eventData.venue,
    city: eventData.city,
    price: eventData.price,
    totalSeats: eventData.total_seats,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateEvent(eventData.id, formData);
      onUpdate(res.data.event); // Update UI
      onClose();
    } catch (err) {
      console.error("EVENT UPDATE ERROR:", err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-card text-card-foreground border border-border rounded-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Edit Event</h2>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-md">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="grid md:grid-cols-2 gap-4">

            <FormInput label="Event Name" name="name" value={formData.name} handleChange={handleChange} />

            <FormInput label="Artist" name="artist" value={formData.artist} handleChange={handleChange} />

            <FormInput label="Category" name="category" value={formData.category} handleChange={handleChange} />

            <FormInput label="City" name="city" value={formData.city} handleChange={handleChange} />

            <FormInput label="Date" type="date" name="date" value={formData.date} handleChange={handleChange} />

            <FormInput label="Time" type="time" name="time" value={formData.time} handleChange={handleChange} />

            <FormInput label="Venue" name="venue" value={formData.venue} handleChange={handleChange} />

            <FormInput label="Price (₹)" name="price" type="number" value={formData.price} handleChange={handleChange} />

            <FormInput
              label="Total Seats"
              name="totalSeats"
              type="number"
              value={formData.totalSeats}
              handleChange={handleChange}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-muted-foreground">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-2 px-3 py-2 bg-accent border border-border rounded-lg"
            ></textarea>
          </div>

          {/* FOOTER */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* Reusable Input */
function FormInput({ label, name, value, handleChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full mt-2 px-3 py-2 bg-accent border border-border rounded-lg"
      />
    </div>
  );
}