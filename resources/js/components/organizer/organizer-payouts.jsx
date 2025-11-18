"use client"

import { DollarSign } from "lucide-react"

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
]

export default function OrganizerPayouts() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payouts</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <p className="text-slate-400 text-sm">Total Earnings</p>
          <p className="text-4xl font-bold mt-2 text-gradient">₹35,75,000</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm">Pending Payout</p>
          <p className="text-4xl font-bold mt-2 text-accent">₹2,50,000</p>
          <button className="mt-4 px-4 py-2 bg-accent hover:bg-accent-dark rounded-lg font-medium text-background transition">
            Request Payout
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-4">Recent Payouts</h3>
        <div className="space-y-3">
          {payouts.map((payout) => (
            <div key={payout.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <DollarSign className="text-green-400" size={24} />
                </div>
                <div>
                  <p className="font-medium">{payout.amount}</p>
                  <p className="text-sm text-slate-400">{payout.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">{new Date(payout.date).toLocaleDateString()}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
