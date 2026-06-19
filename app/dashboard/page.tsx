import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const firstName = user.firstName ?? "there";

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
          Welcome back, {firstName}.
        </h1>
        <p className="text-[13px] text-zinc-500 mt-1">
          Here&apos;s what&apos;s happening with your channel.
        </p>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Views", value: "—", sub: "this period" },
          { label: "Avg Retention", value: "—", sub: "across videos" },
          { label: "Avg CTR", value: "—", sub: "click-through rate" },
          { label: "Team Members", value: "0", sub: "active" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-2xl border border-zinc-200 p-5">
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-3">{label}</p>
            <p className="font-heading text-3xl font-medium tracking-tight text-zinc-900">{value}</p>
            <p className="text-[12px] text-zinc-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Team table placeholder */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-lg font-medium text-zinc-900">Team Performance</h2>
        </div>
        <div className="text-center py-16">
          <p className="text-zinc-400 text-[13px]">
            No team members yet. Invite your first team member to get started.
          </p>
        </div>
      </div>

      {/* Pending approvals placeholder */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-lg font-medium text-zinc-900">Pending Approvals</h2>
          <span className="text-[11px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full font-medium">0</span>
        </div>
        <p className="text-zinc-400 text-[13px] text-center py-8">
          No pending credit submissions.
        </p>
      </div>
    </div>
  );
}
