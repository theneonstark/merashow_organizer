"use client"

import { useState, useRef } from "react"
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Plus, Upload, Trash } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * EventCreateForm.jsx
 * Single-file event creation UI (UI-only).
 *
 * Notes:
 * - Replace select options with dynamic data (API) as needed.
 * - Replace file upload handlers with Inertia/axios/fetch to send to your Laravel endpoints.
 * - Example screenshot preview included (local path).
 */

const CATEGORIES = ["Concert", "Movie", "Comedy", "Theater", "Sports", "Festival"]
const CITIES = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Kolkata"]

export default function EventCreateForm() {
  // main form state
  const [form, setForm] = useState({
    name: "",
    instagram: "",
    category: "",
    subcategory: "",
    city: "",
    venue: "",
    description: "",
    languages: "",
    minAge: "",
    paidEntryAge: "",
    indoor: "",
    seating: "",
    kidFriendly: "",
    petFriendly: "",
    gatesOpenBefore: 0,
    priceMax: 1000,
    sendCopy: false,
  })

  // media state
  const [landscapeCard, setLandscapeCard] = useState(null) // file
  const [portraitCard, setPortraitCard] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])

  // point of contact rows
  const [pocs, setPocs] = useState([{ name: "", email: "", phone: "" }])

  // simple preview from uploaded File
  const makePreview = (file) => (file ? URL.createObjectURL(file) : null)

  // handle simple input change
  const handleChange = (key, value) => setForm({ ...form, [key]: value })

  // file handlers
  const onFileChange = (setter) => (e) => {
    const f = e.target.files?.[0] ?? null
    setter(f)
  }

  const onGalleryAdd = (e) => {
    const files = Array.from(e.target.files || [])
    setGalleryFiles((prev) => [...prev, ...files])
  }

  const removeGalleryItem = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // POC handlers
  const addPoc = () => setPocs((p) => [...p, { name: "", email: "", phone: "" }])
  const updatePoc = (index, key, value) =>
    setPocs((p) => p.map((row, i) => (i === index ? { ...row, [key]: value } : row)))
  const removePoc = (index) => setPocs((p) => p.filter((_, i) => i !== index))

  // submit (UI-only)
  const handleSubmit = (e) => {
    e.preventDefault()

    // assemble FormData if you want to upload files:
    // const fd = new FormData()
    // fd.append("name", form.name)
    // if (landscapeCard) fd.append("landscape", landscapeCard)
    // galleryFiles.forEach((f, i) => fd.append(`gallery[${i}]`, f))
    // fetch("/api/events", { method: "POST", body: fd })

    // For now, just log:
    console.log("submit", { form, landscapeCard, portraitCard, galleryFiles, pocs })
    alert("Form submitted (UI-only). Check console for payload.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Hero preview of screenshot (example) */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={"/mnt/data/FireShot Capture 001 - District Publisher - [publish.district.in].png"}
                alt="example"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Create an Event</h3>
              <p className="text-sm text-muted-foreground">Fill the form below to publish your event on MERA SHOW.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <div className="p-6">
            <h2 className="text-xl font-semibold">Basic Info</h2>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Event Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your event's name"
                required
              />
            </div>

            <div>
              <Label>Instagram Link</Label>
              <Input
                value={form.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
                placeholder="Enter Valid Instagram Link"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Uploads */}
      <Card>
        <CardHeader>
          <div className="p-6">
            <h2 className="text-xl font-semibold">Event Card Images & Media</h2>
            <p className="text-sm text-muted-foreground mt-1">Upload landscape & portrait cards, a short video preview, and gallery images.</p>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Landscape */}
            <div className="space-y-2">
              <Label>Landscape (1600x900 recommended)</Label>
              <div className="rounded-md border border-border p-4 bg-background">
                <div className="flex items-center gap-4">
                  <div className="h-36 w-56 bg-muted rounded-md overflow-hidden">
                    {landscapeCard ? (
                      <img src={makePreview(landscapeCard)} alt="landscape" className="w-full h-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">Landscape preview</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">16:9 aspect (1600px by 900px). Max 2MB.</p>
                    <div className="mt-3 flex gap-2">
                      <label className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-md cursor-pointer hover:bg-primary/5">
                        <Upload size={16} />
                        <span className="text-sm">Upload</span>
                        <input type="file" accept="image/*" onChange={onFileChange(setLandscapeCard)} className="hidden" />
                      </label>
                      {landscapeCard && (
                        <button type="button" onClick={() => setLandscapeCard(null)} className="px-3 py-2 text-sm border border-border rounded-md">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Portrait */}
            <div className="space-y-2">
              <Label>Portrait (900x1200 recommended)</Label>
              <div className="rounded-md border border-border p-4 bg-background">
                <div className="flex items-center gap-4">
                  <div className="h-36 w-28 bg-muted rounded-md overflow-hidden">
                    {portraitCard ? (
                      <img src={makePreview(portraitCard)} alt="portrait" className="w-full h-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">Portrait preview</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">3:4 aspect (900px by 1200px). Max 2MB.</p>
                    <div className="mt-3 flex gap-2">
                      <label className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-md cursor-pointer hover:bg-primary/5">
                        <Upload size={16} />
                        <span className="text-sm">Upload</span>
                        <input type="file" accept="image/*" onChange={onFileChange(setPortraitCard)} className="hidden" />
                      </label>
                      {portraitCard && (
                        <button type="button" onClick={() => setPortraitCard(null)} className="px-3 py-2 text-sm border border-border rounded-md">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video */}
          <div>
            <Label>Video sneak peek (optional)</Label>
            <div className="rounded-md border border-border p-4 bg-background flex items-center gap-4">
              <input type="file" accept="video/*" onChange={onFileChange(setVideoPreview)} />
              {videoPreview && (
                <div className="ml-4">
                  <video src={makePreview(videoPreview)} controls className="max-h-40 rounded-md" />
                </div>
              )}
            </div>
          </div>

          {/* Gallery */}
          <div>
            <Label>Gallery</Label>
            <div className="rounded-md border border-border p-4 bg-background">
              <div className="flex items-center gap-3 mb-3">
                <label className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-md cursor-pointer hover:bg-primary/5">
                  <Plus size={16} />
                  <span className="text-sm">Add Images</span>
                  <input type="file" accept="image/*" multiple onChange={onGalleryAdd} className="hidden" />
                </label>
                <p className="text-sm text-muted-foreground">Max 1.5MB per image. JPG/PNG</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {galleryFiles.map((f, i) => (
                  <div key={i} className="relative rounded-md overflow-hidden border border-border">
                    <img src={makePreview(f)} alt={`g${i}`} className="w-full h-24 object-cover" />
                    <button type="button" onClick={() => removeGalleryItem(i)} className="absolute top-1 right-1 p-1 bg-background/80 rounded-full">
                      <Trash size={14} />
                    </button>
                  </div>
                ))}
                {galleryFiles.length === 0 && (
                  <div className="col-span-3 text-sm text-muted-foreground">No gallery images added</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Guide */}
      <Card>
        <CardHeader>
          <div className="p-6">
            <h2 className="text-xl font-semibold">Event Guide</h2>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Languages</Label>
              <Input value={form.languages} onChange={(e) => handleChange("languages", e.target.value)} placeholder="Which languages?" />
            </div>

            <div>
              <Label>Min age allowed</Label>
              <Select value={form.minAge} onValueChange={(v) => handleChange("minAge", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ages</SelectItem>
                  <SelectItem value="18">18 & above</SelectItem>
                  <SelectItem value="21">21 & above</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Paid entry age (if any)</Label>
              <Input value={form.paidEntryAge} onChange={(e) => handleChange("paidEntryAge", e.target.value)} />
            </div>

            <div>
              <Label>Venue type</Label>
              <Select value={form.indoor} onValueChange={(v) => handleChange("indoor", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Indoor / Outdoor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Seating</Label>
              <Select value={form.seating} onValueChange={(v) => handleChange("seating", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seated / Standing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seated">Seated</SelectItem>
                  <SelectItem value="standing">Standing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Kid-friendly</Label>
              <Select value={form.kidFriendly} onValueChange={(v) => handleChange("kidFriendly", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Yes / No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Pet-friendly</Label>
              <Select value={form.petFriendly} onValueChange={(v) => handleChange("petFriendly", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Yes / No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Gates open before (minutes)</Label>
              <div className="flex items-center gap-3">
                <Slider value={[form.gatesOpenBefore]} min={0} max={120} onValueChange={([v]) => handleChange("gatesOpenBefore", v)} />
                <div className="w-16 text-sm text-muted-foreground">{form.gatesOpenBefore}m</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <div className="p-6">
            <h2 className="text-xl font-semibold">Event Description</h2>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Label>Event Description *</Label>
          <Textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Your event's description"
            rows={6}
            required
          />
        </CardContent>
      </Card>

      {/* Location + Organizer + Category */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>City</Label>
              <Select value={form.city} onValueChange={(v) => handleChange("city", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label>Venue / Address</Label>
              <Input value={form.venue} onChange={(e) => handleChange("venue", e.target.value)} placeholder="Search and select your venue address" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Organizer</Label>
              <Select value={form.organizer} onValueChange={(v) => handleChange("organizer", v)}>
                <SelectTrigger><SelectValue placeholder="Select organizer" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="umbrella">Umbrella Events</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={(v) => handleChange("category", v)}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Subcategory</Label>
              <Select value={form.subcategory} onValueChange={(v) => handleChange("subcategory", v)}>
                <SelectTrigger><SelectValue placeholder="Subcategory" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Select subcategory</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add more sections */}
      <Card>
        <CardContent className="p-6">
          <Label>Add more sections</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            <button type="button" className="px-3 py-1 bg-muted border border-border rounded-full text-sm">Event Instructions</button>
            <button type="button" className="px-3 py-1 bg-muted border border-border rounded-full text-sm">Youtube Video</button>
            <button type="button" className="px-3 py-1 bg-muted border border-border rounded-full text-sm">Prohibited Items</button>
            <button type="button" className="px-3 py-1 bg-muted border border-border rounded-full text-sm">FAQs</button>
          </div>
        </CardContent>
      </Card>

      {/* Point of Contact */}
      <Card>
        <CardHeader>
          <div className="p-6">
            <h2 className="text-xl font-semibold">Point of Contact</h2>
            <p className="text-sm text-muted-foreground mt-1">Please add POCs with whom event feedback will be shared.</p>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {pocs.map((p, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div>
                <Label>Name</Label>
                <Input value={p.name} onChange={(e) => updatePoc(idx, "name", e.target.value)} />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={p.email} onChange={(e) => updatePoc(idx, "email", e.target.value)} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={p.phone} onChange={(e) => updatePoc(idx, "phone", e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => removePoc(idx)} className="w-full">Remove</Button>
                {idx === pocs.length - 1 && <Button onClick={addPoc} className="w-full">+ Add</Button>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Footer actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Switch checked={form.sendCopy} onCheckedChange={(v) => handleChange("sendCopy", v)} />
          <div>
            <div className="text-sm">Send a copy of every sale to organizer</div>
            <div className="text-xs text-muted-foreground">If enabled, a copy of every sale email will be sent to the organizer email.</div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">Save draft</Button>
          <Button type="submit">Next</Button>
        </div>
      </div>
    </form>
  )
}
