"use client";

import { useState } from "react";
import {
  IconCurrencyDollar,
  IconTrendingUp,
  IconEye,
  IconVideo,
  IconInfoCircle,
} from "@tabler/icons-react";

/* ─── Demo data ─────────────────────────────────────────────── */

const MONTHLY_DATA = [
  { month: "Jun 2026", views: 1_212_000, revenue: 4_850, videos: 4, rpm: 4.0 },
  { month: "May 2026", views: 1_080_000, revenue: 4_320, videos: 4, rpm: 4.0 },
  { month: "Apr 2026", views: 987_000, revenue: 3_948, videos: 3, rpm: 4.0 },
  { month: "Mar 2026", views: 1_140_000, revenue: 4_560, videos: 5, rpm: 4.0 },
  { month: "Feb 2026", views: 890_000, revenue: 3_560, videos: 3, rpm: 4.0 },
  { month: "Jan 2026", views: 765_000, revenue: 3_060, videos: 3, rpm: 4.0 },
];

/* ─── Helpers ───────────────────────────────────────────────── */

function fmtDollars(n: number): string {
  return "$" + n.toLocaleString();
}

function fmtViews(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

/* ─── Component ─────────────────────────────────────────────── */

export default function EarningsPage() {
  const [rpm, setRpm] = useState(4.0);

  // Recalculate revenue based on user RPM
  const data = MONTHLY_DATA.map((m) => ({
    ...m,
    revenue: Math.round((m.views / 1000) * rpm),
    rpm,
  }));

  const thisMonth = data[0];
  const lastMonth = data[1];
  const allTimeRevenue = data.reduce((sum, m) => sum + m.revenue, 0);
  const pctChange =
    lastMonth.revenue > 0
      ? ((thisMonth.revenue - lastMonth.revenue) / lastMonth.revenue) * 100
      : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
            Channel Earnings
          </h1>
          <p className="text-[13px] text-zinc-500 mt-1">
            Track your YouTube revenue and see how it compares to your team
            costs.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#7B6EF6]/10 text-[#7B6EF6] text-[11px] font-medium">
          Pro feature
        </span>
      </div>

      {/* Revenue summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <IconCurrencyDollar size={16} className="text-emerald-600" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
              This Month
            </p>
          </div>
          <div className="flex items-end gap-2">
            <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
              {fmtDollars(thisMonth.revenue)}
            </p>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full mb-0.5 ${
                pctChange >= 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {pctChange >= 0 ? "+" : ""}
              {pctChange.toFixed(0)}%
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">June 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center">
              <IconTrendingUp size={16} className="text-zinc-500" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
              Last Month
            </p>
          </div>
          <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
            {fmtDollars(lastMonth.revenue)}
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">May 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <IconCurrencyDollar size={16} className="text-[#7B6EF6]" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
              All Time (est.)
            </p>
          </div>
          <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
            {fmtDollars(allTimeRevenue)}
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">
            Based on last 6 months
          </p>
        </div>
      </div>

      {/* Monthly breakdown table */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-zinc-100">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
            Monthly Breakdown
          </p>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[1fr_100px_120px_100px_80px] gap-3 px-6 py-3 border-b border-zinc-100 bg-zinc-50/50">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Month
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">
            Views
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">
            Est. Revenue
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-center">
            Videos
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">
            RPM
          </p>
        </div>

        {/* Table rows */}
        {data.map((m, i) => (
          <div
            key={m.month}
            className={`grid grid-cols-[1fr_100px_120px_100px_80px] gap-3 px-6 py-3.5 items-center ${
              i % 2 === 1 ? "bg-zinc-50/40" : ""
            } ${i < data.length - 1 ? "border-b border-zinc-50" : ""}`}
          >
            <p className="text-[13px] text-zinc-900 font-medium">{m.month}</p>
            <p className="text-[13px] text-zinc-700 font-mono text-right">
              {fmtViews(m.views)}
            </p>
            <p className="text-[13px] text-emerald-700 font-medium font-mono text-right">
              {fmtDollars(m.revenue)}
            </p>
            <div className="flex items-center justify-center gap-1">
              <IconVideo size={13} className="text-zinc-400" />
              <p className="text-[13px] text-zinc-700 font-mono">{m.videos}</p>
            </div>
            <p className="text-[13px] text-zinc-500 font-mono text-right">
              ${m.rpm.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* RPM Settings */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <IconEye size={16} className="text-[#7B6EF6]" />
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
            RPM Settings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
              Your RPM
            </label>
            <input
              type="number"
              value={rpm}
              onChange={(e) =>
                setRpm(Math.max(0.5, parseFloat(e.target.value) || 0.5))
              }
              step="0.5"
              min="0.5"
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[14px] text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
            />
            <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
              RPM = how much you earn per 1,000 views. Find this in YouTube
              Studio &rarr; Analytics &rarr; Revenue.
            </p>
          </div>

          <div className="flex items-start gap-2 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
            <IconInfoCircle
              size={14}
              className="text-zinc-400 shrink-0 mt-0.5"
            />
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              We estimate your revenue using this RPM. Update it anytime for
              more accurate numbers. Most YouTube channels fall between $2 and
              $8 RPM depending on their niche.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
