"use client";

import { useDemo } from "@/components/dashboard/DemoProvider";
import { IconTrendingUp, IconTrendingDown, IconMinus, IconArrowRight, IconEye, IconClock, IconVideo } from "@tabler/icons-react";
import Link from "next/link";

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
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

const PRIMARY_STAT: Record<string, string> = {
  editor: "retention",
  writer: "retention",
  thumbnail_designer: "ctr",
  assistant_editor: "retention",
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
          const primaryType = PRIMARY_STAT[m.role] ?? "retention";
          const primaryValue = primaryType === "ctr" ? m.avgCtr : m.avgRetention;
          const primaryLabel = primaryType === "ctr" ? "Avg CTR" : "Avg Retention";
          const channelAvg = primaryType === "ctr" ? channel.avgCtr : channel.avgRetention;
          const diff = Math.round((primaryValue - channelAvg) * 10) / 10;

          const recentVideos = videos
            .filter(v => v.credits.some(c => c.memberId === m.id))
            .slice(-3)
            .reverse();

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

              {/* Primary stat large */}
              <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4 mb-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">{primaryLabel}</p>
                    <p className="font-heading text-3xl font-medium tracking-tight text-zinc-900">{primaryValue}%</p>
                  </div>
                  <p className={`text-[12px] font-medium ${diff >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {diff >= 0 ? "+" : ""}{diff}pts vs avg
                  </p>
                </div>
              </div>

              {/* Secondary stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5">
                  <div className="flex items-center gap-1 mb-1">
                    <IconEye size={11} className="text-zinc-400" />
                    <p className="text-[9px] text-zinc-400 uppercase tracking-wider">Avg Views</p>
                  </div>
                  <p className="text-[14px] font-medium font-mono text-zinc-900">{fmt(m.avgViews)}</p>
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
                    <IconVideo size={11} className="text-zinc-400" />
                    <p className="text-[9px] text-zinc-400 uppercase tracking-wider">Videos</p>
                  </div>
                  <p className="text-[14px] font-medium font-mono text-zinc-900">{m.videosCredited}</p>
                </div>
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
                          <p className="text-[10px] text-zinc-400">{fmt(v.views)} views · {v.retention}% ret</p>
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
