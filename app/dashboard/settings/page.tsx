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

      {/* Workspace placeholder */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6">
        <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-5">Workspace</p>
        <p className="text-[13px] text-zinc-500 leading-relaxed">
          Team management, billing, and YouTube connection settings will appear here once your workspace is set up.
        </p>
      </div>
    </div>
  );
}
