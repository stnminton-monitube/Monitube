"use client";

import { IconColumns3, IconReceipt, IconUserCircle, IconCalculator, IconUsers, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

const PILLARS = [
  {
    icon: IconColumns3,
    title: "Pipeline",
    desc: "Track every video from idea to published. See who's working on what, deadlines, and where things stand.",
    href: "/dashboard/pipeline",
    color: "from-[#7B6EF6] to-[#6358d4]",
  },
  {
    icon: IconReceipt,
    title: "Payments",
    desc: "Log what you pay each team member. See your total spend per person, per video, and per month.",
    href: "/dashboard/payments",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: IconUserCircle,
    title: "Public Profiles",
    desc: "Give your team verified portfolios they can share when applying for work — backed by real channel data.",
    href: "/dashboard/profiles",
    color: "from-[#E96BF5] to-[#c74ed4]",
  },
];

const QUICK_ACTIONS = [
  { icon: IconColumns3, label: "Add a video to pipeline", href: "/dashboard/pipeline" },
  { icon: IconUsers, label: "Manage team members", href: "/dashboard/team" },
  { icon: IconCalculator, label: "Calculate fair pay", href: "/dashboard/calculator" },
  { icon: IconReceipt, label: "Log a payment", href: "/dashboard/payments" },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
          Welcome to Monitube
        </h1>
        <p className="text-[13px] text-zinc-500 mt-1">
          Manage your YouTube team — projects, pay, and portfolios in one place.
        </p>
      </div>

      {/* Three pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {PILLARS.map(p => (
          <Link key={p.title} href={p.href}
            className="bg-white rounded-2xl border border-zinc-200 p-6 hover:border-zinc-300 hover:shadow-sm transition-all group">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4`}>
              <p.icon size={20} className="text-white" />
            </div>
            <h2 className="font-heading text-lg font-medium text-zinc-900 mb-1.5">{p.title}</h2>
            <p className="text-[13px] text-zinc-500 leading-relaxed mb-3">{p.desc}</p>
            <span className="text-[12px] text-[#7B6EF6] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Open <IconArrowRight size={13} />
            </span>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-6">
        <h2 className="font-heading text-lg font-medium text-zinc-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUICK_ACTIONS.map(a => (
            <Link key={a.label} href={a.href}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-100 hover:bg-zinc-50 hover:border-zinc-200 transition-colors">
              <a.icon size={18} className="text-zinc-400" stroke={1.6} />
              <span className="text-[13px] text-zinc-700">{a.label}</span>
              <IconArrowRight size={13} className="ml-auto text-zinc-300" />
            </Link>
          ))}
        </div>
      </div>

      {/* Getting started checklist */}
      <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6">
        <h2 className="font-heading text-lg font-medium text-zinc-900 mb-1">Getting Started</h2>
        <p className="text-[13px] text-zinc-500 mb-4">Set up your workspace in 4 steps.</p>
        <div className="space-y-2.5">
          {[
            { step: "Add your team members", done: false },
            { step: "Add your first video to the pipeline", done: false },
            { step: "Log your first payment", done: false },
            { step: "Set up a team member's public profile", done: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-zinc-100 px-4 py-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                s.done ? "border-emerald-500 bg-emerald-500" : "border-zinc-300"
              }`}>
                {s.done && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`text-[13px] ${s.done ? "text-zinc-400 line-through" : "text-zinc-700"}`}>{s.step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
