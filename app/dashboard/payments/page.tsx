"use client";

import { useState } from "react";
import {
  IconCurrencyDollar,
  IconUsers,
  IconCalendarStats,
  IconPlus,
  IconX,
} from "@tabler/icons-react";

/* ─── Types ─────────────────────────────────────────────────── */

type PaymentType = "per_video" | "monthly" | "bonus";

interface Payment {
  id: string;
  date: string;
  member: string;
  role: "editor" | "writer" | "thumbnail_designer" | "assistant_editor";
  amount: number;
  type: PaymentType;
  video: string | null;
  note: string;
}

/* ─── Role config ───────────────────────────────────────────── */

const ROLE_COLORS: Record<string, string> = {
  editor: "bg-purple-100 text-purple-700",
  writer: "bg-blue-100 text-blue-700",
  thumbnail_designer: "bg-pink-100 text-pink-700",
  assistant_editor: "bg-orange-100 text-orange-700",
};

const ROLE_LABELS: Record<string, string> = {
  editor: "Editor",
  writer: "Writer",
  thumbnail_designer: "Thumbnail Designer",
  assistant_editor: "Asst. Editor",
};

const TYPE_LABELS: Record<PaymentType, string> = {
  per_video: "Per Video",
  monthly: "Monthly",
  bonus: "Bonus",
};

/* ─── Demo data ─────────────────────────────────────────────── */

const DEMO_PAYMENTS: Payment[] = [
  // June 2026
  { id: "p01", date: "2026-06-18", member: "Jake Morrison", role: "editor", amount: 475, type: "per_video", video: "Why Every Beginner Quits After 30 Days", note: "Complex edit — lots of b-roll" },
  { id: "p02", date: "2026-06-15", member: "Sofia Chen", role: "thumbnail_designer", amount: 65, type: "per_video", video: "Why Every Beginner Quits After 30 Days", note: "A/B tested 3 variants" },
  { id: "p03", date: "2026-06-12", member: "Marcus Williams", role: "writer", amount: 275, type: "per_video", video: "I Tried Every Editing App So You Don't Have To", note: "Script + research" },
  { id: "p04", date: "2026-06-10", member: "Priya Sharma", role: "editor", amount: 380, type: "per_video", video: "I Tried Every Editing App So You Don't Have To", note: "" },
  { id: "p05", date: "2026-06-08", member: "Tyler Brooks", role: "assistant_editor", amount: 175, type: "per_video", video: "I Tried Every Editing App So You Don't Have To", note: "Color grading & SFX pass" },
  { id: "p06", date: "2026-06-01", member: "Sofia Chen", role: "thumbnail_designer", amount: 750, type: "monthly", video: null, note: "June retainer — 10 thumbnails" },
  // May 2026
  { id: "p07", date: "2026-05-28", member: "Jake Morrison", role: "editor", amount: 500, type: "per_video", video: "The Algorithm Changed Again — Here's What Works", note: "Rush delivery, 48hr turnaround" },
  { id: "p08", date: "2026-05-22", member: "Marcus Williams", role: "writer", amount: 250, type: "per_video", video: "The Algorithm Changed Again — Here's What Works", note: "" },
  { id: "p09", date: "2026-05-15", member: "Priya Sharma", role: "editor", amount: 400, type: "per_video", video: "5 Camera Tricks That Look Expensive (But Aren't)", note: "" },
  { id: "p10", date: "2026-05-10", member: "Tyler Brooks", role: "assistant_editor", amount: 150, type: "per_video", video: "5 Camera Tricks That Look Expensive (But Aren't)", note: "Audio cleanup" },
  { id: "p11", date: "2026-05-01", member: "Jake Morrison", role: "editor", amount: 350, type: "bonus", video: null, note: "Q1 performance bonus — 3 videos hit 500K+" },
  // April 2026
  { id: "p12", date: "2026-04-25", member: "Jake Morrison", role: "editor", amount: 425, type: "per_video", video: "How I Built a Studio for Under $500", note: "" },
  { id: "p13", date: "2026-04-20", member: "Sofia Chen", role: "thumbnail_designer", amount: 70, type: "per_video", video: "How I Built a Studio for Under $500", note: "Photoshoot + composite" },
  { id: "p14", date: "2026-04-12", member: "Marcus Williams", role: "writer", amount: 300, type: "per_video", video: "Why Your Videos Don't Get Views (Honest Truth)", note: "Long-form research piece" },
  { id: "p15", date: "2026-04-05", member: "Priya Sharma", role: "editor", amount: 375, type: "per_video", video: "Why Your Videos Don't Get Views (Honest Truth)", note: "" },
];

/* ─── Helpers ───────────────────────────────────────────────── */

function fmtDollars(n: number): string {
  return "$" + n.toLocaleString();
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ─── Component ─────────────────────────────────────────────── */

export default function PaymentsPage() {
  const [showModal, setShowModal] = useState(false);

  // Current month (June 2026)
  const currentMonth = "2026-06";
  const thisMonthPayments = DEMO_PAYMENTS.filter((p) =>
    p.date.startsWith(currentMonth)
  );
  const totalThisMonth = thisMonthPayments.reduce((s, p) => s + p.amount, 0);
  const totalAllTime = DEMO_PAYMENTS.reduce((s, p) => s + p.amount, 0);
  const uniqueMembers = new Set(DEMO_PAYMENTS.map((p) => p.member)).size;

  // Per-member breakdown
  const memberMap = new Map<
    string,
    { role: string; total: number; count: number; perVideoAmounts: number[] }
  >();
  for (const p of DEMO_PAYMENTS) {
    const existing = memberMap.get(p.member);
    if (existing) {
      existing.total += p.amount;
      existing.count += 1;
      if (p.type === "per_video") existing.perVideoAmounts.push(p.amount);
    } else {
      memberMap.set(p.member, {
        role: p.role,
        total: p.amount,
        count: 1,
        perVideoAmounts: p.type === "per_video" ? [p.amount] : [],
      });
    }
  }
  const memberBreakdown = Array.from(memberMap.entries())
    .map(([name, data]) => ({
      name,
      role: data.role,
      total: data.total,
      count: data.count,
      avgPerVideo:
        data.perVideoAmounts.length > 0
          ? Math.round(
              data.perVideoAmounts.reduce((a, b) => a + b, 0) /
                data.perVideoAmounts.length
            )
          : null,
      share: data.total / totalAllTime,
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
            Payments
          </h1>
          <p className="text-[13px] text-zinc-500 mt-1">
            Track what you pay your team — per video, monthly, and bonuses.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-1.5"
        >
          <IconPlus size={15} />
          Log Payment
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <IconCurrencyDollar size={16} className="text-emerald-600" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
              Paid This Month
            </p>
          </div>
          <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
            {fmtDollars(totalThisMonth)}
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">
            {thisMonthPayments.length} payments in June
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <IconCalendarStats size={16} className="text-[#7B6EF6]" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
              Paid All Time
            </p>
          </div>
          <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
            {fmtDollars(totalAllTime)}
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">
            {DEMO_PAYMENTS.length} total payments tracked
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <IconUsers size={16} className="text-blue-600" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
              Team on Payroll
            </p>
          </div>
          <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
            {uniqueMembers}
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">Active team members</p>
        </div>
      </div>

      {/* Payment log table */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-zinc-100">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
            Payment Log
          </p>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[100px_1fr_90px_90px_1fr_1fr] gap-3 px-6 py-3 border-b border-zinc-100 bg-zinc-50/50">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Date
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Team Member
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">
            Amount
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Type
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Video
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Note
          </p>
        </div>

        {/* Table rows */}
        {DEMO_PAYMENTS.map((p, i) => (
          <div
            key={p.id}
            className={`grid grid-cols-[100px_1fr_90px_90px_1fr_1fr] gap-3 px-6 py-3.5 items-center ${
              i % 2 === 1 ? "bg-zinc-50/40" : ""
            } ${i < DEMO_PAYMENTS.length - 1 ? "border-b border-zinc-50" : ""}`}
          >
            <p className="text-[12px] text-zinc-500 font-mono">
              {fmtDate(p.date)}
            </p>
            <div className="flex items-center gap-2 min-w-0">
              <p className="text-[13px] text-zinc-900 font-medium truncate">
                {p.member}
              </p>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                  ROLE_COLORS[p.role] ?? "bg-zinc-100 text-zinc-600"
                }`}
              >
                {ROLE_LABELS[p.role] ?? p.role}
              </span>
            </div>
            <p className="text-[13px] text-emerald-700 font-medium font-mono text-right">
              {fmtDollars(p.amount)}
            </p>
            <p className="text-[12px] text-zinc-500">{TYPE_LABELS[p.type]}</p>
            <p className="text-[12px] text-zinc-500 truncate">
              {p.video ?? "—"}
            </p>
            <p className="text-[12px] text-zinc-400 truncate">
              {p.note || "—"}
            </p>
          </div>
        ))}
      </div>

      {/* Per-member spending breakdown */}
      <div className="mb-2">
        <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-4">
          Spending by Team Member
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memberBreakdown.map((m) => (
          <div
            key={m.name}
            className="bg-white rounded-2xl border border-zinc-200 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[12px] font-semibold font-heading">
                  {m.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-zinc-900">
                    {m.name}
                  </p>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      ROLE_COLORS[m.role] ?? "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {ROLE_LABELS[m.role] ?? m.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-3.5 mb-3">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                    Total Paid
                  </p>
                  <p className="font-heading text-xl font-medium tracking-tight text-zinc-900 font-mono">
                    {fmtDollars(m.total)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                    Payments
                  </p>
                  <p className="text-[16px] font-medium text-zinc-700 font-mono">
                    {m.count}
                  </p>
                </div>
              </div>
            </div>

            {m.avgPerVideo !== null && (
              <p className="text-[12px] text-zinc-500 mb-3">
                Avg per video:{" "}
                <span className="font-medium text-zinc-900 font-mono">
                  {fmtDollars(m.avgPerVideo)}
                </span>
              </p>
            )}

            {/* Share of total spending bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] text-zinc-400">Share of total spend</p>
                <p className="text-[10px] text-zinc-500 font-mono font-medium">
                  {(m.share * 100).toFixed(1)}%
                </p>
              </div>
              <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] transition-all"
                  style={{ width: `${m.share * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Log Payment modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl border border-zinc-200 p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-lg font-medium text-zinc-900">
                Log Payment
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-100 cursor-pointer transition-colors"
              >
                <IconX size={16} className="text-zinc-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                  Team Member
                </label>
                <select className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40 bg-white">
                  <option>Jake Morrison</option>
                  <option>Sofia Chen</option>
                  <option>Marcus Williams</option>
                  <option>Priya Sharma</option>
                  <option>Tyler Brooks</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                  />
                </div>
                <div>
                  <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                    Type
                  </label>
                  <select className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40 bg-white">
                    <option>Per Video</option>
                    <option>Monthly</option>
                    <option>Bonus</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                  Video (optional)
                </label>
                <input
                  type="text"
                  placeholder="Which video was this for?"
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                />
              </div>
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                  Note (optional)
                </label>
                <input
                  type="text"
                  placeholder="Any context for this payment"
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-600 font-medium cursor-pointer hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
