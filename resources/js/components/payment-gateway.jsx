"use client"

import { CreditCard, Loader2, Lock } from "lucide-react"
import { useState } from "react"

export default function PaymentGateway({ onClose, amount, eventName, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiiry: "",
    cvv: "",
  })

  const handlePayment = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert(`Payment of ₹${amount} processed successfully for ${eventName}`)
    setLoading(false)
    onSuccess?.()
    onClose()
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Payment Details</h3>
        <Lock className="text-accent" size={20} />
      </div>

      <div className="bg-slate-700/30 rounded-lg p-4 space-y-1">
        <p className="text-sm text-slate-400">Event</p>
        <p className="font-bold">{eventName}</p>
        <p className="text-accent text-lg font-bold mt-2">₹{amount}</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Payment Method</label>
        <div className="space-y-2">
          {[
            { value: "card", label: "Credit / Debit Card" },
            { value: "upi", label: "UPI" },
            { value: "netbanking", label: "Net Banking" },
            { value: "wallet", label: "Digital Wallet" },
          ].map((method) => (
            <label
              key={method.value}
              className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition"
            >
              <input
                type="radio"
                name="payment"
                value={method.value}
                checked={paymentMethod === method.value}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">{method.label}</span>
            </label>
          ))}
        </div>
      </div>

      {paymentMethod === "card" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Card Number (16 digits)"
            maxLength="16"
            value={cardData.cardNumber}
            onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
          />
          <input
            type="text"
            placeholder="Card Holder Name"
            value={cardData.cardHolder}
            onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              value={cardData.expiiry}
              onChange={(e) => setCardData({ ...cardData, expiiry: e.target.value })}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
            />
            <input
              type="text"
              placeholder="CVV"
              maxLength="3"
              value={cardData.cvv}
              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
            />
          </div>
        </div>
      )}

      {paymentMethod === "upi" && (
        <input
          type="text"
          placeholder="UPI ID (example@bank)"
          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
        />
      )}

      <div className="border-t border-slate-700 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{amount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Processing Fee</span>
          <span>₹0</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-slate-700 pt-2">
          <span>Total Amount</span>
          <span className="text-accent">₹{amount}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full py-3 bg-accent hover:bg-accent-dark rounded-lg font-bold text-background transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard size={18} />
            Pay ₹{amount}
          </>
        )}
      </button>

      <p className="text-xs text-center text-slate-400">Your payment is secured with industry-standard encryption</p>
    </div>
  )
}
