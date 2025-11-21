"use client";

import { Link, usePage } from "@inertiajs/react";
import { Users, BarChart3, DollarSign, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const { url } = usePage();

  const isActive = (path) =>
    url.startsWith(path)
      ? "bg-primary text-primary-foreground hover:bg-primary"
      : "hover:bg-accent hover:text-accent-foreground";

  const navItem = (href, Icon, label, path) => (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-4 py-3 rounded-lg transition",
          isActive(path)
        )}
      >
        <Icon size={18} />
        {label}
      </Button>
    </Link>
  );

  return (
    <Card className="p-4 space-y-2 border border-border bg-card">
      {navItem("/dashboard", Users, "Overview", "/dashboard")}
      {navItem("/events", Users, "My Events", "/events")}
      {navItem("/analytics", BarChart3, "Analytics", "/analytics")}
      {navItem("/payouts", DollarSign, "Payouts", "/payouts")}
      {navItem("/profile", Users, "Profile", "/profile")}

      <Link href="/auth/logout">
        <Button
          variant="outline"
          className="w-full gap-2 mt-4 border-border text-red-500 hover:bg-accent"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </Link>
    </Card>
  );
}