import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>

        {/* Logo */}
        <div style={{ marginBottom: 48 }}>
          <span style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 500, fontSize: 22,
            color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em",
          }}>
            Moni<span style={{
              background: "linear-gradient(125deg, #a89fff, #E96BF5)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>tube</span>
          </span>
        </div>

        {/* Welcome */}
        <div className="glass" style={{ borderRadius: 20, padding: "48px 40px" }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "linear-gradient(135deg, #7B6EF6, #E96BF5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, color: "white", fontWeight: 600,
            margin: "0 auto 24px",
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}>
            {user.firstName?.[0] ?? user.emailAddresses[0].emailAddress[0].toUpperCase()}
          </div>

          <h1 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 500, fontSize: 26,
            letterSpacing: "-0.03em", color: "rgba(255,255,255,0.96)",
            marginBottom: 12,
          }}>
            You&apos;re in, {user.firstName ?? "there"}.
          </h1>

          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.65 }}>
            Your dashboard is being built. Come back soon — this is where you&apos;ll manage your team, track performance, and run your channel with real data.
          </p>

          <div style={{
            marginTop: 32, padding: "16px 20px", borderRadius: 12,
            background: "rgba(123,110,246,0.08)", border: "1px solid rgba(123,110,246,0.18)",
            fontSize: 12, color: "rgba(255,255,255,0.4)",
            fontFamily: "'DM Mono', monospace", fontWeight: 300,
          }}>
            Signed in as {user.emailAddresses[0].emailAddress}
          </div>
        </div>
      </div>
    </main>
  );
}
