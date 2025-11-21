"use client";

import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { register } from "@/lib/apis";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!name || !email || !password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const payload = {
        name,
        email,
        password,
      };

      await register(payload);

      // 🔥 Redirect to onboarding page
      router.visit("/onboarding");

    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-2">Create Account</h1>
        <p className="text-slate-400 mb-6">Join HostMyShow today</p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-500" size={18} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-accent hover:bg-accent/90 rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}