"use client";

import {
  IconChartBar,
  IconArrowRight,
  IconTrendingUp,
  IconAlertTriangle,
} from "@tabler/icons-react";
import Link from "next/link";

/* ─── Demo data ─────────────────────────────────────────────── */

const CHANNEL_REVENUE = 4_850;
const LAST_MONTH_TEAM_COST = 2_638;

interface TeamMember {
  name: string;
  role: string;
  payModel: string;
  monthlyCost: number;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Jake Morrison",
    role: "Editor",
    payModel: "Per Video",
    monthlyCost: 1_600,
  },
  {
    name: "Sofia Chen",
    role: "Thumbnail Designer",
    payModel: "Monthly Retainer",
    monthlyCost: 750,
  },
  {
    name: "Marcus Williams",
    role: "Scriptwriter",
    payModel: "Per Video",
    monthlyCost: 525,
  },
  {
    name: "Priya Sharma",
    role: "Editor",
    payModel: "Per Video",
    monthlyCost: 380,
  },
  {
    name: "Tyler Brooks",
    role: "Asst. Editor",
    payModel: "Per Video",
    monthlyCost: 175,
  },
];

/* ─── Role colors ──────────────────────────────────────────── */

const ROLE_COLORS: Record<string, string> = {
  Editor: "bg-purple-100 text-purple-700",
  "Thumbnail Designer": "bg-pink-100 text-pink-700",
  Scriptwriter: "bg-blue-100 text-blue-700",
  "Asst. Editor": "bg-orange-100 text-orange-700",
};

/* ─── Helpers ───────────────────────────────────────────────── */

function fmtDollars(n: number): string {
  return "$" + n.toLocaleString();
}

/* ─── Component ─────────────────────────────────────────────── */

export default function SpendingPage() {
  const totalTeamCost = TEAM_MEMBERS.reduce((s, m) => s + m.monthlyCost, 0);
  const spendPct = (totalTeamCost / CHANNEL_REVENUE) * 100;
  const costChangePct =
    LAST_MONTH_TEAM_COST > 0
      ? ((totalTeamCost - LAST_MONTH_TEAM_COST) / LAST_MONTH_TEAM_COST) * 100
      : 0;

  const highestCostMember = TEAM_MEMBERS[0]; // already sorted
  const highestPctOfBudget = (
    (highestCostMember.monthlyCost / totalTeamCost) *
    100
  ).toFixed(0);

  // Health indicator
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
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
            Spending
          </h1>
          <p className="text-[13px] text-zinc-500 mt-1">
            See your team costs against your channel revenue.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#7B6EF6]/10 text-[#7B6EF6] text-[11px] font-medium">
          Pro feature
        </span>
      </div>

      {/* Health card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-8">
        <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-5">
          Revenue vs. Team Cost
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mb-5">
          {/* Team cost */}
          <div className="text-center sm:text-left">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-1">
              Team Cost
            </p>
            <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 font-mono">
              {fmtDollars(totalTeamCost)}
              <span className="text-[13px] text-zinc-400 font-normal">
                /mo
              </span>
            </p>
          </div>

          {/* Visual bar */}
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

          {/* Revenue */}
          <div className="text-center sm:text-right">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-1">
              Channel Revenue
            </p>
            <p className="font-heading text-2xl font-medium tracking-tight text-emerald-700 font-mono">
              {fmtDollars(CHANNEL_REVENUE)}
              <span className="text-[13px] text-zinc-400 font-normal">
                /mo
              </span>
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${healthBg}`}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${healthColor}`} />
          <p className={`text-[13px] font-medium ${healthTextColor}`}>
            {healthLabel}
          </p>
          <p className="text-[12px] text-zinc-600">
            &mdash; You&apos;re spending {spendPct.toFixed(0)}% of revenue on
            your team
          </p>
        </div>
      </div>

      {/* Per-member breakdown table */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-zinc-100">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
            Per-Member Breakdown
          </p>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[1fr_110px_100px_110px_100px_100px] gap-3 px-6 py-3 border-b border-zinc-100 bg-zinc-50/50">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Member
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Role
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            Pay Model
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">
            Monthly Cost
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">
            % of Spend
          </p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium text-right">
            % of Revenue
          </p>
        </div>

        {/* Table rows */}
        {TEAM_MEMBERS.map((m, i) => {
          const pctOfSpend = (m.monthlyCost / totalTeamCost) * 100;
          const pctOfRevenue = (m.monthlyCost / CHANNEL_REVENUE) * 100;

          return (
            <div
              key={m.name}
              className={`grid grid-cols-[1fr_110px_100px_110px_100px_100px] gap-3 px-6 py-3.5 items-center ${
                i % 2 === 1 ? "bg-zinc-50/40" : ""
              } ${i < TEAM_MEMBERS.length - 1 ? "border-b border-zinc-50" : ""}`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[10px] font-semibold font-heading shrink-0">
                  {m.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <p className="text-[13px] text-zinc-900 font-medium truncate">
                  {m.name}
                </p>
              </div>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${
                  ROLE_COLORS[m.role] ?? "bg-zinc-100 text-zinc-600"
                }`}
              >
                {m.role}
              </span>
              <p className="text-[12px] text-zinc-500">{m.payModel}</p>
              <p className="text-[13px] text-emerald-700 font-medium font-mono text-right">
                {fmtDollars(m.monthlyCost)}
              </p>
              <div className="text-right">
                <p className="text-[13px] text-zinc-700 font-mono">
                  {pctOfSpend.toFixed(1)}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-[13px] text-zinc-700 font-mono">
                  {pctOfRevenue.toFixed(1)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cost trend summary */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6">
        <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-4">
          Cost Insights
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
            <IconTrendingUp
              size={16}
              className="text-amber-500 shrink-0 mt-0.5"
            />
            <p className="text-[13px] text-zinc-700 leading-relaxed">
              Your team costs increased{" "}
              <span className="font-medium font-mono">
                {costChangePct.toFixed(0)}%
              </span>{" "}
              from last month.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
            <IconAlertTriangle
              size={16}
              className="text-[#7B6EF6] shrink-0 mt-0.5"
            />
            <p className="text-[13px] text-zinc-700 leading-relaxed">
              <span className="font-medium">{highestCostMember.name}</span> is
              your highest cost at{" "}
              <span className="font-medium font-mono">
                {fmtDollars(highestCostMember.monthlyCost)}/mo
              </span>{" "}
              ({highestPctOfBudget}% of team budget).
            </p>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
            <IconChartBar
              size={16}
              className="text-emerald-500 shrink-0 mt-0.5"
            />
            <Link
              href="/dashboard/calculator"
              className="text-[13px] text-zinc-700 leading-relaxed group"
            >
              Consider the{" "}
              <span className="text-[#7B6EF6] font-medium group-hover:underline">
                Pay Calculator
              </span>{" "}
              to benchmark your rates against industry averages.
              <IconArrowRight
                size={12}
                className="inline ml-1 text-[#7B6EF6]"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
