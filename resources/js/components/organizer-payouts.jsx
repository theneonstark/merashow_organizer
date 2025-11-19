"use client";

import { DollarSign } from "lucide-react";

const payouts = [
  {
    id: "payout-001",
    amount: "₹15,00,000",
    date: "2024-12-10",
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "payout-002",
    amount: "₹8,50,000",
    date: "2024-12-03",
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "payout-003",
    amount: "₹12,25,000",
    date: "2024-11-26",
    status: "completed",
    method: "Bank Transfer",
  },
];

export default function OrganizerPayouts() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payouts</h2>

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        
        {/* Total Earnings */}
        <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Total Earnings</p>
          <p className="text-4xl font-bold mt-2">₹35,75,000</p>
        </div>

        {/* Pending Payout */}
        <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Pending Payout</p>
          <p className="text-4xl font-bold mt-2">₹2,50,000</p>

          <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition">
            Request Payout
          </button>
        </div>
      </div>

      {/* Recent Payouts */}
      <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Recent Payouts</h3>

        <div className="space-y-3">
          {payouts.map((payout) => (
            <div
              key={payout.id}
              className="flex items-center justify-between p-4 bg-accent rounded-lg border border-border"
            >
              <div className="flex items-center gap-4">
                
                {/* Icon */}
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <DollarSign className="text-green-500" size={24} />
                </div>

                {/* Info */}
                <div>
                  <p className="font-medium">{payout.amount}</p>
                  <p className="text-sm text-muted-foreground">{payout.method}</p>
                </div>
              </div>

              {/* Right Section */}
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {new Date(payout.date).toLocaleDateString()}
                </p>

                <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-500 text-xs rounded-full">
                  {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}