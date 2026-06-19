"use client";

import { useDemo } from "@/components/dashboard/DemoProvider";
import { IconArrowRight, IconTrendingUp, IconTrendingDown, IconMinus, IconCrown, IconChartBar, IconVideo } from "@tabler/icons-react";
import Link from "next/link";

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

const ROLE_LABELS: Record<string, string> = {
  editor: "Editor", writer: "Writer", thumbnail_designer: "Designer", assistant_editor: "Asst. Editor",
};

export default function ReportsPage() {
  const { demo } = useDemo();

  if (!demo) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Reports</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Load a channel from the Overview page first.</p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200 p-10 text-center">
          <p className="text-zinc-400 text-[13px] mb-4">No channel loaded yet.</p>
          <Link href="/dashboard" className="text-[13px] text-[#7B6EF6] hover:text-[#6358d4] flex items-center gap-1 justify-center">Go to Overview <IconArrowRight size={14} /></Link>
        </div>
      </div>
    );
  }

  const { channel, members, videos } = demo;

  // Top performer
  const topPerformer = [...members].sort((a, b) => {
    const aVal = a.role === "thumbnail_designer" ? a.avgCtr - channel.avgCtr : a.avgRetention - channel.avgRetention;
    const bVal = b.role === "thumbnail_designer" ? b.avgCtr - channel.avgCtr : b.avgRetention - channel.avgRetention;
    return bVal - aVal;
  })[0];

  // Most improved (highest trend)
  const mostImproved = members.find(m => m.trend === "up");

  // Best video
  const bestVideo = [...videos].sort((a, b) => b.views - a.views)[0];

  // Content type breakdown
  const longForm = videos.filter(v => v.contentType === "long_form");
  const shortForm = videos.filter(v => v.contentType === "short_form");
  const shorts = videos.filter(v => v.contentType === "shorts");

  const avgViewsByType = (vids: typeof videos) =>
    vids.length > 0 ? Math.round(vids.reduce((s, v) => s + v.views, 0) / vids.length) : 0;

  // Per-role averages
  const roleStats = ["editor", "writer", "thumbnail_designer", "assistant_editor"].map(role => {
    const roleMembers = members.filter(m => m.role === role);
    if (roleMembers.length === 0) return null;
    const avgRetention = Math.round(roleMembers.reduce((s, m) => s + m.avgRetention, 0) / roleMembers.length * 10) / 10;
    const avgCtr = Math.round(roleMembers.reduce((s, m) => s + m.avgCtr, 0) / roleMembers.length * 10) / 10;
    const avgViews = Math.round(roleMembers.reduce((s, m) => s + m.avgViews, 0) / roleMembers.length);
    return { role, label: ROLE_LABELS[role], count: roleMembers.length, avgRetention, avgCtr, avgViews };
  }).filter(Boolean);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Reports</h1>
        <p className="text-[13px] text-zinc-500 mt-1">
          Performance overview for {channel.name} · {videos.length} recent videos analyzed
        </p>
      </div>

      {/* Highlights row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Top performer */}
        {topPerformer && (
          <div className="bg-white rounded-2xl border border-zinc-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <IconCrown size={16} className="text-amber-500" />
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Top Performer</p>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[14px] font-semibold font-heading">
                {topPerformer.avatar}
              </div>
              <div>
                <p className="text-[14px] font-medium text-zinc-900">{topPerformer.name}</p>
                <p className="text-[11px] text-zinc-400">{ROLE_LABELS[topPerformer.role]}</p>
              </div>
            </div>
            <p className="text-[12px] text-zinc-500">
              {topPerformer.role === "thumbnail_designer"
                ? `CTR at ${topPerformer.avgCtr}% — ${Math.round((topPerformer.avgCtr - channel.avgCtr) * 10) / 10}pts above channel avg`
                : `Retention at ${topPerformer.avgRetention}% — ${Math.round((topPerformer.avgRetention - channel.avgRetention) * 10) / 10}pts above channel avg`
              }
            </p>
          </div>
        )}

        {/* Most improved */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <IconTrendingUp size={16} className="text-emerald-500" />
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Most Improved</p>
          </div>
          {mostImproved ? (
            <>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[14px] font-semibold font-heading">
                  {mostImproved.avatar}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-zinc-900">{mostImproved.name}</p>
                  <p className="text-[11px] text-zinc-400">{ROLE_LABELS[mostImproved.role]}</p>
                </div>
              </div>
              <p className="text-[12px] text-zinc-500">
                Recent videos trending up compared to earlier work.
              </p>
            </>
          ) : (
            <p className="text-[12px] text-zinc-400 mt-2">No clear upward trend detected yet.</p>
          )}
        </div>

        {/* Best video */}
        {bestVideo && (
          <div className="bg-white rounded-2xl border border-zinc-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <IconVideo size={16} className="text-[#7B6EF6]" />
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Best Video</p>
            </div>
            <p className="text-[13px] font-medium text-zinc-900 line-clamp-2 mb-1">{bestVideo.title}</p>
            <p className="text-[12px] text-zinc-500">
              {fmt(bestVideo.views)} views · {bestVideo.retention}% retention · {bestVideo.ctr}% CTR
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Team: {bestVideo.credits.map(c => c.memberName.split(" ")[0]).join(", ")}
            </p>
          </div>
        )}
      </div>

      {/* Content type breakdown */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <IconChartBar size={18} className="text-zinc-400" />
          <h2 className="font-heading text-lg font-medium text-zinc-900">Content Breakdown</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Long-form", desc: "10+ minutes", count: longForm.length, avgViews: avgViewsByType(longForm) },
            { label: "Short-form", desc: "Under 10 min", count: shortForm.length, avgViews: avgViewsByType(shortForm) },
            { label: "Shorts", desc: "Vertical clips", count: shorts.length, avgViews: avgViewsByType(shorts) },
          ].map(t => (
            <div key={t.label} className="rounded-xl bg-zinc-50 border border-zinc-100 p-4">
              <p className="text-[13px] font-medium text-zinc-900">{t.label}</p>
              <p className="text-[11px] text-zinc-400 mb-3">{t.desc}</p>
              <p className="font-heading text-2xl font-medium text-zinc-900">{t.count}</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                {t.count > 0 ? `Avg ${fmt(t.avgViews)} views` : "No videos"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Role breakdown */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6">
        <h2 className="font-heading text-lg font-medium text-zinc-900 mb-5">Performance by Role</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium pb-3 pr-4">Role</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium pb-3 pr-4">People</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium pb-3 pr-4">Avg Retention</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium pb-3 pr-4">Avg CTR</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium pb-3">Avg Views</th>
              </tr>
            </thead>
            <tbody>
              {roleStats.map(r => r && (
                <tr key={r.role} className="border-b border-zinc-50 last:border-0">
                  <td className="py-3 pr-4 text-[13px] font-medium text-zinc-900">{r.label}</td>
                  <td className="py-3 pr-4 text-[13px] text-zinc-600 font-mono">{r.count}</td>
                  <td className="py-3 pr-4 text-[13px] text-zinc-600 font-mono">{r.avgRetention}%</td>
                  <td className="py-3 pr-4 text-[13px] text-zinc-600 font-mono">{r.avgCtr}%</td>
                  <td className="py-3 text-[13px] text-zinc-600 font-mono">{fmt(r.avgViews)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
