"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconPlus,
  IconMail,
  IconDotsVertical,
  IconExternalLink,
  IconEye,
  IconVideo,
  IconArrowRight,
  IconEdit,
  IconShieldCheck,
} from "@tabler/icons-react";

/* ═══════════════════════════════════════════════════════════════
   TAB: MEMBERS — data
   ═══════════════════════════════════════════════════════════════ */

type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  joinedAt: string;
  videosAssigned: number;
  activeVideos: number;
  payModel: string;
  payRate: string;
  profileHandle: string;
};

const DEMO_MEMBERS: Member[] = [
  { id: "m1", name: "Jake Morrison", role: "editor", email: "jake@email.com", avatar: "J", joinedAt: "2024-02-15", videosAssigned: 25, activeVideos: 2, payModel: "Per video", payRate: "$400/video", profileHandle: "jake" },
  { id: "m2", name: "Sofia Chen", role: "thumbnail_designer", email: "sofia@email.com", avatar: "S", joinedAt: "2024-02-15", videosAssigned: 30, activeVideos: 3, payModel: "Per thumbnail", payRate: "$65/thumbnail", profileHandle: "sofia" },
  { id: "m3", name: "Marcus Williams", role: "writer", email: "marcus@email.com", avatar: "M", joinedAt: "2024-06-10", videosAssigned: 18, activeVideos: 1, payModel: "Per script", payRate: "$250/script", profileHandle: "marcus" },
  { id: "m4", name: "Priya Sharma", role: "editor", email: "priya@email.com", avatar: "P", joinedAt: "2024-09-22", videosAssigned: 14, activeVideos: 2, payModel: "Monthly", payRate: "$2,800/mo", profileHandle: "priya" },
  { id: "m5", name: "Tyler Brooks", role: "assistant_editor", email: "tyler@email.com", avatar: "T", joinedAt: "2025-01-08", videosAssigned: 10, activeVideos: 1, payModel: "Per video", payRate: "$175/video", profileHandle: "tyler" },
  { id: "m6", name: "Rachel Kim", role: "writer", email: "rachel@email.com", avatar: "R", joinedAt: "2025-04-15", videosAssigned: 8, activeVideos: 1, payModel: "Per script", payRate: "$200/script", profileHandle: "rachel" },
];

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

/* ═══════════════════════════════════════════════════════════════
   TAB: PROFILES — data
   ═══════════════════════════════════════════════════════════════ */

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

const PROFILE_ROLE_COLORS: Record<string, string> = {
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

const PROFILE_MEMBERS: ProfileMember[] = [
  { name: "Jake Morrison", role: "Editor", handle: "jake", initial: "J", videosCredited: 25, totalViews: 2_400_000 },
  { name: "Sofia Chen", role: "Thumbnail Designer", handle: "sofia", initial: "S", videosCredited: 30, totalViews: 3_100_000 },
  { name: "Marcus Williams", role: "Writer", handle: "marcus", initial: "M", videosCredited: 18, totalViews: 1_800_000 },
  { name: "Priya Sharma", role: "Editor", handle: "priya", initial: "P", videosCredited: 14, totalViews: 1_200_000 },
  { name: "Tyler Brooks", role: "Asst. Editor", handle: "tyler", initial: "T", videosCredited: 10, totalViews: 850_000 },
  { name: "Rachel Kim", role: "Writer", handle: "rachel", initial: "R", videosCredited: 8, totalViews: 620_000 },
];

/* ═══════════════════════════════════════════════════════════════
   Tabs
   ═══════════════════════════════════════════════════════════════ */

type Tab = "members" | "profiles";

const TABS: { key: Tab; label: string }[] = [
  { key: "members", label: "Members" },
  { key: "profiles", label: "Profiles" },
];

/* ═══════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════ */

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<Tab>("members");
  const [members] = useState(DEMO_MEMBERS);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Team</h1>
          <p className="text-[13px] text-zinc-500 mt-1">{members.length} members on your team</p>
        </div>
        {activeTab === "members" && (
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all">
            <IconPlus size={15} /> Invite member
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-colors ${
              activeTab === tab.key
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "members" && <MembersTab members={members} />}
      {activeTab === "profiles" && <ProfilesTab />}
    </div>
  );
}

/* ─── MEMBERS TAB ──────────────────────────────────────────── */

function MembersTab({ members }: { members: Member[] }) {
  return (
    <>
      {/* Team table */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-5">Member</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4">Role</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4">Pay</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4">Active Videos</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4">Total Credited</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4">Profile</th>
                <th className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[13px] font-semibold font-heading shrink-0">
                        {m.avatar}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-zinc-900">{m.name}</p>
                        <p className="text-[11px] text-zinc-400">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${ROLE_COLORS[m.role] ?? "bg-zinc-100 text-zinc-600"}`}>
                      {ROLE_LABELS[m.role] ?? m.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-[13px] text-zinc-900 font-mono">{m.payRate}</p>
                    <p className="text-[10px] text-zinc-400">{m.payModel}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-[13px] text-zinc-900 font-mono">{m.activeVideos}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-[13px] text-zinc-600 font-mono">{m.videosAssigned}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <a href={`/profile/${m.profileHandle}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] text-[#7B6EF6] hover:text-[#6358d4]">
                      <IconExternalLink size={12} /> @{m.profileHandle}
                    </a>
                  </td>
                  <td className="py-3.5 px-4">
                    <button className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 cursor-pointer">
                      <IconDotsVertical size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite section */}
      <div className="mt-6 bg-zinc-50 rounded-2xl border border-zinc-200 p-6">
        <h3 className="font-heading text-sm font-medium text-zinc-700 mb-2">Invite a new team member</h3>
        <p className="text-[12px] text-zinc-500 mb-4">Send an email invite. They&apos;ll create a free account and you assign them a role.</p>
        <div className="flex gap-2 max-w-md">
          <div className="flex-1 relative">
            <IconMail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input type="email" placeholder="teammate@email.com"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40" />
          </div>
          <button className="px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-[13px] font-medium cursor-pointer hover:bg-zinc-800 transition-colors">
            Send invite
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── PROFILES TAB ─────────────────────────────────────────── */

function ProfilesTab() {
  const [visibility, setVisibility] = useState<Record<string, boolean>>(
    Object.fromEntries(PROFILE_MEMBERS.map((m) => [m.handle, true]))
  );

  function toggleVisibility(handle: string) {
    setVisibility((prev) => ({ ...prev, [handle]: !prev[handle] }));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {PROFILE_MEMBERS.map((m) => (
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
            <span
              className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                PROFILE_ROLE_COLORS[m.role] ?? "bg-zinc-100 text-zinc-600"
              }`}
            >
              {m.role}
            </span>
          </div>

          {/* Verified badge */}
          <div className="flex items-center gap-1.5 mb-4">
            <IconShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[11px] font-medium text-emerald-600">Verified</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5">
              <div className="flex items-center gap-1 mb-1">
                <IconVideo size={11} className="text-zinc-400" />
                <p className="text-[9px] text-zinc-400 uppercase tracking-wider">Videos Credited</p>
              </div>
              <p className="text-[14px] font-medium font-mono text-zinc-900">{m.videosCredited}</p>
            </div>
            <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5">
              <div className="flex items-center gap-1 mb-1">
                <IconEye size={11} className="text-zinc-400" />
                <p className="text-[9px] text-zinc-400 uppercase tracking-wider">Total Views</p>
              </div>
              <p className="text-[14px] font-medium font-mono text-zinc-900">{fmt(m.totalViews)}</p>
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
  );
}
