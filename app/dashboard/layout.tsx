"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import DemoProvider from "@/components/dashboard/DemoProvider";
import AIPanel from "@/components/dashboard/AIPanel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <DemoProvider>
      <div className="min-h-screen bg-zinc-50">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onAiClick={() => setAiOpen(true)}
        />
        <div className="lg:pl-[260px]">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-6 max-w-7xl mx-auto">
            {children}
          </main>
        </div>
        <AIPanel open={aiOpen} onClose={() => setAiOpen(false)} />
      </div>
    </DemoProvider>
  );
}
