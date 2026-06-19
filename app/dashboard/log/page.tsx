"use client";

import { useDemo } from "@/components/dashboard/DemoProvider";
import { generateLogs } from "@/lib/demo-data";
import { IconArrowRight, IconLock, IconEye } from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

export default function LogPage() {
  const { demo } = useDemo();
  const [filter, setFilter] = useState("all");

  if (!demo) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Performance Log</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Load a channel from the Overview page first.</p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200 p-10 text-center">
          <p className="text-zinc-400 text-[13px] mb-4">No channel loaded yet.</p>
          <Link href="/dashboard" className="text-[13px] text-[#7B6EF6] hover:text-[#6358d4] flex items-center gap-1 justify-center">Go to Overview <IconArrowRight size={14} /></Link>
        </div>
      </div>
    );
  }

  const logs = generateLogs(demo);
  const members = ["all", ...demo.members.map(m => m.id)];
  const filtered = filter === "all" ? logs : logs.filter(l => l.memberId === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Performance Log</h1>
          <p className="text-[13px] text-zinc-500 mt-1">
            Private notes about your team. Only you can see these — they&apos;re never shown publicly.
          </p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all">
          + Add note
        </button>
      </div>

      {/* Filter by member */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-medium cursor-pointer transition-colors ${
            filter === "all" ? "bg-[#7B6EF6] text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
          }`}
        >
          All
        </button>
        {demo.members.map(m => (
          <button
            key={m.id}
            onClick={() => setFilter(m.id)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium cursor-pointer transition-colors ${
              filter === m.id ? "bg-[#7B6EF6] text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            }`}
          >
            {m.name.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Log entries */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        {filtered.map((log, i) => (
          <div key={log.id} className={`p-5 flex gap-4 ${i < filtered.length - 1 ? "border-b border-zinc-100" : ""}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[12px] font-semibold font-heading shrink-0 mt-0.5">
              {log.memberAvatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[13px] font-medium text-zinc-900">{log.memberName}</p>
                <div className="flex items-center gap-2">
                  {log.visibleToMember ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <IconEye size={10} /> Shared
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded-full">
                      <IconLock size={10} /> Private
                    </span>
                  )}
                  <span className="text-[11px] text-zinc-400">{timeAgo(log.createdAt)}</span>
                </div>
              </div>
              <p className="text-[13px] text-zinc-600 leading-relaxed">{log.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div className="mt-6 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
        <p className="text-[12px] text-zinc-500 leading-relaxed">
          <strong className="text-zinc-700">Private</strong> notes are only visible to you.{" "}
          <strong className="text-zinc-700">Shared</strong> notes are also visible to that team member.
          The AI uses these notes when generating performance summaries and answering your questions.
        </p>
      </div>
    </div>
  );
}
