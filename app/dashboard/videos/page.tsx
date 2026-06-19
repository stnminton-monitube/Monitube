"use client";

import { useDemo } from "@/components/dashboard/DemoProvider";
import { IconEye, IconThumbUp, IconMessage, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
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
  thumbnail_designer: "Designer",
  assistant_editor: "Asst. Editor",
};

export default function VideosPage() {
  const { demo } = useDemo();

  if (!demo) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Videos</h1>
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

  const { channel, videos } = demo;
  const sorted = [...videos].reverse(); // newest first

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Videos</h1>
          <p className="text-[13px] text-zinc-500 mt-1">
            {videos.length} videos from {channel.name} · showing team credits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map(v => (
          <div key={v.id} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:border-zinc-300 hover:shadow-sm transition-all">
            {/* Thumbnail */}
            <a href={`https://youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="block relative aspect-video bg-zinc-100">
              <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                {fmt(v.views)} views
              </span>
            </a>

            <div className="p-4">
              {/* Title */}
              <h3 className="text-[13px] font-medium text-zinc-900 line-clamp-2 leading-snug mb-3">
                {v.title}
              </h3>

              {/* Stats row */}
              <div className="flex items-center gap-4 text-[11px] text-zinc-400 mb-3">
                <span className="flex items-center gap-1"><IconEye size={12} />{fmt(v.views)}</span>
                <span className="flex items-center gap-1"><IconThumbUp size={12} />{fmt(v.likes)}</span>
                <span className="flex items-center gap-1"><IconMessage size={12} />{fmt(v.comments)}</span>
                <span className="ml-auto">{timeAgo(v.publishedAt)}</span>
              </div>

              {/* Performance stats */}
              <div className="flex gap-2 mb-3">
                <div className="flex-1 rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2 text-center">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-0.5">Retention</p>
                  <p className="text-[14px] font-medium font-mono text-zinc-900">{v.retention}%</p>
                </div>
                <div className="flex-1 rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2 text-center">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-0.5">CTR</p>
                  <p className="text-[14px] font-medium font-mono text-zinc-900">{v.ctr}%</p>
                </div>
              </div>

              {/* Team credits */}
              <div className="border-t border-zinc-100 pt-3">
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2">Credits</p>
                <div className="flex flex-wrap gap-1.5">
                  {v.credits.map((c, i) => (
                    <span key={i} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${ROLE_COLORS[c.role] ?? "bg-zinc-100 text-zinc-600"}`}>
                      {c.memberName.split(" ")[0]} · {ROLE_LABELS[c.role] ?? c.role}
                      {c.weight < 100 && ` ${c.weight}%`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
