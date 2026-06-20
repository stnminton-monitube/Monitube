"use client";

import { useState } from "react";
import { IconCalculator, IconCoin, IconInfoCircle } from "@tabler/icons-react";

type PayModel = "per_video" | "monthly" | "revenue_share" | "hybrid";

const ROLE_DATA: Record<string, { label: string; perVideoRange: [number, number]; monthlyRange: [number, number]; revShareRange: [number, number] }> = {
  editor: {
    label: "Editor",
    perVideoRange: [100, 600],
    monthlyRange: [1500, 5000],
    revShareRange: [5, 15],
  },
  lead_editor: {
    label: "Lead Editor",
    perVideoRange: [250, 1000],
    monthlyRange: [3000, 8000],
    revShareRange: [8, 20],
  },
  assistant_editor: {
    label: "Assistant Editor",
    perVideoRange: [50, 200],
    monthlyRange: [800, 2500],
    revShareRange: [3, 8],
  },
  thumbnail_designer: {
    label: "Thumbnail Designer",
    perVideoRange: [20, 100],
    monthlyRange: [500, 2000],
    revShareRange: [2, 5],
  },
  writer: {
    label: "Scriptwriter",
    perVideoRange: [75, 400],
    monthlyRange: [1200, 4000],
    revShareRange: [5, 12],
  },
};

const COMPLEXITY_MULTIPLIER: Record<string, { label: string; desc: string; mult: number }> = {
  basic: { label: "Basic", desc: "Talking head, minimal cuts, no effects", mult: 0.7 },
  standard: { label: "Standard", desc: "Jump cuts, music, light graphics", mult: 1.0 },
  advanced: { label: "Advanced", desc: "B-roll, motion graphics, sound design", mult: 1.5 },
  premium: { label: "Premium", desc: "MrBeast-level production, heavy VFX", mult: 2.5 },
};

function fmt(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}

export default function CalculatorPage() {
  const [role, setRole] = useState("editor");
  const [model, setModel] = useState<PayModel>("per_video");
  const [videosPerMonth, setVideosPerMonth] = useState(8);
  const [avgRpm, setAvgRpm] = useState(5);
  const [avgViews, setAvgViews] = useState(50000);
  const [complexity, setComplexity] = useState("standard");

  const roleInfo = ROLE_DATA[role];
  const comp = COMPLEXITY_MULTIPLIER[complexity];

  // Calculate estimated revenue per video
  const revenuePerVideo = (avgViews / 1000) * avgRpm;
  const monthlyRevenue = revenuePerVideo * videosPerMonth;

  // Calculate suggested pay based on model
  let suggestedPay = 0;
  let payLabel = "";
  let payContext = "";

  if (model === "per_video") {
    const base = (roleInfo.perVideoRange[0] + roleInfo.perVideoRange[1]) / 2;
    suggestedPay = base * comp.mult;
    const monthlyTotal = suggestedPay * videosPerMonth;
    payLabel = `${fmt(suggestedPay)} per video`;
    payContext = `That's ${fmt(monthlyTotal)}/month for ${videosPerMonth} videos — ${((monthlyTotal / monthlyRevenue) * 100).toFixed(1)}% of your estimated revenue.`;
  } else if (model === "monthly") {
    const base = (roleInfo.monthlyRange[0] + roleInfo.monthlyRange[1]) / 2;
    suggestedPay = base * comp.mult;
    const perVideo = suggestedPay / videosPerMonth;
    payLabel = `${fmt(suggestedPay)} per month`;
    payContext = `That's ${fmt(perVideo)} per video — ${((suggestedPay / monthlyRevenue) * 100).toFixed(1)}% of your estimated monthly revenue.`;
  } else if (model === "revenue_share") {
    const pct = (roleInfo.revShareRange[0] + roleInfo.revShareRange[1]) / 2;
    suggestedPay = (pct / 100) * monthlyRevenue;
    payLabel = `${pct.toFixed(0)}% of revenue`;
    payContext = `At your current views, that's roughly ${fmt(suggestedPay)}/month. Scales up or down with performance — ${role === "editor" ? "editors" : "team members"} are incentivized to do great work.`;
  } else if (model === "hybrid") {
    const flatBase = roleInfo.perVideoRange[0] * comp.mult * 0.6;
    const pct = roleInfo.revShareRange[0] + 2;
    const commissionPart = (pct / 100) * monthlyRevenue;
    suggestedPay = (flatBase * videosPerMonth) + commissionPart;
    payLabel = `${fmt(flatBase)} per video + ${pct}% of revenue`;
    payContext = `The flat fee gives them stability. The commission rewards performance. Total estimated: ${fmt(suggestedPay)}/month.`;
  }

  const teamCostPct = (suggestedPay / monthlyRevenue) * 100;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Pay Calculator</h1>
        <p className="text-[13px] text-zinc-500 mt-1 max-w-xl leading-relaxed">
          Figure out what to pay your team based on your channel&apos;s revenue, video output, and the role you&apos;re hiring for. Rates are based on real industry data from 2024–2026.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-3 space-y-5">
          {/* Your channel */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-4">Your Channel</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">Videos per month</label>
                <input type="number" value={videosPerMonth} onChange={e => setVideosPerMonth(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[14px] text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40" />
              </div>
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 flex items-center gap-1">
                  RPM <span className="text-zinc-400 font-normal">($ per 1K views)</span>
                </label>
                <input type="number" value={avgRpm} onChange={e => setAvgRpm(Math.max(0.5, parseFloat(e.target.value) || 0.5))} step="0.5"
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[14px] text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40" />
              </div>
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">Avg views per video</label>
                <input type="number" value={avgViews} onChange={e => setAvgViews(Math.max(100, parseInt(e.target.value) || 100))} step="1000"
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[14px] text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40" />
              </div>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
              <p className="text-[12px] text-zinc-500">
                Estimated revenue: <span className="font-medium text-zinc-900 font-mono">{fmt(revenuePerVideo)}</span> per video · <span className="font-medium text-zinc-900 font-mono">{fmt(monthlyRevenue)}</span>/month
              </p>
            </div>
          </div>

          {/* Role selection */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-4">Who are you hiring?</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(ROLE_DATA).map(([key, r]) => (
                <button key={key} onClick={() => setRole(key)}
                  className={`px-3.5 py-2 rounded-xl text-[12px] font-medium cursor-pointer transition-all ${
                    role === key ? "bg-[#7B6EF6] text-white" : "bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100"
                  }`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Video complexity */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-4">Video Complexity</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(COMPLEXITY_MULTIPLIER).map(([key, c]) => (
                <button key={key} onClick={() => setComplexity(key)}
                  className={`p-3 rounded-xl text-left cursor-pointer transition-all ${
                    complexity === key ? "bg-[#7B6EF6]/8 border-[#7B6EF6]/30 border" : "bg-zinc-50 border border-zinc-100 hover:bg-zinc-100"
                  }`}>
                  <p className={`text-[12px] font-medium ${complexity === key ? "text-[#7B6EF6]" : "text-zinc-900"}`}>{c.label}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Payment model */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-4">Payment Model</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "per_video" as PayModel, label: "Per Video", desc: "Flat fee for each edit. Simple, predictable. Best for freelancers or low volume." },
                { key: "monthly" as PayModel, label: "Monthly Retainer", desc: "Fixed monthly pay for a set number of videos. Gives your editor stability." },
                { key: "revenue_share" as PayModel, label: "Revenue Share", desc: "% of each video's AdSense earnings. Aligns incentives — they earn more when you do." },
                { key: "hybrid" as PayModel, label: "Hybrid", desc: "Small flat fee per video + a % of revenue. Best of both — stability plus upside." },
              ].map(m => (
                <button key={m.key} onClick={() => setModel(m.key)}
                  className={`p-4 rounded-xl text-left cursor-pointer transition-all ${
                    model === m.key ? "bg-[#7B6EF6]/8 border-[#7B6EF6]/30 border" : "bg-zinc-50 border border-zinc-100 hover:bg-zinc-100"
                  }`}>
                  <p className={`text-[13px] font-medium ${model === m.key ? "text-[#7B6EF6]" : "text-zinc-900"}`}>{m.label}</p>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <IconCalculator size={18} className="text-[#7B6EF6]" />
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Suggested Pay</p>
            </div>

            <div className="mb-5">
              <p className="font-heading text-3xl font-medium tracking-tight text-zinc-900 mb-1">{payLabel}</p>
              <p className="text-[12px] text-zinc-500 leading-relaxed">{payContext}</p>
            </div>

            {/* Range context */}
            <div className="border-t border-zinc-100 pt-4 mb-4">
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">Industry Range for {roleInfo.label}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span className="text-zinc-500">Per video</span>
                  <span className="text-zinc-900 font-mono">{fmt(roleInfo.perVideoRange[0])} – {fmt(roleInfo.perVideoRange[1])}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-zinc-500">Monthly</span>
                  <span className="text-zinc-900 font-mono">{fmt(roleInfo.monthlyRange[0])} – {fmt(roleInfo.monthlyRange[1])}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-zinc-500">Revenue share</span>
                  <span className="text-zinc-900 font-mono">{roleInfo.revShareRange[0]}% – {roleInfo.revShareRange[1]}%</span>
                </div>
              </div>
            </div>

            {/* Cost health */}
            <div className="border-t border-zinc-100 pt-4 mb-4">
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">Cost Health</p>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${teamCostPct <= 15 ? "bg-emerald-500" : teamCostPct <= 30 ? "bg-amber-500" : "bg-red-500"}`} />
                <p className="text-[13px] text-zinc-700">
                  {teamCostPct <= 15
                    ? "Healthy — this role costs under 15% of your revenue"
                    : teamCostPct <= 30
                    ? "Moderate — consider if the quality justifies 15-30% of revenue"
                    : "High — this exceeds 30% of revenue. Consider a cheaper model or growing views first"
                  }
                </p>
              </div>
              <div className="mt-2 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${teamCostPct <= 15 ? "bg-emerald-500" : teamCostPct <= 30 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${Math.min(teamCostPct, 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-mono">{teamCostPct.toFixed(1)}% of estimated revenue</p>
            </div>

            {/* Tips */}
            <div className="border-t border-zinc-100 pt-4">
              <div className="flex items-start gap-2">
                <IconInfoCircle size={14} className="text-zinc-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {model === "per_video" && "Per-video works best when you're uploading irregularly or testing a new editor. Switch to a retainer once you have a consistent schedule."}
                  {model === "monthly" && "Retainers give your editor stability and loyalty. Most channels switch to this once they upload weekly. Keep pay close between team members to avoid friction."}
                  {model === "revenue_share" && "Revenue share aligns incentives — your editor earns more when videos perform. Some creators add a minimum guarantee so the editor isn't hurt by a slow month."}
                  {model === "hybrid" && "Hybrid is the gold standard for top channels. A small base covers the editor's time, and the commission motivates great work. Mario Joos recommends 10% of revenue after the video earns $2K."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
