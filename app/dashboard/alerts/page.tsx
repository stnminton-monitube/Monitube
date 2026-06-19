"use client";

import { useDemo } from "@/components/dashboard/DemoProvider";
import { generateAlerts } from "@/lib/demo-data";
import { IconArrowRight, IconTrophy, IconAlertTriangle, IconTargetArrow, IconCheck } from "@tabler/icons-react";
import Link from "next/link";

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return `${Math.floor(days / 7)} weeks ago`;
}

const ALERT_ICONS: Record<string, { icon: typeof IconTrophy; color: string; bg: string }> = {
  milestone: { icon: IconTrophy, color: "text-amber-600", bg: "bg-amber-50" },
  underuse: { icon: IconAlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
  target: { icon: IconTargetArrow, color: "text-emerald-600", bg: "bg-emerald-50" },
  credit: { icon: IconCheck, color: "text-blue-600", bg: "bg-blue-50" },
};

export default function AlertsPage() {
  const { demo } = useDemo();

  if (!demo) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Alerts</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Load a channel from the Overview page first.</p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200 p-10 text-center">
          <p className="text-zinc-400 text-[13px] mb-4">No channel loaded yet.</p>
          <Link href="/dashboard" className="text-[13px] text-[#7B6EF6] hover:text-[#6358d4] flex items-center gap-1 justify-center">Go to Overview <IconArrowRight size={14} /></Link>
        </div>
      </div>
    );
  }

  const alerts = generateAlerts(demo);
  const unread = alerts.filter(a => !a.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Alerts</h1>
          <p className="text-[13px] text-zinc-500 mt-1">
            {unread > 0 ? `${unread} new notification${unread > 1 ? "s" : ""}` : "You're all caught up"}
          </p>
        </div>
        {unread > 0 && (
          <button className="text-[12px] text-zinc-400 hover:text-zinc-600 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors">
            Mark all read
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        {alerts.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-zinc-400 text-[13px]">No alerts yet. They&apos;ll show up when videos hit milestones, team members need attention, or bonus targets are met.</p>
          </div>
        ) : (
          alerts.map((alert, i) => {
            const config = ALERT_ICONS[alert.type] ?? ALERT_ICONS.credit;
            const Icon = config.icon;
            return (
              <div
                key={alert.id}
                className={`p-5 flex gap-4 ${i < alerts.length - 1 ? "border-b border-zinc-100" : ""} ${!alert.read ? "bg-[#7B6EF6]/[0.02]" : ""}`}
              >
                <div className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={16} className={config.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[13px] font-medium text-zinc-900">{alert.title}</p>
                    {!alert.read && <span className="w-1.5 h-1.5 rounded-full bg-[#7B6EF6]" />}
                  </div>
                  <p className="text-[12px] text-zinc-500 leading-relaxed">{alert.description}</p>
                  <p className="text-[11px] text-zinc-400 mt-1">{timeAgo(alert.createdAt)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
