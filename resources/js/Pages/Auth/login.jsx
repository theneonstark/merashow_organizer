"use client"

import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-slate-900 to-background px-4">
      <LoginForm />
    </div>
  )
}
