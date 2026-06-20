"use client";

import { useState } from "react";
import {
  IconTargetArrow,
  IconPlus,
  IconX,
  IconCheck,
  IconClock,
  IconTrophy,
  IconInfoCircle,
} from "@tabler/icons-react";

/* ─── Types ─────────────────────────────────────────────────── */

interface ActiveTarget {
  member: string;
  initials: string;
  description: string;
  bonusAmount: number;
  progressCurrent: number;
  progressTotal: number;
  metric: string;
  metricValue: string | null;
  onTrack: boolean;
}

interface AchievedBonus {
  date: string;
  member: string;
  target: string;
  amount: number;
  status: "Paid" | "Pending";
}

/* ─── Demo data ─────────────────────────────────────────────── */

const ACTIVE_TARGETS: ActiveTarget[] = [
  {
    member: "Jake Morrison",
    initials: "JM",
    description: "Avg 80K+ views across next 5 videos",
    bonusAmount: 200,
    progressCurrent: 3,
    progressTotal: 5,
    metric: "Current avg",
    metricValue: "92K views",
    onTrack: true,
  },
  {
    member: "Sofia Chen",
    initials: "SC",
    description: "Complete 10 thumbnails this month",
    bonusAmount: 100,
    progressCurrent: 7,
    progressTotal: 10,
    metric: "Completed",
    metricValue: null,
    onTrack: true,
  },
  {
    member: "Marcus Williams",
    initials: "MW",
    description: "Deliver scripts within 48 hours for next 4 videos",
    bonusAmount: 150,
    progressCurrent: 2,
    progressTotal: 4,
    metric: "On time",
    metricValue: null,
    onTrack: true,
  },
];

const ACHIEVED_BONUSES: AchievedBonus[] = [
  {
    date: "2026-05-28",
    member: "Jake Morrison",
    target: "3 videos over 500K views in Q1",
    amount: 350,
    status: "Paid",
  },
  {
    date: "2026-05-15",
    member: "Sofia Chen",
    target: "Complete 12 thumbnails in May",
    amount: 100,
    status: "Paid",
  },
  {
    date: "2026-04-30",
    member: "Marcus Williams",
    target: "All scripts delivered within 48 hours for April",
    amount: 150,
    status: "Paid",
  },
  {
    date: "2026-04-12",
    member: "Priya Sharma",
    target: "First 3 edits under 72hr turnaround",
    amount: 200,
    status: "Pending",
  },
  {
    date: "2026-03-20",
    member: "Tyler Brooks",
    target: "Color grade 8 videos in March",
    amount: 75,
    status: "Paid",
  },
];

const TEAM_OPTIONS = [
  "Jake Morrison",
  "Sofia Chen",
  "Marcus Williams",
  "Priya Sharma",
  "Tyler Brooks",
];

const TRACK_OPTIONS = [
  "Views per video",
  "Videos completed",
  "Deadline accuracy",
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

export default function BonusesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
            Bonuses
          </h1>
          <p className="text-[13px] text-zinc-500 mt-1">
            Set targets for your team. When they hit them, you decide what to
            pay.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[#7B6EF6]/10 text-[#7B6EF6] text-[11px] font-medium">
            Pro feature
          </span>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-1.5"
          >
            <IconPlus size={15} />
            Set New Target
          </button>
        </div>
      </div>

      {/* New target form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-medium text-zinc-900">
              New Bonus Target
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="p-1.5 rounded-lg hover:bg-zinc-100 cursor-pointer transition-colors"
            >
              <IconX size={16} className="text-zinc-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                Team Member
              </label>
              <select className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40 bg-white">
                {TEAM_OPTIONS.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                What to Track
              </label>
              <select className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40 bg-white">
                {TRACK_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                Threshold
              </label>
              <input
                type="text"
                placeholder="e.g., If avg views exceed 100,000 across next 5 videos"
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
              />
            </div>
            <div>
              <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">
                Bonus Amount ($)
              </label>
              <input
                type="number"
                placeholder="200"
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-600 font-medium cursor-pointer hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Create Target
            </button>
          </div>
        </div>
      )}

      {/* Active targets */}
      <div className="mb-2">
        <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-4">
          Active Targets
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {ACTIVE_TARGETS.map((t) => {
          const progressPct = (t.progressCurrent / t.progressTotal) * 100;

          return (
            <div
              key={t.member}
              className="bg-white rounded-2xl border border-zinc-200 p-5"
            >
              {/* Member header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[12px] font-semibold font-heading shrink-0">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-zinc-900">
                    {t.member}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium font-mono">
                    {fmtDollars(t.bonusAmount)} bonus
                  </p>
                </div>
              </div>

              {/* Target description */}
              <p className="text-[13px] text-zinc-700 leading-relaxed mb-4">
                {t.description}
              </p>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[11px] text-zinc-400">Progress</p>
                  <p className="text-[11px] text-zinc-600 font-mono font-medium">
                    {t.progressCurrent}/{t.progressTotal}
                  </p>
                </div>
                <div className="h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                {t.metricValue && (
                  <p className="text-[11px] text-zinc-500">
                    {t.metric}:{" "}
                    <span className="font-medium text-zinc-700 font-mono">
                      {t.metricValue}
                    </span>
                  </p>
                )}
                {!t.metricValue && (
                  <p className="text-[11px] text-zinc-500">
                    {t.metric}:{" "}
                    <span className="font-medium text-zinc-700 font-mono">
                      {t.progressCurrent}/{t.progressTotal}
                    </span>
                  </p>
                )}
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    t.onTrack
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {t.onTrack ? (
                    <IconCheck size={10} />
                  ) : (
                    <IconClock size={10} />
                  )}
                  {t.onTrack ? "On track" : "Behind"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achieved bonuses */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center gap-2">
          <IconTrophy size={15} className="text-amber-500" />
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
            Achieved Bonuses
          </p>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[100px_1fr_1fr_90px_80px] gap-3 px-6 py-3 border-b border-zinc-100 bg-zinc-50/50">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Date
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Member
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Target
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">
            Amount
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-center">
            Status
          </p>
        </div>

        {/* Table rows */}
        {ACHIEVED_BONUSES.map((b, i) => (
          <div
            key={`${b.member}-${b.date}`}
            className={`grid grid-cols-[100px_1fr_1fr_90px_80px] gap-3 px-6 py-3.5 items-center ${
              i % 2 === 1 ? "bg-zinc-50/40" : ""
            } ${i < ACHIEVED_BONUSES.length - 1 ? "border-b border-zinc-50" : ""}`}
          >
            <p className="text-[12px] text-zinc-500 font-mono">
              {fmtDate(b.date)}
            </p>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[9px] font-semibold font-heading shrink-0">
                {b.member
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>
              <p className="text-[13px] text-zinc-900 font-medium truncate">
                {b.member}
              </p>
            </div>
            <p className="text-[12px] text-zinc-500 truncate">{b.target}</p>
            <p className="text-[13px] text-emerald-700 font-medium font-mono text-right">
              {fmtDollars(b.amount)}
            </p>
            <div className="flex justify-center">
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  b.status === "Paid"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {b.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <IconInfoCircle size={16} className="text-[#7B6EF6]" />
          <h2 className="font-heading text-lg font-medium text-zinc-900">
            How it works
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            {
              step: "1",
              label: "You set the target",
              desc: "Define what metric to track and the threshold to hit.",
            },
            {
              step: "2",
              label: "Monitube tracks progress",
              desc: "We monitor the metric and update the progress bar automatically.",
            },
            {
              step: "3",
              label: "You get notified",
              desc: "When the target is hit, you receive an alert with the details.",
            },
            {
              step: "4",
              label: "You decide whether to pay",
              desc: "Review the result and mark the bonus as paid when ready.",
            },
          ].map((s) => (
            <div key={s.step} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-[#7B6EF6]/10 flex items-center justify-center text-[#7B6EF6] text-[12px] font-semibold shrink-0">
                {s.step}
              </div>
              <div>
                <p className="text-[13px] font-medium text-zinc-900">
                  {s.label}
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
