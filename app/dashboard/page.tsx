"use client";

import { useDemo } from "@/components/dashboard/DemoProvider";
import { generateSummary } from "@/lib/demo-data";
import { IconSearch, IconLoader2, IconTrendingUp, IconTrendingDown, IconMinus, IconArrowRight, IconBrain, IconSparkles } from "@tabler/icons-react";
import { useState } from "react";
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
  manager: "bg-green-100 text-green-700",
};

const ROLE_LABELS: Record<string, string> = {
  editor: "Editor",
  writer: "Writer",
  thumbnail_designer: "Designer",
  assistant_editor: "Asst. Editor",
  manager: "Manager",
};

const PRIMARY_STAT_KEY: Record<string, "retention" | "ctr"> = {
  editor: "retention",
  writer: "retention",
  thumbnail_designer: "ctr",
  assistant_editor: "retention",
};

const STAT_EXPLAIN: Record<string, string> = {
  retention: "how long people watch",
  ctr: "how often people click the thumbnail",
};

export default function DashboardPage() {
  const { demo, loading, error, loadDemo } = useDemo();
  const [query, setQuery] = useState("");

  if (!demo) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Overview</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Connect a YouTube channel to see your dashboard in action.</p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200 p-10 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center mx-auto mb-5">
            <IconSearch size={24} className="text-white" />
          </div>
          <h2 className="font-heading text-lg font-medium text-zinc-900 mb-2">Test with a real channel</h2>
          <p className="text-[13px] text-zinc-400 mb-6 leading-relaxed">
            Paste any YouTube channel link below. We&apos;ll pull real stats and set up a simulated team so you can see exactly how Monitube works.
          </p>
          {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-[13px] text-red-600">{error}</div>}
          <div className="flex gap-2">
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && loadDemo(query)}
              placeholder="youtube.com/@channel or @handle..."
              className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/30 focus:border-[#7B6EF6]/50" />
            <button onClick={() => loadDemo(query)} disabled={loading || !query.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium disabled:opacity-50 cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2">
              {loading ? <IconLoader2 size={16} className="animate-spin" /> : null}
              {loading ? "Loading..." : "Load Demo"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { channel, members, videos } = demo;
  const totalRecentViews = videos.reduce((s, v) => s + v.views, 0);
  const summary = generateSummary(demo);

  return (
    <div>
      {/* Channel header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {channel.thumbnail && <img src={channel.thumbnail} alt={channel.name} className="w-10 h-10 rounded-full" />}
          <div>
            <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">{channel.name}</h1>
            <p className="text-[13px] text-zinc-500">{fmt(channel.subscribers)} subscribers</p>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-gradient-to-r from-[#7B6EF6]/5 to-[#E96BF5]/5 border border-[#7B6EF6]/10 rounded-2xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center shrink-0 mt-0.5">
            <IconSparkles size={16} className="text-white" />
          </div>
          <div>
            <p className="text-[11px] text-[#7B6EF6] font-medium uppercase tracking-wider mb-1.5">Quick Summary</p>
            <p className="text-[13px] text-zinc-700 leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>

      {/* Stat cards with context */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">Total Views</p>
          <p className="font-heading text-3xl font-medium tracking-tight text-zinc-900">{fmt(totalRecentViews)}</p>
          <p className="text-[12px] text-zinc-400 mt-1">across {videos.length} recent videos</p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">
            Avg Retention <span className="normal-case tracking-normal font-normal text-zinc-300">· how long people watch</span>
          </p>
          <p className="font-heading text-3xl font-medium tracking-tight text-zinc-900">{channel.avgRetention}%</p>
          <p className="text-[12px] text-zinc-400 mt-1">
            {channel.avgRetention >= 50 ? "strong — above 50% is great" : channel.avgRetention >= 40 ? "solid — room to grow" : "below average — focus on intros"}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">
            Avg CTR <span className="normal-case tracking-normal font-normal text-zinc-300">· thumbnail click rate</span>
          </p>
          <p className="font-heading text-3xl font-medium tracking-tight text-zinc-900">{channel.avgCtr}%</p>
          <p className="text-[12px] text-zinc-400 mt-1">
            {channel.avgCtr >= 8 ? "excellent — thumbnails are working" : channel.avgCtr >= 5 ? "average — test new styles" : "low — thumbnails need work"}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">Team Members</p>
          <p className="font-heading text-3xl font-medium tracking-tight text-zinc-900">{members.length}</p>
          <p className="text-[12px] text-zinc-400 mt-1">
            {members.length} active across {new Set(members.map(m => m.role)).size} roles
          </p>
        </div>
      </div>

      {/* Team performance table */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-heading text-lg font-medium text-zinc-900">Team Performance</h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">Each person&apos;s key stat for their role, compared to your channel average</p>
          </div>
          <Link href="/dashboard/team" className="text-[12px] text-[#7B6EF6] hover:text-[#6358d4] flex items-center gap-1 transition-colors">
            View all <IconArrowRight size={12} />
          </Link>
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium pb-3 pr-4">Member</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium pb-3 pr-4">Role</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium pb-3 pr-4">Key Stat</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium pb-3 pr-4">Avg Views</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium pb-3 pr-4">Videos</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium pb-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => {
                const statKey = PRIMARY_STAT_KEY[m.role] ?? "retention";
                const value = statKey === "ctr" ? m.avgCtr : m.avgRetention;
                const avg = statKey === "ctr" ? channel.avgCtr : channel.avgRetention;
                const diff = Math.round((value - avg) * 10) / 10;
                const explain = STAT_EXPLAIN[statKey];

                return (
                  <tr key={m.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[12px] font-semibold font-heading shrink-0">
                          {m.avatar}
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-zinc-900">{m.name}</p>
                          <p className="text-[11px] text-zinc-400">Since {new Date(m.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${ROLE_COLORS[m.role] ?? "bg-zinc-100 text-zinc-600"}`}>
                        {ROLE_LABELS[m.role] ?? m.role}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <p className="text-[14px] font-medium text-zinc-900 font-mono">{value}%</p>
                      <p className="text-[11px]">
                        <span className={diff >= 0 ? "text-emerald-600" : "text-red-500"}>
                          {diff >= 0 ? "+" : ""}{diff}pts vs avg
                        </span>
                        <span className="text-zinc-300"> · {explain}</span>
                      </p>
                    </td>
                    <td className="py-3.5 pr-4">
                      <p className="text-[13px] text-zinc-700 font-mono">{fmt(m.avgViews)}</p>
                    </td>
                    <td className="py-3.5 pr-4">
                      <p className="text-[13px] text-zinc-700 font-mono">{m.videosCredited}</p>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        {m.trend === "up" && <><IconTrendingUp size={16} className="text-emerald-500" /><span className="text-[11px] text-emerald-600">Up</span></>}
                        {m.trend === "down" && <><IconTrendingDown size={16} className="text-red-400" /><span className="text-[11px] text-red-500">Down</span></>}
                        {m.trend === "stable" && <><IconMinus size={16} className="text-zinc-300" /><span className="text-[11px] text-zinc-400">Stable</span></>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending approvals */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-lg font-medium text-zinc-900">Pending Approvals</h2>
          <span className="text-[11px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full font-medium">0</span>
        </div>
        <p className="text-zinc-400 text-[13px] text-center py-8">No pending credit submissions.</p>
      </div>
    </div>
  );
}
