"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  FileText,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Info,
  Pencil,
  X,
} from "lucide-react";

// =========================
// MAIN PROFILE COMPONENT
// =========================
export default function ProfileSection({ user }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    org_name: user.org_name,
    business_description: user.business_description,
    contact_person_name: user.contact_person_name,
    contact_phone: user.contact_phone,
    holder_name: user.holder_name,
    account_number: user.account_number,
    ifsc_code: user.ifsc_code,
  });

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit (API integrate later)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT FORM DATA:", form);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Profile</h2>

        {/* Edit Button */}
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition"
        >
          <Pencil size={16} /> Edit Profile
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-card text-card-foreground border border-border rounded-lg p-6">

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="text-primary" size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground text-sm">Organizer Profile Overview</p>
          </div>
        </div>

        {/* GRID INFO */}
        <div className="grid md:grid-cols-2 gap-6">
          <ProfileItem icon={<User size={16} />} label="Full Name" value={user.name} />
          <ProfileItem icon={<Mail size={16} />} label="Email" value={user.email} />
          <ProfileItem icon={<Phone size={16} />} label="Phone" value={user.phone || "---"} />
          <ProfileItem icon={<Building2 size={16} />} label="Organization Name" value={user.org_name || "---"} />
          <ProfileItem icon={<Briefcase size={16} />} label="Business Type" value={user.business_id || "Not Assigned"} />
          <ProfileItem icon={<FileText size={16} />} label="Business Description" value={user.business_description || "---"} />
          <ProfileItem icon={<User size={16} />} label="Contact Person" value={user.contact_person_name || "---"} />
          <ProfileItem icon={<Phone size={16} />} label="Contact Phone" value={user.contact_phone || "---"} />
          <ProfileItem icon={<User size={16} />} label="Bank Account Holder" value={user.holder_name || "---"} />
          <ProfileItem icon={<Info size={16} />} label="Account Number" value={user.account_number || "---"} />
          <ProfileItem icon={<Info size={16} />} label="IFSC Code" value={user.ifsc_code || "---"} />

          {/* VERIFICATION SECTION */}
          <div className="p-4 bg-accent rounded-lg border border-border md:col-span-2">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <ShieldCheck size={16} /> Verification Status
            </p>

            <div className="mt-3 flex items-center gap-3">
              {user.document_verification ? (
                <StatusBadge color="green" text="Documents Verified" icon={<CheckCircle size={14} />} />
              ) : (
                <StatusBadge color="yellow" text="Documents Pending" icon={<XCircle size={14} />} />
              )}

              {user.approved ? (
                <StatusBadge color="green" text="Profile Approved" icon={<CheckCircle size={14} />} />
              ) : (
                <StatusBadge color="red" text="Profile Review Pending" icon={<XCircle size={14} />} />
              )}

              {user.terms_accepted ? (
                <StatusBadge color="green" text="Terms Accepted" icon={<CheckCircle size={14} />} />
              ) : (
                <StatusBadge color="yellow" text="Terms Not Accepted" icon={<XCircle size={14} />} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {open && (
        <EditModal
          form={form}
          setOpen={setOpen}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

// =========================
// REUSABLE PROFILE FIELD
// =========================
function ProfileItem({ icon, label, value }) {
  return (
    <div className="p-4 bg-accent rounded-lg border border-border">
      <p className="text-muted-foreground text-sm flex items-center gap-2">
        {icon} {label}
      </p>
      <p className="text-lg font-medium mt-1">{value}</p>
    </div>
  );
}

// =========================
// STATUS BADGE
// =========================
function StatusBadge({ color, text, icon }) {
  const colors = {
    green: "bg-green-500/20 text-green-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    red: "bg-red-500/20 text-red-400",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${colors[color]}`}>
      {icon}
      {text}
    </span>
  );
}

// =========================
// EDIT MODAL POPUP
// =========================
function EditModal({ form, setOpen, handleChange, handleSubmit }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card p-6 rounded-lg border border-border w-full max-w-xl">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-accent rounded-md">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <FormInput label="Full Name" name="name" value={form.name} handleChange={handleChange} />
          <FormInput label="Phone Number" name="phone" value={form.phone} handleChange={handleChange} />
          <FormInput label="Organization Name" name="org_name" value={form.org_name} handleChange={handleChange} />
          <FormInput label="Business Description" name="business_description" value={form.business_description} handleChange={handleChange} />
          <FormInput label="Contact Person Name" name="contact_person_name" value={form.contact_person_name} handleChange={handleChange} />
          <FormInput label="Contact Phone" name="contact_phone" value={form.contact_phone} handleChange={handleChange} />
          <FormInput label="Account Holder Name" name="holder_name" value={form.holder_name} handleChange={handleChange} />
          <FormInput label="Account Number" name="account_number" value={form.account_number} handleChange={handleChange} />
          <FormInput label="IFSC Code" name="ifsc_code" value={form.ifsc_code} handleChange={handleChange} />

          <button
            type="submit"
            className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

// INPUT FIELD
function FormInput({ label, name, value, handleChange }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground">{label}</label>
      <input
        type="text"
        name={name}
        value={value ?? ""}
        onChange={handleChange}
        className="w-full mt-1 px-3 py-2 bg-accent border border-border rounded-md"
      />
    </div>
  );
}