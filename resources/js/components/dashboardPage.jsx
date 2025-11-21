"use client";

import { usePage } from "@inertiajs/react";

export default function DashboardPage() {
  const { props } = usePage();
  const user = props.auth?.user;

  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold">Dashboard</h1>

      <p className="text-muted-foreground">
        Welcome back, {user?.name}!  
      </p>

      <div className="p-6 bg-card border border-border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Quick Overview</h2>
        <p className="text-muted-foreground">
          Use the sidebar to manage your events, view analytics, handle payouts, or edit your profile.
        </p>
      </div>

    </div>
  );
}
