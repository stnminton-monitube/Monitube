import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const email = user.emailAddresses[0]?.emailAddress ?? "";
  const initial = user.firstName?.[0] ?? email[0]?.toUpperCase() ?? "?";
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  return (
    <div className="max-w-xl">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">Settings</h1>
        <p className="text-[13px] text-zinc-500 mt-1">Manage your account details.</p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-4">
        <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-5">Profile</p>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-xl font-semibold font-heading shrink-0">
            {initial}
          </div>
          <div>
            <p className="text-[15px] font-medium text-zinc-900">{fullName || "—"}</p>
            <p className="text-[13px] text-zinc-400 font-mono">{email}</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 text-[13px] text-zinc-500 leading-relaxed">
          To update your name, email, or password, visit your{" "}
          <a
            href="https://accounts.clerk.dev/user"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7B6EF6] hover:underline"
          >
            account settings
          </a>
          .
        </div>
      </div>

      {/* Plan & Billing */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-4">
        <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-5">Plan & Billing</p>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-[12px] font-medium px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
            Free Plan
          </span>
          <span className="text-[12px] text-zinc-400">Current plan</span>
        </div>

        <div className="space-y-2.5 mb-5">
          <p className="text-[13px] text-zinc-500 leading-relaxed font-medium text-zinc-700">What&apos;s included:</p>
          {["Pay Calculator", "Pipeline (up to 3 videos, 1 team member)"].map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-[13px] text-zinc-500">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8.5L6.5 11.5L12.5 5" stroke="#7B6EF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {f}
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-[#7B6EF6]/5 to-[#E96BF5]/5 border border-[#7B6EF6]/10 mb-4">
          <p className="text-[13px] font-medium text-zinc-900 mb-1">Upgrade to Pro</p>
          <p className="text-[12px] text-zinc-500 leading-relaxed mb-0.5">
            $5 per team member/month — unlimited videos, payment tracking, invoicing, public verified profiles, AI insights, and priority support.
          </p>
          <p className="text-[11px] text-zinc-400">A 5-person team = $25/mo</p>
        </div>

        <button className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium cursor-pointer hover:opacity-90 transition-opacity">
          Upgrade to Pro
        </button>
      </div>

      {/* Workspace placeholder */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6">
        <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-5">Workspace</p>
        <p className="text-[13px] text-zinc-500 leading-relaxed">
          Team management and YouTube connection settings will appear here once your workspace is set up.
        </p>
      </div>
    </div>
  );
}
