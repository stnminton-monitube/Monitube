"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconCurrencyDollar,
  IconTrendingUp,
  IconEye,
  IconVideo,
  IconInfoCircle,
  IconChartBar,
  IconArrowRight,
  IconAlertTriangle,
  IconUsers,
  IconCalendarStats,
  IconPlus,
  IconX,
} from "@tabler/icons-react";

/* ═══════════════════════════════════════════════════════════════
   TAB: EARNINGS — data & helpers
   ═══════════════════════════════════════════════════════════════ */

const MONTHLY_DATA = [
  { month: "Jun 2026", views: 1_212_000, revenue: 4_850, videos: 4, rpm: 4.0 },
  { month: "May 2026", views: 1_080_000, revenue: 4_320, videos: 4, rpm: 4.0 },
  { month: "Apr 2026", views: 987_000, revenue: 3_948, videos: 3, rpm: 4.0 },
  { month: "Mar 2026", views: 1_140_000, revenue: 4_560, videos: 5, rpm: 4.0 },
  { month: "Feb 2026", views: 890_000, revenue: 3_560, videos: 3, rpm: 4.0 },
  { month: "Jan 2026", views: 765_000, revenue: 3_060, videos: 3, rpm: 4.0 },
];

/* ═══════════════════════════════════════════════════════════════
   TAB: SPENDING — data
   ═══════════════════════════════════════════════════════════════ */

const CHANNEL_REVENUE = 4_850;
const LAST_MONTH_TEAM_COST = 2_638;

interface SpendingMember {
  name: string;
  role: string;
  payModel: string;
  monthlyCost: number;
}

const SPENDING_MEMBERS: SpendingMember[] = [
  { name: "Jake Morrison", role: "Editor", payModel: "Per Video", monthlyCost: 1_600 },
  { name: "Sofia Chen", role: "Thumbnail Designer", payModel: "Monthly Retainer", monthlyCost: 750 },
  { name: "Marcus Williams", role: "Scriptwriter", payModel: "Per Video", monthlyCost: 525 },
  { name: "Priya Sharma", role: "Editor", payModel: "Per Video", monthlyCost: 380 },
  { name: "Tyler Brooks", role: "Asst. Editor", payModel: "Per Video", monthlyCost: 175 },
];

const SPENDING_ROLE_COLORS: Record<string, string> = {
  Editor: "bg-purple-100 text-purple-700",
  "Thumbnail Designer": "bg-pink-100 text-pink-700",
  Scriptwriter: "bg-blue-100 text-blue-700",
  "Asst. Editor": "bg-orange-100 text-orange-700",
};

/* ═══════════════════════════════════════════════════════════════
   TAB: PAYMENTS — data
   ═══════════════════════════════════════════════════════════════ */

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

const PAY_ROLE_COLORS: Record<string, string> = {
  editor: "bg-purple-100 text-purple-700",
  writer: "bg-blue-100 text-blue-700",
  thumbnail_designer: "bg-pink-100 text-pink-700",
  assistant_editor: "bg-orange-100 text-orange-700",
};

const PAY_ROLE_LABELS: Record<string, string> = {
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

const DEMO_PAYMENTS: Payment[] = [
  { id: "p01", date: "2026-06-18", member: "Jake Morrison", role: "editor", amount: 475, type: "per_video", video: "Why Every Beginner Quits After 30 Days", note: "Complex edit — lots of b-roll" },
  { id: "p02", date: "2026-06-15", member: "Sofia Chen", role: "thumbnail_designer", amount: 65, type: "per_video", video: "Why Every Beginner Quits After 30 Days", note: "A/B tested 3 variants" },
  { id: "p03", date: "2026-06-12", member: "Marcus Williams", role: "writer", amount: 275, type: "per_video", video: "I Tried Every Editing App So You Don't Have To", note: "Script + research" },
  { id: "p04", date: "2026-06-10", member: "Priya Sharma", role: "editor", amount: 380, type: "per_video", video: "I Tried Every Editing App So You Don't Have To", note: "" },
  { id: "p05", date: "2026-06-08", member: "Tyler Brooks", role: "assistant_editor", amount: 175, type: "per_video", video: "I Tried Every Editing App So You Don't Have To", note: "Color grading & SFX pass" },
  { id: "p06", date: "2026-06-01", member: "Sofia Chen", role: "thumbnail_designer", amount: 750, type: "monthly", video: null, note: "June retainer — 10 thumbnails" },
  { id: "p07", date: "2026-05-28", member: "Jake Morrison", role: "editor", amount: 500, type: "per_video", video: "The Algorithm Changed Again — Here's What Works", note: "Rush delivery, 48hr turnaround" },
  { id: "p08", date: "2026-05-22", member: "Marcus Williams", role: "writer", amount: 250, type: "per_video", video: "The Algorithm Changed Again — Here's What Works", note: "" },
  { id: "p09", date: "2026-05-15", member: "Priya Sharma", role: "editor", amount: 400, type: "per_video", video: "5 Camera Tricks That Look Expensive (But Aren't)", note: "" },
  { id: "p10", date: "2026-05-10", member: "Tyler Brooks", role: "assistant_editor", amount: 150, type: "per_video", video: "5 Camera Tricks That Look Expensive (But Aren't)", note: "Audio cleanup" },
  { id: "p11", date: "2026-05-01", member: "Jake Morrison", role: "editor", amount: 350, type: "bonus", video: null, note: "Q1 performance bonus — 3 videos hit 500K+" },
  { id: "p12", date: "2026-04-25", member: "Jake Morrison", role: "editor", amount: 425, type: "per_video", video: "How I Built a Studio for Under $500", note: "" },
  { id: "p13", date: "2026-04-20", member: "Sofia Chen", role: "thumbnail_designer", amount: 70, type: "per_video", video: "How I Built a Studio for Under $500", note: "Photoshoot + composite" },
  { id: "p14", date: "2026-04-12", member: "Marcus Williams", role: "writer", amount: 300, type: "per_video", video: "Why Your Videos Don't Get Views (Honest Truth)", note: "Long-form research piece" },
  { id: "p15", date: "2026-04-05", member: "Priya Sharma", role: "editor", amount: 375, type: "per_video", video: "Why Your Videos Don't Get Views (Honest Truth)", note: "" },
];

/* ═══════════════════════════════════════════════════════════════
   Shared helpers
   ═══════════════════════════════════════════════════════════════ */

function fmtDollars(n: number): string {
  return "$" + n.toLocaleString();
}

function fmtViews(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ═══════════════════════════════════════════════════════════════
   Tabs config
   ═══════════════════════════════════════════════════════════════ */

type Tab = "earnings" | "spending" | "payments";

const TABS: { key: Tab; label: string }[] = [
  { key: "earnings", label: "Earnings" },
  { key: "spending", label: "Spending" },
  { key: "payments", label: "Payments" },
];

/* ═══════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════ */

export default function MoneyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("earnings");
  const [rpm, setRpm] = useState(4.0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
            Money
          </h1>
          <p className="text-[13px] text-zinc-500 mt-1">
            Revenue, costs, and payment history.
          </p>
        </div>
        {activeTab === "payments" && (
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-1.5"
          >
            <IconPlus size={15} />
            Log Payment
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-colors ${
              activeTab === tab.key
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "earnings" && <EarningsTab rpm={rpm} setRpm={setRpm} />}
      {activeTab === "spending" && <SpendingTab />}
      {activeTab === "payments" && (
        <PaymentsTab
          showModal={showPaymentModal}
          setShowModal={setShowPaymentModal}
        />
      )}
    </div>
  );
}

/* ─── EARNINGS TAB ─────────────────────────────────────────── */

function EarningsTab({
  rpm,
  setRpm,
}: {
  rpm: number;
  setRpm: (v: number) => void;
}) {
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
    <>
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

        <div className="grid grid-cols-[1fr_100px_120px_100px_80px] gap-3 px-6 py-3 border-b border-zinc-100 bg-zinc-50/50">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Month</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">Views</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">Est. Revenue</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-center">Videos</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">RPM</p>
        </div>

        {data.map((m, i) => (
          <div
            key={m.month}
            className={`grid grid-cols-[1fr_100px_120px_100px_80px] gap-3 px-6 py-3.5 items-center ${
              i % 2 === 1 ? "bg-zinc-50/40" : ""
            } ${i < data.length - 1 ? "border-b border-zinc-50" : ""}`}
          >
            <p className="text-[13px] text-zinc-900 font-medium">{m.month}</p>
            <p className="text-[13px] text-zinc-700 font-mono text-right">{fmtViews(m.views)}</p>
            <p className="text-[13px] text-emerald-700 font-medium font-mono text-right">{fmtDollars(m.revenue)}</p>
            <div className="flex items-center justify-center gap-1">
              <IconVideo size={13} className="text-zinc-400" />
              <p className="text-[13px] text-zinc-700 font-mono">{m.videos}</p>
            </div>
            <p className="text-[13px] text-zinc-500 font-mono text-right">${m.rpm.toFixed(2)}</p>
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
            <IconInfoCircle size={14} className="text-zinc-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              We estimate your revenue using this RPM. Update it anytime for
              more accurate numbers. Most YouTube channels fall between $2 and
              $8 RPM depending on their niche.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── SPENDING TAB ─────────────────────────────────────────── */

function SpendingTab() {
  const totalTeamCost = SPENDING_MEMBERS.reduce((s, m) => s + m.monthlyCost, 0);
  const spendPct = (totalTeamCost / CHANNEL_REVENUE) * 100;
  const costChangePct =
    LAST_MONTH_TEAM_COST > 0
      ? ((totalTeamCost - LAST_MONTH_TEAM_COST) / LAST_MONTH_TEAM_COST) * 100
      : 0;

  const highestCostMember = SPENDING_MEMBERS[0];
  const highestPctOfBudget = (
    (highestCostMember.monthlyCost / totalTeamCost) *
    100
  ).toFixed(0);

  let healthColor = "bg-emerald-500";
  let healthTextColor = "text-emerald-700";
  let healthBg = "bg-emerald-50";
  let healthLabel = "Healthy";
  if (spendPct > 70) {
    healthColor = "bg-red-500";
    healthTextColor = "text-red-700";
    healthBg = "bg-red-50";
    healthLabel = "High";
  } else if (spendPct > 40) {
    healthColor = "bg-amber-500";
    healthTextColor = "text-amber-700";
    healthBg = "bg-amber-50";
    healthLabel = "Moderate";
  }

  return (
    <>
      {/* Health card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-8">
        <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-5">
          Revenue vs. Team Cost
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mb-5">
          <div className="text-center sm:text-left">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-1">Team Cost</p>
            <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
              {fmtDollars(totalTeamCost)}
              <span className="text-[13px] text-zinc-400 font-normal">/mo</span>
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full h-4 bg-zinc-100 rounded-full overflow-hidden relative">
              <div
                className={`h-full rounded-full ${healthColor} transition-all`}
                style={{ width: `${Math.min(spendPct, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-400 mt-1.5 font-mono">
              {spendPct.toFixed(0)}% of revenue
            </p>
          </div>

          <div className="text-center sm:text-right">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-1">Channel Revenue</p>
            <p className="font-heading text-2xl font-medium tracking-tight text-emerald-700 font-mono">
              {fmtDollars(CHANNEL_REVENUE)}
              <span className="text-[13px] text-zinc-400 font-normal">/mo</span>
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${healthBg}`}>
          <div className={`w-2.5 h-2.5 rounded-full ${healthColor}`} />
          <p className={`text-[13px] font-medium ${healthTextColor}`}>{healthLabel}</p>
          <p className="text-[12px] text-zinc-600">
            &mdash; You&apos;re spending {spendPct.toFixed(0)}% of revenue on your team
          </p>
        </div>
      </div>

      {/* Per-member breakdown table */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-zinc-100">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Per-Member Breakdown</p>
        </div>

        <div className="grid grid-cols-[1fr_110px_100px_110px_100px_100px] gap-3 px-6 py-3 border-b border-zinc-100 bg-zinc-50/50">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Member</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Role</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Pay Model</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">Monthly Cost</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">% of Spend</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">% of Revenue</p>
        </div>

        {SPENDING_MEMBERS.map((m, i) => {
          const pctOfSpend = (m.monthlyCost / totalTeamCost) * 100;
          const pctOfRevenue = (m.monthlyCost / CHANNEL_REVENUE) * 100;

          return (
            <div
              key={m.name}
              className={`grid grid-cols-[1fr_110px_100px_110px_100px_100px] gap-3 px-6 py-3.5 items-center ${
                i % 2 === 1 ? "bg-zinc-50/40" : ""
              } ${i < SPENDING_MEMBERS.length - 1 ? "border-b border-zinc-50" : ""}`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[10px] font-semibold font-heading shrink-0">
                  {m.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <p className="text-[13px] text-zinc-900 font-medium truncate">{m.name}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${SPENDING_ROLE_COLORS[m.role] ?? "bg-zinc-100 text-zinc-600"}`}>
                {m.role}
              </span>
              <p className="text-[12px] text-zinc-500">{m.payModel}</p>
              <p className="text-[13px] text-emerald-700 font-medium font-mono text-right">{fmtDollars(m.monthlyCost)}</p>
              <p className="text-[13px] text-zinc-700 font-mono text-right">{pctOfSpend.toFixed(1)}%</p>
              <p className="text-[13px] text-zinc-700 font-mono text-right">{pctOfRevenue.toFixed(1)}%</p>
            </div>
          );
        })}
      </div>

      {/* Cost insights */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6">
        <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-4">Cost Insights</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
            <IconTrendingUp size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[13px] text-zinc-700 leading-relaxed">
              Your team costs increased{" "}
              <span className="font-medium font-mono">{costChangePct.toFixed(0)}%</span>{" "}
              from last month.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
            <IconAlertTriangle size={16} className="text-[#7B6EF6] shrink-0 mt-0.5" />
            <p className="text-[13px] text-zinc-700 leading-relaxed">
              <span className="font-medium">{highestCostMember.name}</span> is
              your highest cost at{" "}
              <span className="font-medium font-mono">{fmtDollars(highestCostMember.monthlyCost)}/mo</span>{" "}
              ({highestPctOfBudget}% of team budget).
            </p>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
            <IconChartBar size={16} className="text-emerald-500 shrink-0 mt-0.5" />
            <Link href="/dashboard/calculator" className="text-[13px] text-zinc-700 leading-relaxed group">
              Consider the{" "}
              <span className="text-[#7B6EF6] font-medium group-hover:underline">Pay Calculator</span>{" "}
              to benchmark your rates against industry averages.
              <IconArrowRight size={12} className="inline ml-1 text-[#7B6EF6]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── PAYMENTS TAB ─────────────────────────────────────────── */

function PaymentsTab({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
}) {
  const currentMonth = "2026-06";
  const thisMonthPayments = DEMO_PAYMENTS.filter((p) =>
    p.date.startsWith(currentMonth)
  );
  const totalThisMonth = thisMonthPayments.reduce((s, p) => s + p.amount, 0);
  const totalAllTime = DEMO_PAYMENTS.reduce((s, p) => s + p.amount, 0);
  const uniqueMembers = new Set(DEMO_PAYMENTS.map((p) => p.member)).size;

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
    <>
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <IconCurrencyDollar size={16} className="text-emerald-600" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Paid This Month</p>
          </div>
          <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
            {fmtDollars(totalThisMonth)}
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">{thisMonthPayments.length} payments in June</p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <IconCalendarStats size={16} className="text-[#7B6EF6]" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Paid All Time</p>
          </div>
          <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
            {fmtDollars(totalAllTime)}
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">{DEMO_PAYMENTS.length} total payments tracked</p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <IconUsers size={16} className="text-blue-600" />
            </div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Team on Payroll</p>
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
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Payment Log</p>
        </div>

        <div className="grid grid-cols-[100px_1fr_90px_90px_1fr_1fr] gap-3 px-6 py-3 border-b border-zinc-100 bg-zinc-50/50">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Date</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Team Member</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">Amount</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Type</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Video</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Note</p>
        </div>

        {DEMO_PAYMENTS.map((p, i) => (
          <div
            key={p.id}
            className={`grid grid-cols-[100px_1fr_90px_90px_1fr_1fr] gap-3 px-6 py-3.5 items-center ${
              i % 2 === 1 ? "bg-zinc-50/40" : ""
            } ${i < DEMO_PAYMENTS.length - 1 ? "border-b border-zinc-50" : ""}`}
          >
            <p className="text-[12px] text-zinc-500 font-mono">{fmtDate(p.date)}</p>
            <div className="flex items-center gap-2 min-w-0">
              <p className="text-[13px] text-zinc-900 font-medium truncate">{p.member}</p>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${PAY_ROLE_COLORS[p.role] ?? "bg-zinc-100 text-zinc-600"}`}>
                {PAY_ROLE_LABELS[p.role] ?? p.role}
              </span>
            </div>
            <p className="text-[13px] text-emerald-700 font-medium font-mono text-right">{fmtDollars(p.amount)}</p>
            <p className="text-[12px] text-zinc-500">{TYPE_LABELS[p.type]}</p>
            <p className="text-[12px] text-zinc-500 truncate">{p.video ?? "—"}</p>
            <p className="text-[12px] text-zinc-400 truncate">{p.note || "—"}</p>
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
          <div key={m.name} className="bg-white rounded-2xl border border-zinc-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[12px] font-semibold font-heading">
                  {m.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-zinc-900">{m.name}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${PAY_ROLE_COLORS[m.role] ?? "bg-zinc-100 text-zinc-600"}`}>
                    {PAY_ROLE_LABELS[m.role] ?? m.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-3.5 mb-3">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Total Paid</p>
                  <p className="font-heading text-xl font-medium tracking-tight text-zinc-900 font-mono">{fmtDollars(m.total)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Payments</p>
                  <p className="text-[16px] font-medium text-zinc-700 font-mono">{m.count}</p>
                </div>
              </div>
            </div>

            {m.avgPerVideo !== null && (
              <p className="text-[12px] text-zinc-500 mb-3">
                Avg per video:{" "}
                <span className="font-medium text-zinc-900 font-mono">{fmtDollars(m.avgPerVideo)}</span>
              </p>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] text-zinc-400">Share of total spend</p>
                <p className="text-[10px] text-zinc-500 font-mono font-medium">{(m.share * 100).toFixed(1)}%</p>
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
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl border border-zinc-200 p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-lg font-medium text-zinc-900">Log Payment</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-zinc-100 cursor-pointer transition-colors">
                <IconX size={16} className="text-zinc-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">Team Member</label>
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
                  <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">Amount ($)</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40" />
                </div>
                <div>
                  <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">Type</label>
                  <select className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40 bg-white">
                    <option>Per Video</option>
                    <option>Monthly</option>
                    <option>Bonus</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">Video (optional)</label>
                <input type="text" placeholder="Which video was this for?" className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40" />
              </div>
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">Note (optional)</label>
                <input type="text" placeholder="Any context for this payment" className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40" />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-600 font-medium cursor-pointer hover:bg-zinc-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all">
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
