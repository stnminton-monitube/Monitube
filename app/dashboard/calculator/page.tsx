"use client";

import { useState, useEffect } from "react";
import { IconCalculator, IconInfoCircle, IconBrandYoutube, IconCheck } from "@tabler/icons-react";

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

function formatViewsInput(value: string): string {
  const num = value.replace(/[^\d]/g, "");
  if (!num) return "";
  return parseInt(num).toLocaleString();
}

function parseViewsInput(value: string): number {
  return parseInt(value.replace(/[^\d]/g, "") || "0");
}

export default function CalculatorPage() {
  const [role, setRole] = useState("editor");
  const [model, setModel] = useState<PayModel>("per_video");
  const [videosPerMonth, setVideosPerMonth] = useState(8);
  const [avgRpm, setAvgRpm] = useState(4);
  const [avgViews, setAvgViews] = useState(100000);
  const [viewsInput, setViewsInput] = useState("100,000");
  const [complexity, setComplexity] = useState("standard");
  const [ytConnected, setYtConnected] = useState(false);
  const [ytChannelName, setYtChannelName] = useState("");

  useEffect(() => {
    try {
      const cookie = document.cookie.split("; ").find(c => c.startsWith("yt_channel_data="));
      if (cookie) {
        const data = JSON.parse(decodeURIComponent(cookie.split("=").slice(1).join("=")));
        if (data.rpm) setAvgRpm(data.rpm);
        if (data.monthlyViews && data.monthlyViews > 0) {
          const avgV = Math.round(data.monthlyViews / Math.max(videosPerMonth, 1));
          setAvgViews(avgV);
          setViewsInput(avgV.toLocaleString());
        }
        if (data.channelName) setYtChannelName(data.channelName);
        setYtConnected(true);
      }
    } catch { /* no cookie or invalid */ }
  }, []);

  const roleInfo = ROLE_DATA[role];
  const comp = COMPLEXITY_MULTIPLIER[complexity];

  // Calculate estimated revenue per video
  const revenuePerVideo = (avgViews / 1000) * avgRpm;
  const monthlyRevenue = revenuePerVideo * videosPerMonth;

  // Calculate suggested pay based on model
  let payLabel = "";
  let payContext = "";
  let monthlyCost = 0;
  let perVideoCost = 0;

  if (model === "per_video") {
    const base = (roleInfo.perVideoRange[0] + roleInfo.perVideoRange[1]) / 2;
    perVideoCost = base * comp.mult;
    monthlyCost = perVideoCost * videosPerMonth;
    payLabel = `${fmt(perVideoCost)} per video`;
    payContext = `That's ${fmt(monthlyCost)}/month for ${videosPerMonth} videos.`;
  } else if (model === "monthly") {
    const base = (roleInfo.monthlyRange[0] + roleInfo.monthlyRange[1]) / 2;
    monthlyCost = base * comp.mult;
    perVideoCost = monthlyCost / videosPerMonth;
    payLabel = `${fmt(monthlyCost)} per month`;
    payContext = `That's ${fmt(perVideoCost)} per video across ${videosPerMonth} videos.`;
  } else if (model === "revenue_share") {
    const pct = (roleInfo.revShareRange[0] + roleInfo.revShareRange[1]) / 2;
    monthlyCost = (pct / 100) * monthlyRevenue;
    perVideoCost = monthlyCost / videosPerMonth;
    payLabel = `${pct.toFixed(0)}% of revenue`;
    payContext = `At your current views, that's roughly ${fmt(monthlyCost)}/month. Scales with performance.`;
  } else if (model === "hybrid") {
    const flatBase = roleInfo.perVideoRange[0] * comp.mult * 0.6;
    const pct = roleInfo.revShareRange[0] + 2;
    const commissionPart = (pct / 100) * monthlyRevenue;
    monthlyCost = (flatBase * videosPerMonth) + commissionPart;
    perVideoCost = monthlyCost / videosPerMonth;
    payLabel = `${fmt(flatBase)} per video + ${pct}% of revenue`;
    payContext = `Flat fee for stability, commission for performance. Total: ${fmt(monthlyCost)}/month.`;
  }

  const teamCostPct = monthlyRevenue > 0 ? (monthlyCost / monthlyRevenue) * 100 : 0;
  const costPer1kViews = avgViews > 0 ? perVideoCost / (avgViews / 1000) : 0;

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
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Your Channel</p>
              {ytConnected ? (
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-full">
                  <IconCheck size={12} /> {ytChannelName || "YouTube connected"}
                </span>
              ) : (
                <a href="/api/youtube/connect"
                  className="flex items-center gap-1.5 text-[11px] text-red-600 font-medium bg-red-50 px-2.5 py-1 rounded-full hover:bg-red-100 transition-colors">
                  <IconBrandYoutube size={13} /> Connect YouTube — auto-fill RPM
                </a>
              )}
            </div>
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
                <input type="number" value={avgRpm} onChange={e => setAvgRpm(Math.max(0.5, parseFloat(e.target.value) || 0.5))} step="0.5" min="0.5"
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-[14px] text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40" />
              </div>
              <div>
                <label className="text-[12px] text-zinc-600 font-medium mb-1.5 block">Avg views per video</label>
                <input type="text" inputMode="numeric" value={viewsInput}
                  onChange={e => {
                    const formatted = formatViewsInput(e.target.value);
                    setViewsInput(formatted);
                    setAvgViews(parseViewsInput(e.target.value));
                  }}
                  placeholder="100,000"
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
              <p className="font-heading text-3xl font-medium tracking-tight text-zinc-900 font-mono mb-1">{payLabel}</p>
              <p className="text-[12px] text-zinc-500 leading-relaxed">{payContext}</p>
              <div className="mt-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100 space-y-1">
                <div className="flex justify-between text-[12px]">
                  <span className="text-zinc-500">Monthly total</span>
                  <span className="text-zinc-900 font-mono font-medium">{fmt(monthlyCost)}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-zinc-500">Per video</span>
                  <span className="text-zinc-900 font-mono font-medium">{fmt(perVideoCost)}</span>
                </div>
                {costPer1kViews > 0 && (
                  <div className="flex justify-between text-[12px]">
                    <span className="text-zinc-500">Per 1K views</span>
                    <span className="text-zinc-900 font-mono font-medium">{fmt(costPer1kViews)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[12px]">
                  <span className="text-zinc-500">% of revenue</span>
                  <span className={`font-mono font-medium ${teamCostPct <= 15 ? "text-emerald-600" : teamCostPct <= 30 ? "text-amber-600" : "text-red-500"}`}>
                    {teamCostPct.toFixed(1)}%
                  </span>
                </div>
              </div>
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
