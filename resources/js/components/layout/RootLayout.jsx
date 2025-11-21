"use client";

import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Navbar */}
      <Navbar />

      <div className="flex">
        {/* FIXED SIDEBAR */}
        <aside className="hidden md:block w-64 fixed top-[72px] left-0 bottom-0 border-r border-border bg-card overflow-y-auto">
          <div className="p-4">
            <Sidebar />
          </div>
        </aside>

        {/* PAGE CONTENT */}
        <main className="flex-1 md:ml-64 p-6 mt-4">
          {children}
        </main>
      </div>
    </div>
  );
}
