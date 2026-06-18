import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SettingsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const email = user.emailAddresses[0]?.emailAddress ?? "";
  const initial = user.firstName?.[0] ?? email[0]?.toUpperCase() ?? "?";
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  return (
    <main className="min-h-screen px-4 py-12" style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Back link */}
        <Link href="/dashboard" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 13, color: "var(--text-3)", textDecoration: "none",
          marginBottom: 40, transition: "color 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to dashboard
        </Link>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 500, fontSize: 28, letterSpacing: "-0.03em",
          color: "var(--text-1)", marginBottom: 8,
        }}>
          Settings
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 40 }}>
          Manage your account details.
        </p>

        {/* Profile card */}
        <div className="glass" style={{ borderRadius: 20, padding: "32px 32px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 20 }}>
            Profile
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "linear-gradient(135deg, #7B6EF6, #E96BF5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, fontWeight: 600, color: "white",
              fontFamily: "'Bricolage Grotesque', sans-serif", flexShrink: 0,
            }}>
              {initial}
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 500, color: "var(--text-1)", marginBottom: 2 }}>
                {fullName || "—"}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-3)", fontFamily: "'DM Mono', monospace", fontWeight: 300 }}>
                {email}
              </p>
            </div>
          </div>

          <div style={{
            padding: "14px 16px", borderRadius: 12,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            fontSize: 13, color: "var(--text-3)", lineHeight: 1.6,
          }}>
            To update your name, email, or password, visit your{" "}
            <a
              href="https://accounts.clerk.dev/user"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--purple)", textDecoration: "none" }}
            >
              account settings
            </a>
            .
          </div>
        </div>

        {/* More settings coming */}
        <div className="glass" style={{ borderRadius: 20, padding: "32px 32px" }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 20 }}>
            Workspace
          </p>
          <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.7 }}>
            Team management, billing, and YouTube connection settings will appear here once your workspace is set up.
          </p>
        </div>

      </div>
    </main>
  );
}
