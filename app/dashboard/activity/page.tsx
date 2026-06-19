"use client";

import { useDemo } from "@/components/dashboard/DemoProvider";
import { generateActivity } from "@/lib/demo-data";
import { IconArrowRight, IconVideo, IconUserPlus, IconTrophy, IconCoin, IconNote } from "@tabler/icons-react";
import Link from "next/link";

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)}y ago`;
}

const TYPE_CONFIG: Record<string, { icon: typeof IconVideo; color: string; bg: string }> = {
  credit: { icon: IconVideo, color: "text-purple-600", bg: "bg-purple-50" },
  join: { icon: IconUserPlus, color: "text-blue-600", bg: "bg-blue-50" },
  milestone: { icon: IconTrophy, color: "text-amber-600", bg: "bg-amber-50" },
  bonus: { icon: IconCoin, color: "text-emerald-600", bg: "bg-emerald-50" },
  log: { icon: IconNote, color: "text-zinc-600", bg: "bg-zinc-100" },
};

export default function ActivityPage() {
  const { demo } = useDemo();

  if (!demo) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Activity</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Load a channel from the Overview page first.</p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200 p-10 text-center">
          <p className="text-zinc-400 text-[13px] mb-4">No channel loaded yet.</p>
          <Link href="/dashboard" className="text-[13px] text-[#7B6EF6] hover:text-[#6358d4] flex items-center gap-1 justify-center">Go to Overview <IconArrowRight size={14} /></Link>
        </div>
      </div>
    );
  }

  const activity = generateActivity(demo);

  // Group by day
  const grouped: Record<string, typeof activity> = {};
  activity.forEach(item => {
    const day = new Date(item.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(item);
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Activity</h1>
        <p className="text-[13px] text-zinc-500 mt-1">
          Everything that&apos;s happened on {demo.channel.name}.
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([day, items]) => (
          <div key={day}>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3 px-1">{day}</p>
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
              {items.map((item, i) => {
                const config = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.credit;
                const Icon = config.icon;
                return (
                  <div key={item.id} className={`p-4 flex gap-3.5 ${i < items.length - 1 ? "border-b border-zinc-100" : ""}`}>
                    <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                      <Icon size={15} className={config.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-zinc-900">{item.title}</p>
                      <p className="text-[12px] text-zinc-400 mt-0.5 truncate">{item.description}</p>
                    </div>
                    <p className="text-[11px] text-zinc-400 shrink-0 mt-0.5">{timeAgo(item.createdAt)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
