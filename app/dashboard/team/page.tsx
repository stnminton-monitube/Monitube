"use client";

import { useDemo } from "@/components/dashboard/DemoProvider";
import { IconTrendingUp, IconTrendingDown, IconMinus, IconArrowRight, IconClock, IconVideo, IconCurrencyDollar } from "@tabler/icons-react";
import Link from "next/link";

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

function fmtDollars(n: number): string {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return "$" + (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return "$" + Math.round(n).toLocaleString();
}

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
  assistant_editor: "Assistant Editor",
};

export default function TeamPage() {
  const { demo } = useDemo();

  if (!demo) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Team</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Load a channel from the Overview page first.</p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200 p-10 text-center">
          <p className="text-zinc-400 text-[13px] mb-4">No channel loaded yet.</p>
          <Link href="/dashboard" className="text-[13px] text-[#7B6EF6] hover:text-[#6358d4] flex items-center gap-1 justify-center">
            Go to Overview <IconArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const { channel, members, videos } = demo;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Team</h1>
        <p className="text-[13px] text-zinc-500 mt-1">
          {members.length} members on {channel.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {members.map(m => {
          const recentVideos = videos
            .filter(v => v.credits.some(c => c.memberId === m.id))
            .slice(-3)
            .reverse();

          const trendLabel = m.trend === "up" ? "up from last period" : m.trend === "down" ? "down from last period" : "consistent";

          return (
            <div key={m.id} className="bg-white rounded-2xl border border-zinc-200 p-6 hover:border-zinc-300 transition-colors">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[15px] font-semibold font-heading">
                    {m.avatar}
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-zinc-900">{m.name}</p>
                    <p className="text-[11px] text-zinc-400">
                      Joined {new Date(m.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${ROLE_COLORS[m.role] ?? "bg-zinc-100 text-zinc-600"}`}>
                    {ROLE_LABELS[m.role] ?? m.role}
                  </span>
                  {m.trend === "up" && <IconTrendingUp size={16} className="text-emerald-500" />}
                  {m.trend === "down" && <IconTrendingDown size={16} className="text-red-400" />}
                  {m.trend === "stable" && <IconMinus size={16} className="text-zinc-300" />}
                </div>
              </div>

              {/* Primary stat: Avg Views */}
              <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4 mb-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Avg Views per Video</p>
                    <p className="font-heading text-3xl font-medium tracking-tight text-zinc-900 font-mono">{fmt(m.avgViews)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Est. Revenue</p>
                    <p className="text-[18px] font-medium text-emerald-700 font-mono">{fmtDollars(m.estimatedRevenueGenerated ?? 0)}</p>
                  </div>
                </div>
              </div>

              {/* Secondary stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5">
                  <div className="flex items-center gap-1 mb-1">
                    <IconVideo size={11} className="text-zinc-400" />
                    <p className="text-[9px] text-zinc-400 uppercase tracking-wider">Videos</p>
                  </div>
                  <p className="text-[14px] font-medium font-mono text-zinc-900">{m.videosCredited}</p>
                </div>
                <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5">
                  <div className="flex items-center gap-1 mb-1">
                    <IconClock size={11} className="text-zinc-400" />
                    <p className="text-[9px] text-zinc-400 uppercase tracking-wider">Watch Time</p>
                  </div>
                  <p className="text-[14px] font-medium font-mono text-zinc-900">{fmt(m.totalWatchTime)}h</p>
                </div>
                <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5">
                  <div className="flex items-center gap-1 mb-1">
                    <IconCurrencyDollar size={11} className="text-zinc-400" />
                    <p className="text-[9px] text-zinc-400 uppercase tracking-wider">Trend</p>
                  </div>
                  <p className="text-[12px] font-medium text-zinc-700">{trendLabel}</p>
                </div>
              </div>

              {/* Retention/CTR context — plain language, no benchmarks */}
              <div className="rounded-lg bg-zinc-50/50 border border-zinc-100 px-3 py-2.5 mb-4">
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  People watch <span className="font-medium text-zinc-700 font-mono">{m.avgRetention}%</span> of their videos on average.
                  Thumbnails get clicked <span className="font-medium text-zinc-700 font-mono">{m.avgCtr}%</span> of the time.
                </p>
              </div>

              {/* Recent videos */}
              {recentVideos.length > 0 && (
                <div className="border-t border-zinc-100 pt-3">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2">Recent Work</p>
                  <div className="flex flex-col gap-1.5">
                    {recentVideos.map(v => (
                      <div key={v.id} className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-zinc-50 transition-colors">
                        <img src={v.thumbnail} alt="" className="w-14 h-8 rounded object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-zinc-700 truncate">{v.title}</p>
                          <p className="text-[10px] text-zinc-400">
                            <span className="font-mono">{fmt(v.views)}</span> views
                            {v.estimatedRevenue ? <> · est. <span className="text-emerald-600 font-mono">{fmtDollars(v.estimatedRevenue)}</span></> : null}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
