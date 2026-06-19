"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { IconMenu2, IconLayoutDashboard, IconSettings, IconLogout } from "@tabler/icons-react";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const initial = user?.firstName?.[0] ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? "?";
  const name = user?.firstName ?? "User";

  return (
    <header className="h-16 bg-white border-b border-zinc-200 px-5 flex items-center justify-between sticky top-0 z-20">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-zinc-100 text-zinc-500 cursor-pointer"
      >
        <IconMenu2 size={20} />
      </button>

      {/* Page title area — filled by pages if needed */}
      <div className="flex-1" />

      {/* User menu */}
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[13px] font-semibold font-heading">
            {initial}
          </div>
          <span className="hidden sm:block text-[13px] text-zinc-700 font-medium">{name}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`text-zinc-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}>
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl border border-zinc-200 shadow-lg overflow-hidden z-50">
            <div className="p-1.5">
              <a href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                <IconLayoutDashboard size={15} stroke={1.5} />
                Dashboard
              </a>
              <a href="/dashboard/settings" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                <IconSettings size={15} stroke={1.5} />
                Settings
              </a>
              <div className="my-1 h-px bg-zinc-100" />
              <button
                onClick={() => { setOpen(false); signOut(() => router.push("/")); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <IconLogout size={15} stroke={1.5} />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
