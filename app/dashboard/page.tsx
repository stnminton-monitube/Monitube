"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconCurrencyDollar,
  IconUsers,
  IconColumns3,
  IconChartBar,
} from "@tabler/icons-react";

/* ─── Demo data ────────────────────────────────────────────── */

const RECENT_PAYMENTS = [
  { name: "Jake Morrison", amount: 475, date: "Jun 18" },
  { name: "Sofia Chen", amount: 65, date: "Jun 15" },
  { name: "Marcus Williams", amount: 275, date: "Jun 12" },
  { name: "Priya Sharma", amount: 380, date: "Jun 10" },
  { name: "Tyler Brooks", amount: 175, date: "Jun 8" },
];

const ACTIVE_BONUSES = [
  { member: "Jake Morrison", target: "Avg 80K+ views across 5 videos", progress: 60, bonus: 200 },
  { member: "Sofia Chen", target: "Complete 10 thumbnails this month", progress: 70, bonus: 100 },
  { member: "Marcus Williams", target: "48hr script delivery for 4 videos", progress: 50, bonus: 150 },
];

const PIPELINE_STAGES = [
  { label: "Idea", count: 2 },
  { label: "Script", count: 1 },
  { label: "Filming", count: 0 },
  { label: "Editing", count: 2 },
  { label: "Review", count: 1 },
  { label: "Published", count: 2 },
];

/* ─── Helpers ──────────────────────────────────────────────── */

function fmtDollars(n: number): string {
  return "$" + n.toLocaleString();
}

/* ─── Component ────────────────────────────────────────────── */

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
          Overview
        </h1>
        <p className="text-[13px] text-zinc-500 mt-1">
          Your YouTube team at a glance.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-2xl border border-zinc-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
              <IconCurrencyDollar size={14} className="text-emerald-600" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Revenue</p>
          </div>
          <p className="font-heading text-xl font-medium tracking-tight text-zinc-900 font-mono">$4,850<span className="text-[12px] text-zinc-400 font-normal">/mo</span></p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#7B6EF6]/5 flex items-center justify-center">
              <IconChartBar size={14} className="text-[#7B6EF6]" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Team Cost</p>
          </div>
          <p className="font-heading text-xl font-medium tracking-tight text-zinc-900 font-mono">$2,850<span className="text-[12px] text-zinc-400 font-normal">/mo</span></p>
          <p className="text-[10px] text-zinc-400 mt-0.5">59% of revenue</p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
              <IconColumns3 size={14} className="text-amber-600" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">In Pipeline</p>
          </div>
          <p className="font-heading text-xl font-medium tracking-tight text-zinc-900 font-mono">3</p>
          <p className="text-[10px] text-zinc-400 mt-0.5">videos in progress</p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <IconUsers size={14} className="text-blue-600" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Team</p>
          </div>
          <p className="font-heading text-xl font-medium tracking-tight text-zinc-900 font-mono">6</p>
          <p className="text-[10px] text-zinc-400 mt-0.5">members</p>
        </div>
      </div>

      {/* Middle section: payments + bonuses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Recent payments */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Recent Payments</p>
            <Link href="/dashboard/money" className="text-[11px] text-[#7B6EF6] font-medium flex items-center gap-1 hover:underline">
              View all <IconArrowRight size={11} />
            </Link>
          </div>
          <div className="flex flex-col">
            {RECENT_PAYMENTS.map((p, i) => (
              <div key={p.name} className={`flex items-center justify-between py-2.5 ${i < RECENT_PAYMENTS.length - 1 ? "border-b border-zinc-50" : ""}`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[9px] font-semibold font-heading shrink-0">
                    {p.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <p className="text-[13px] text-zinc-900">{p.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-[13px] text-emerald-700 font-mono font-medium">{fmtDollars(p.amount)}</p>
                  <p className="text-[11px] text-zinc-400 font-mono">{p.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active bonuses */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Active Bonuses</p>
            <Link href="/dashboard/bonuses" className="text-[11px] text-[#7B6EF6] font-medium flex items-center gap-1 hover:underline">
              View all <IconArrowRight size={11} />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {ACTIVE_BONUSES.map((b) => (
              <div key={b.member}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[13px] text-zinc-900 font-medium">{b.member}</p>
                  <p className="text-[11px] text-emerald-600 font-mono font-medium">{fmtDollars(b.bonus)}</p>
                </div>
                <p className="text-[11px] text-zinc-400 mb-2">{b.target}</p>
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5]"
                    style={{ width: `${b.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline preview */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Pipeline</p>
          <Link href="/dashboard/pipeline" className="text-[11px] text-[#7B6EF6] font-medium flex items-center gap-1 hover:underline">
            Open pipeline <IconArrowRight size={11} />
          </Link>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-2">
              <div className={`px-3 py-1.5 rounded-lg text-[12px] font-medium ${
                stage.count > 0
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-400"
              }`}>
                {stage.label} <span className="font-mono ml-1">{stage.count}</span>
              </div>
              {i < PIPELINE_STAGES.length - 1 && (
                <IconArrowRight size={12} className="text-zinc-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
