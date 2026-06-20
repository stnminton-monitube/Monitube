"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconEye,
  IconVideo,
  IconArrowRight,
  IconEdit,
  IconShieldCheck,
} from "@tabler/icons-react";

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

const ROLE_COLORS: Record<string, string> = {
  Editor: "bg-purple-100 text-purple-700",
  "Thumbnail Designer": "bg-pink-100 text-pink-700",
  Writer: "bg-blue-100 text-blue-700",
  "Asst. Editor": "bg-orange-100 text-orange-700",
};

interface ProfileMember {
  name: string;
  role: string;
  handle: string;
  initial: string;
  videosCredited: number;
  totalViews: number;
}

const MEMBERS: ProfileMember[] = [
  { name: "Jake Morrison", role: "Editor", handle: "jake", initial: "J", videosCredited: 25, totalViews: 2_400_000 },
  { name: "Sofia Chen", role: "Thumbnail Designer", handle: "sofia", initial: "S", videosCredited: 30, totalViews: 3_100_000 },
  { name: "Marcus Williams", role: "Writer", handle: "marcus", initial: "M", videosCredited: 18, totalViews: 1_800_000 },
  { name: "Priya Sharma", role: "Editor", handle: "priya", initial: "P", videosCredited: 14, totalViews: 1_200_000 },
  { name: "Tyler Brooks", role: "Asst. Editor", handle: "tyler", initial: "T", videosCredited: 10, totalViews: 850_000 },
  { name: "Rachel Kim", role: "Writer", handle: "rachel", initial: "R", videosCredited: 8, totalViews: 620_000 },
];

export default function ProfilesPage() {
  const [visibility, setVisibility] = useState<Record<string, boolean>>(
    Object.fromEntries(MEMBERS.map((m) => [m.handle, true]))
  );

  function toggleVisibility(handle: string) {
    setVisibility((prev) => ({ ...prev, [handle]: !prev[handle] }));
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
          Public Profiles
        </h1>
        <p className="text-[13px] text-zinc-500 mt-1 max-w-xl">
          Manage your team&apos;s verified portfolios. Each member gets a public page they can share when applying for work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MEMBERS.map((m) => (
          <div
            key={m.handle}
            className="bg-white rounded-2xl border border-zinc-200 p-6 hover:border-zinc-300 transition-colors"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[15px] font-semibold font-heading">
                  {m.initial}
                </div>
                <div>
                  <p className="text-[15px] font-medium text-zinc-900">{m.name}</p>
                  <p className="text-[11px] font-mono text-zinc-400">
                    monitube.work/@{m.handle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                    ROLE_COLORS[m.role] ?? "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {m.role}
                </span>
              </div>
            </div>

            {/* Verified badge */}
            <div className="flex items-center gap-1.5 mb-4">
              <IconShieldCheck size={14} className="text-emerald-500" />
              <span className="text-[11px] font-medium text-emerald-600">
                Verified
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5">
                <div className="flex items-center gap-1 mb-1">
                  <IconVideo size={11} className="text-zinc-400" />
                  <p className="text-[9px] text-zinc-400 uppercase tracking-wider">
                    Videos Credited
                  </p>
                </div>
                <p className="text-[14px] font-medium font-mono text-zinc-900">
                  {m.videosCredited}
                </p>
              </div>
              <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5">
                <div className="flex items-center gap-1 mb-1">
                  <IconEye size={11} className="text-zinc-400" />
                  <p className="text-[9px] text-zinc-400 uppercase tracking-wider">
                    Total Views
                  </p>
                </div>
                <p className="text-[14px] font-medium font-mono text-zinc-900">
                  {fmt(m.totalViews)}
                </p>
              </div>
            </div>

            {/* Visibility toggle */}
            <div className="flex items-center justify-between rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5 mb-4">
              <span className="text-[12px] text-zinc-600">Profile visible</span>
              <button
                type="button"
                role="switch"
                aria-checked={visibility[m.handle]}
                onClick={() => toggleVisibility(m.handle)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                  visibility[m.handle] ? "bg-emerald-500" : "bg-zinc-300"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                    visibility[m.handle] ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 border-t border-zinc-100 pt-3">
              <Link
                href={`/profile/${m.handle}`}
                className="text-[12px] text-[#7B6EF6] hover:text-[#6358d4] flex items-center gap-1 transition-colors"
              >
                View profile <IconArrowRight size={13} />
              </Link>
              <button
                type="button"
                className="text-[12px] text-zinc-400 hover:text-zinc-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <IconEdit size={13} /> Edit profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
