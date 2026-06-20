"use client";

import { IconColumns3, IconReceipt, IconUserCircle, IconCalculator, IconUsers, IconArrowRight, IconCurrencyDollar, IconChartBar, IconTargetArrow, IconFileInvoice } from "@tabler/icons-react";
import Link from "next/link";

const HIGHLIGHTS = [
  {
    icon: IconCurrencyDollar,
    title: "Earnings",
    value: "$4,850",
    sub: "estimated this month",
    href: "/dashboard/earnings",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: IconChartBar,
    title: "Team Spend",
    value: "$2,850",
    sub: "59% of revenue",
    href: "/dashboard/spending",
    color: "text-[#7B6EF6]",
    bg: "bg-[#7B6EF6]/5",
  },
  {
    icon: IconReceipt,
    title: "Payments",
    value: "6",
    sub: "logged this month",
    href: "/dashboard/payments",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: IconColumns3,
    title: "Pipeline",
    value: "3",
    sub: "videos in progress",
    href: "/dashboard/pipeline",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const QUICK_ACTIONS = [
  { icon: IconColumns3, label: "Add a video to pipeline", href: "/dashboard/pipeline" },
  { icon: IconReceipt, label: "Log a payment", href: "/dashboard/payments" },
  { icon: IconFileInvoice, label: "Create an invoice", href: "/dashboard/invoices" },
  { icon: IconCalculator, label: "Calculate fair pay", href: "/dashboard/calculator" },
  { icon: IconTargetArrow, label: "Set a bonus target", href: "/dashboard/bonuses" },
  { icon: IconUsers, label: "Manage team", href: "/dashboard/team" },
  { icon: IconUserCircle, label: "Manage public profiles", href: "/dashboard/profiles" },
  { icon: IconCurrencyDollar, label: "View channel earnings", href: "/dashboard/earnings" },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
          Dashboard
        </h1>
        <p className="text-[13px] text-zinc-500 mt-1">
          Your YouTube team at a glance.
        </p>
      </div>

      {/* Highlight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {HIGHLIGHTS.map(h => (
          <Link key={h.title} href={h.href}
            className="bg-white rounded-2xl border border-zinc-200 p-5 hover:border-zinc-300 hover:shadow-sm transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-lg ${h.bg} flex items-center justify-center`}>
                <h.icon size={16} className={h.color} />
              </div>
              <IconArrowRight size={13} className="text-zinc-300 group-hover:text-zinc-400 transition-colors" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">{h.title}</p>
            <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono mt-1">{h.value}</p>
            <p className="text-[12px] text-zinc-400 mt-0.5">{h.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-6">
        <h2 className="font-heading text-lg font-medium text-zinc-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(a => (
            <Link key={a.label} href={a.href}
              className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50 hover:border-zinc-200 transition-colors">
              <a.icon size={16} className="text-zinc-400 shrink-0" stroke={1.6} />
              <span className="text-[12px] text-zinc-700">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting started */}
      <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6">
        <h2 className="font-heading text-lg font-medium text-zinc-900 mb-1">Getting Started</h2>
        <p className="text-[13px] text-zinc-500 mb-4">Set up your workspace step by step.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            "Add your team members",
            "Add your first video to the pipeline",
            "Log your first payment",
            "Set your channel RPM in Earnings",
            "Create your first invoice",
            "Set up a team member's public profile",
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-zinc-100 px-4 py-3">
              <div className="w-5 h-5 rounded-full border-2 border-zinc-300 shrink-0" />
              <span className="text-[13px] text-zinc-700">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
