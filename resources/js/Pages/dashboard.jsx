"use client";

import { Plus, LogOut, BarChart3, DollarSign, Users } from "lucide-react";
import { useEffect, useState } from "react";
import OrganizerEvents from "@/components/organizer-events";
import OrganizerAnalytics from "@/components/organizer-analytics";
import OrganizerPayouts from "@/components/organizer-payouts";
import CreateEventModal from "@/components/create-event-modal";
import { Link, usePage } from "@inertiajs/react";
import ProfileSection from "@/components/profile";

export default function OrganizerDashboard() {
  const { props } = usePage();
  const user = props.auth?.user;
  console.log(user);
  

  // Boolean checks
  const isDocPending = Number(user?.document_verification) === 0;
  const isProfilePending = Number(user?.approved) === 0;

  const isRestricted = isDocPending || isProfilePending;

  const [activeTab, setActiveTab] = useState("events");
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  // Auto redirect to profile
  useEffect(() => {
    if (isRestricted) {
      setActiveTab("profile");
    }
  }, [isRestricted]);

  const stats = [
    { label: "Total Tickets Sold", value: "1,234", icon: Users },
    { label: "Total Earnings", value: "₹24,68,000", icon: DollarSign },
    { label: "Live Events", value: "8", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background py-8 text-foreground">
      <div className="container mx-auto px-4">

        {/* Alerts */}
        <div className="space-y-3 mb-6">
          {isDocPending && (
            <div className="p-4 bg-yellow-500/15 border border-yellow-500/40 text-yellow-500 rounded-lg">
              📄 Your documents are pending verification.
            </div>
          )}

          {isProfilePending && (
            <div className="p-4 bg-red-500/15 border border-red-500/40 text-red-500 rounded-lg">
              🔒 Your profile is under admin review.
            </div>
          )}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {user?.name}!
            </p>
          </div>

          {/* Create Button */}
          <button
            onClick={() => !isRestricted && setShowCreateEvent(true)}
            disabled={isRestricted}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              isRestricted
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            <Plus size={18} />
            Create Event
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-card text-card-foreground border border-border rounded-lg p-6"
            >
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
              <div className="mt-4 p-3 bg-secondary rounded-lg inline-flex">
                <stat.icon className="text-secondary-foreground" size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 sticky top-20 space-y-2">

              <nav className="space-y-2">
                {/* Events */}
                <button
                  onClick={() => !isRestricted && setActiveTab("events")}
                  disabled={isRestricted}
                  className={`w-full px-4 py-3 rounded-lg text-left transition ${
                    activeTab === "events"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  } ${isRestricted && "opacity-50 cursor-not-allowed"}`}
                >
                  My Events
                </button>

                {/* Analytics */}
                <button
                  onClick={() => !isRestricted && setActiveTab("analytics")}
                  disabled={isRestricted}
                  className={`w-full px-4 py-3 rounded-lg text-left transition ${
                    activeTab === "analytics"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  } ${isRestricted && "opacity-50 cursor-not-allowed"}`}
                >
                  Analytics
                </button>

                {/* Payouts */}
                <button
                  onClick={() => !isRestricted && setActiveTab("payouts")}
                  disabled={isRestricted}
                  className={`w-full px-4 py-3 rounded-lg text-left transition ${
                    activeTab === "payouts"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  } ${isRestricted && "opacity-50 cursor-not-allowed"}`}
                >
                  Payouts
                </button>

                {/* Profile — always allowed */}
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full px-4 py-3 rounded-lg text-left transition ${
                    activeTab === "profile"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Profile
                </button>
              </nav>

              <Link href={"/auth/logout"}>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-4 border border-border hover:bg-accent rounded-lg transition text-red-500">
                  <LogOut size={18} />
                  Logout
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:col-span-3">
            {isRestricted && activeTab !== "profile" ? (
              <div className="p-6 bg-accent border border-border rounded-lg text-center text-muted-foreground">
                🚫 Access restricted while your verification is pending.
                <br />
                👉 You can still view your Profile.
              </div>
            ) : (
              <>
                {activeTab === "events" && <OrganizerEvents />}
                {activeTab === "analytics" && <OrganizerAnalytics />}
                {activeTab === "payouts" && <OrganizerPayouts />}
                {activeTab === "profile" && <ProfileSection user={user} />}
              </>
            )}
          </div>
        </div>
      </div>

      {showCreateEvent && (
        <CreateEventModal onClose={() => setShowCreateEvent(false)} />
      )}
    </div>
  );
}