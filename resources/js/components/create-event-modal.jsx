"use client";

import { X, Upload, Loader2 } from "lucide-react";
import { useState } from "react";
import { createEvent } from "@/lib/apis"; // ✅ FIX: Import API

export default function CreateEventModal({ onClose }) {
  const [loading, setLoading] = useState(false);

  const [posterFile, setPosterFile] = useState(null); // ✅ FIX: posterFile state add

  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    category: "Concert",
    description: "",
    date: "",
    time: "",
    venue: "",
    city: "Mumbai",
    price: "",
    totalSeats: "",
  });

  // Handle Input Values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Poster Upload
  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    setPosterFile(file);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();

    // append fields
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));

    // append poster file
    if (posterFile) {
      form.append("poster", posterFile);
    }

    try {
      const res = await createEvent(form);
      console.log("Event Created:", res);
      onClose();
    } catch (err) {
      console.error("EVENT ERROR", err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-card text-card-foreground rounded-xl border border-border shadow-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Create New Event</h2>

          <button onClick={onClose} className="p-2 rounded-md hover:bg-accent transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="grid md:grid-cols-2 gap-4">

            <FormInput label="Event Name" name="name" placeholder="Rock Concert 2025" value={formData.name} handleChange={handleChange} required />

            <FormInput label="Artist / Performer" name="artist" placeholder="Artist name" value={formData.artist} handleChange={handleChange} required />

            <FormSelect
              label="Category"
              name="category"
              value={formData.category}
              handleChange={handleChange}
              options={["Concert", "Movie", "Comedy", "Theater", "Sports", "Festival"]}
            />

            <FormSelect
              label="City"
              name="city"
              value={formData.city}
              handleChange={handleChange}
              options={["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune"]}
            />

            <FormInput label="Date" name="date" type="date" value={formData.date} handleChange={handleChange} required />

            <FormInput label="Time" name="time" type="time" value={formData.time} handleChange={handleChange} required />

            <FormInput label="Venue" name="venue" placeholder="Venue name" value={formData.venue} handleChange={handleChange} required />

            <FormInput label="Ticket Price (₹)" name="price" type="number" placeholder="1000" value={formData.price} handleChange={handleChange} required />

            <FormInput label="Total Seats" name="totalSeats" type="number" placeholder="500" value={formData.totalSeats} handleChange={handleChange} required />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Event description..."
              className="w-full mt-2 px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none"
              required
            />
          </div>

          {/* UPLOAD POSTER */}
          <label className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition cursor-pointer block">
            <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
            <p className="font-medium">Upload Poster Image</p>
            <p className="text-sm text-muted-foreground">Click to select or drag and drop</p>

            <input type="file" accept="image/*" onChange={handlePosterUpload} className="hidden" />
          </label>

          {/* SHOW FILE NAME */}
          {posterFile && (
            <p className="text-sm text-primary">{posterFile.name}</p>
          )}

          <div className="flex gap-3 pt-4">
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
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Event"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* ------------------------------ */
/* REUSABLE INPUT COMPONENTS */
/* ------------------------------ */

function FormInput({ label, name, value, handleChange, type = "text", placeholder, required }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
        className="w-full mt-2 px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none"
      />
    </div>
  );
}

function FormSelect({ label, name, value, handleChange, options }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground">{label}</label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full mt-2 px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none"
      >
        {options.map((opt, idx) => (
          <option key={idx}>{opt}</option>
        ))}
      </select>
    </div>
  );
}