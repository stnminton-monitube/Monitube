"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemo } from "@/components/dashboard/DemoProvider";
import {
  IconLayoutDashboard,
  IconUsers,
  IconVideo,
  IconCoin,
  IconClipboardText,
  IconChartBar,
  IconBell,
  IconActivity,
  IconSettings,
  IconBrain,
  IconX,
  IconCalculator,
} from "@tabler/icons-react";

const nav = [
  { label: "Overview",        href: "/dashboard",               icon: IconLayoutDashboard },
  { label: "Team",            href: "/dashboard/team",           icon: IconUsers },
  { label: "Videos",          href: "/dashboard/videos",         icon: IconVideo },
  { label: "Pay Calculator",  href: "/dashboard/calculator",     icon: IconCalculator },
  { label: "Bonuses",         href: "/dashboard/bonuses",        icon: IconCoin },
  { label: "Performance Log", href: "/dashboard/log",            icon: IconClipboardText },
  { label: "Reports",         href: "/dashboard/reports",        icon: IconChartBar },
  { label: "Alerts",          href: "/dashboard/alerts",         icon: IconBell },
  { label: "Activity",        href: "/dashboard/activity",       icon: IconActivity },
  { label: "Settings",        href: "/dashboard/settings",       icon: IconSettings },
];

export default function Sidebar({ open, onClose, onAiClick }: { open: boolean; onClose: () => void; onAiClick?: () => void }) {
  const pathname = usePathname();
  const { demo } = useDemo();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px] flex flex-col
          bg-white border-r border-zinc-200
          transition-transform duration-200
          lg:translate-x-0 lg:z-30
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-zinc-100">
          <Link href="/dashboard" className="select-none" onClick={onClose}>
            <span className="font-heading text-[18px] font-medium tracking-tight text-zinc-900">
              Moni<span className="bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] bg-clip-text text-transparent">tube</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="flex flex-col gap-0.5">
            {nav.map(({ label, href, icon: Icon }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-normal
                      transition-colors duration-150
                      ${active
                        ? "bg-[#7B6EF6]/8 text-[#7B6EF6] font-medium"
                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                      }
                    `}
                  >
                    <Icon size={18} stroke={1.6} />
                    {label}
                    {label === "Alerts" && (
                      <span className="ml-auto bg-[#7B6EF6] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none">
                        0
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* AI button */}
        <div className="px-3 pb-3">
          <button onClick={onAiClick} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] bg-gradient-to-r from-[#7B6EF6]/8 to-[#E96BF5]/8 border border-[#7B6EF6]/15 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">
            <IconBrain size={18} stroke={1.6} className="text-[#7B6EF6]" />
            <div className="text-left">
              <div className="font-medium text-zinc-800">Ask AI</div>
              <div className="text-[11px] text-zinc-400">Team insights</div>
            </div>
          </button>
        </div>

        {/* Channel info */}
        <div className="px-5 py-4 border-t border-zinc-100">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Channel</p>
          {demo ? (
            <div className="flex items-center gap-2.5 mt-2">
              {demo.channel.thumbnail && (
                <img src={demo.channel.thumbnail} alt="" className="w-7 h-7 rounded-full shrink-0" />
              )}
              <p className="text-[13px] text-zinc-700 font-medium truncate">{demo.channel.name}</p>
            </div>
          ) : (
            <p className="text-[13px] text-zinc-500 mt-1">No channel connected</p>
          )}
        </div>
      </aside>
    </>
  );
}
