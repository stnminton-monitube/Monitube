"use client";

import { useDemo } from "@/components/dashboard/DemoProvider";
import { generateBonuses } from "@/lib/demo-data";
import { IconArrowRight, IconCheck, IconX, IconTargetArrow } from "@tabler/icons-react";
import Link from "next/link";

const ROLE_LABELS: Record<string, string> = {
  editor: "Editor", writer: "Writer", thumbnail_designer: "Designer", assistant_editor: "Asst. Editor",
};

export default function BonusesPage() {
  const { demo } = useDemo();

  if (!demo) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Bonuses</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Load a channel from the Overview page first.</p>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200 p-10 text-center">
          <p className="text-zinc-400 text-[13px] mb-4">No channel loaded yet.</p>
          <Link href="/dashboard" className="text-[13px] text-[#7B6EF6] hover:text-[#6358d4] flex items-center gap-1 justify-center">Go to Overview <IconArrowRight size={14} /></Link>
        </div>
      </div>
    );
  }

  const { targets, achievements } = generateBonuses(demo);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Bonuses</h1>
        <p className="text-[13px] text-zinc-500 mt-1">
          Set performance targets for your team. Monitube tracks progress and suggests bonus amounts — you decide what to pay.
        </p>
      </div>

      {/* Pending achievements */}
      {achievements.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6">
          <h2 className="font-heading text-lg font-medium text-emerald-900 mb-4">Targets Hit</h2>
          {achievements.map(a => (
            <div key={a.id} className="flex items-center justify-between bg-white rounded-xl border border-emerald-100 p-4 mb-2 last:mb-0">
              <div>
                <p className="text-[14px] font-medium text-zinc-900">{a.memberName}</p>
                <p className="text-[12px] text-zinc-500 mt-0.5">
                  {a.statLabel} hit {a.achievedValue}% — above {a.threshold}% target
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right mr-2">
                  <p className="text-[11px] text-zinc-400">Suggested</p>
                  <p className="font-heading text-lg font-medium text-emerald-700">${a.suggestedAmount}</p>
                </div>
                <button className="p-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 cursor-pointer transition-colors">
                  <IconCheck size={16} />
                </button>
                <button className="p-2 rounded-lg bg-zinc-100 text-zinc-400 hover:bg-zinc-200 cursor-pointer transition-colors">
                  <IconX size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active targets */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-lg font-medium text-zinc-900">Active Targets</h2>
          <button className="text-[12px] text-[#7B6EF6] hover:text-[#6358d4] flex items-center gap-1 cursor-pointer transition-colors">
            + Set new target
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {targets.map(t => {
            const met = t.currentValue >= t.threshold;
            return (
              <div key={t.id} className="border border-zinc-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-[12px] font-semibold font-heading">
                      {t.memberName[0]}
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-zinc-900">{t.memberName}</p>
                      <p className="text-[11px] text-zinc-400">{ROLE_LABELS[t.memberRole] ?? t.memberRole}</p>
                    </div>
                  </div>
                  <IconTargetArrow size={18} className={met ? "text-emerald-500" : "text-zinc-300"} />
                </div>

                <div className="bg-zinc-50 rounded-lg p-3 mb-3">
                  <p className="text-[12px] text-zinc-600">
                    If <span className="font-medium text-zinc-900">{t.statLabel.toLowerCase()}</span> across next {t.videoCount} videos exceeds{" "}
                    <span className="font-medium text-zinc-900">{t.threshold}%</span> →{" "}
                    <span className="font-medium text-[#7B6EF6]">${t.bonusPerUnit} for every 1% above {t.threshold}%</span>
                  </p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[11px] text-zinc-400">Current: {t.currentValue}%</p>
                    <p className="text-[11px] text-zinc-400">Target: {t.threshold}%</p>
                  </div>
                  <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${met ? "bg-emerald-500" : "bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5]"}`}
                      style={{ width: `${Math.min(t.progress, 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] mt-1.5 text-zinc-500">
                    {met
                      ? `Target met! ${t.currentValue - t.threshold > 0 ? `${Math.round((t.currentValue - t.threshold) * t.bonusPerUnit)} suggested bonus` : ""}`
                      : `${Math.round(t.threshold - t.currentValue)}pts to go`
                    }
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
        <h3 className="font-heading text-sm font-medium text-zinc-700 mb-3">How bonuses work</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[12px] text-zinc-500 leading-relaxed">
          <div>
            <p className="font-medium text-zinc-700 mb-1">1. You set a target</p>
            <p>Choose a team member, pick a stat (retention, CTR, views), set the threshold and bonus formula.</p>
          </div>
          <div>
            <p className="font-medium text-zinc-700 mb-1">2. Monitube tracks it</p>
            <p>As new videos come in, we automatically check if the target was hit and calculate the suggested bonus.</p>
          </div>
          <div>
            <p className="font-medium text-zinc-700 mb-1">3. You decide</p>
            <p>When a target is hit, you get notified with a suggested amount. Accept, adjust, or dismiss — you&apos;re always in control.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
