"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const FAQ_ITEMS = [
  {
    q: "How much should I pay a YouTube editor?",
    a: "Most YouTube editors charge $100–$600 per video for standard content, or $1,500–$5,000/month on a retainer. The rate depends on video complexity, your channel size, and the editor's experience. Channels with under 100K views per video typically pay on the lower end, while high-production channels pay premium rates.",
  },
  {
    q: "What's the difference between per-video and monthly pay?",
    a: "Per-video pay is a flat fee for each edit — simple and predictable, best when you upload irregularly or are testing a new editor. Monthly retainers give your editor income stability and usually work out cheaper per video once you hit a consistent upload schedule of 4+ videos per month.",
  },
  {
    q: "Should I pay my editor a revenue share?",
    a: "Revenue share (typically 5–15% of AdSense) aligns incentives — your editor earns more when videos perform well. It works best for established channels with predictable revenue. Many top creators pair a small base rate with a revenue share so the editor has stability plus upside.",
  },
  {
    q: "How much do thumbnail designers charge?",
    a: "Thumbnail designers typically charge $20–$100 per thumbnail, or $500–$2,000/month on retainer. High-end designers who specialize in A/B testing and CTR optimization can charge more. Given how much thumbnails impact click-through rate, this is often the highest-ROI hire on a YouTube team.",
  },
  {
    q: "When should I switch from per-video to a monthly retainer?",
    a: "Switch to a retainer once you're uploading on a consistent weekly schedule and plan to keep that pace. Retainers give your editor financial stability, which builds loyalty and reduces turnover. Most channels make the switch around 4–8 videos per month.",
  },
  {
    q: "How do I know if I'm overpaying my editor?",
    a: "A healthy benchmark is spending 10–20% of your channel's revenue on editing. If you're above 30%, consider whether the quality justifies the cost, or explore a hybrid model with a lower base plus revenue share. Sign up free to use the calculator and compare your spend against industry rates.",
  },
];

const heading: React.CSSProperties = {
  fontFamily: "'Bricolage Grotesque', sans-serif",
  fontWeight: 500,
  letterSpacing: "-0.035em",
  lineHeight: 1.1,
};

export default function PublicCalculatorPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (isLoaded && isSignedIn) {
    router.push("/dashboard/calculator");
    return null;
  }

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ paddingTop: 140, paddingBottom: 80, textAlign: "center" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
            <h1 style={{ ...heading, fontSize: "clamp(32px, 5vw, 52px)", color: "var(--text-1)", marginBottom: 16 }}>
              How much should you pay your YouTube editor?
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-2)", fontWeight: 300, lineHeight: 1.6, marginBottom: 40 }}>
              Our calculator uses real industry data from 2024–2026 to help you figure out fair rates for editors, writers, thumbnail designers, and more. Compare per-video, monthly retainer, revenue share, and hybrid models.
            </p>
          </div>
        </section>

        {/* Locked calculator preview */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
            <div className="glass" style={{ borderRadius: 20, padding: "48px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              {/* Blurred mock calculator */}
              <div style={{ filter: "blur(6px)", opacity: 0.4, pointerEvents: "none", marginBottom: 32 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {["Videos/month", "RPM", "Avg views"].map(label => (
                    <div key={label} style={{ background: "var(--glass-low)", borderRadius: 12, padding: "12px 16px", border: "1px solid var(--glass-border)" }}>
                      <p style={{ fontSize: 10, color: "var(--text-3)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
                      <p style={{ fontSize: 18, color: "var(--text-1)", fontFamily: "'DM Mono', monospace" }}>—</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
                  {["Editor", "Lead Editor", "Designer", "Writer"].map(r => (
                    <span key={r} style={{ padding: "6px 14px", borderRadius: 10, background: "var(--glass-mid)", fontSize: 12, color: "var(--text-2)" }}>{r}</span>
                  ))}
                </div>
                <div style={{ background: "var(--glass-low)", borderRadius: 16, padding: 24, border: "1px solid var(--glass-border)" }}>
                  <p style={{ fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Suggested Pay</p>
                  <p style={{ fontSize: 36, fontWeight: 500, color: "var(--text-1)", fontFamily: "'DM Mono', monospace" }}>$350 per video</p>
                </div>
              </div>

              {/* CTA overlay */}
              <div style={{ position: "relative" }}>
                <p style={{ ...heading, fontSize: 22, color: "var(--text-1)", marginBottom: 8 }}>
                  Create a free account to use the calculator
                </p>
                <p style={{ fontSize: 14, color: "var(--text-2)", fontWeight: 300, marginBottom: 24 }}>
                  Free forever. No credit card required.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <Link href="/sign-up" className="btn-cta" style={{ padding: "14px 32px", fontSize: 14 }}>
                    Sign up free
                  </Link>
                  <Link href="/sign-in" className="btn-outline" style={{ padding: "14px 24px", fontSize: 14 }}>
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ ...heading, fontSize: 24, color: "var(--text-1)", marginBottom: 24, textAlign: "center" }}>
              What the calculator does
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                "Compare 5 roles: Editor, Lead Editor, Assistant Editor, Thumbnail Designer, Scriptwriter",
                "4 payment models: per-video, monthly retainer, revenue share, hybrid",
                "Adjusts for video complexity from basic vlogs to MrBeast-level production",
                "Shows cost as a % of your channel revenue so you know if it's healthy",
                "Industry rate ranges based on real 2024–2026 market data",
                "Pro feature: auto-pulls your RPM and revenue from YouTube",
              ].map((item, i) => (
                <div key={i} className="glass" style={{ borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M3.5 8.5L6.5 11.5L12.5 5" stroke="#7B6EF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontSize: 13, color: "var(--text-2)", fontWeight: 300, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ paddingBottom: 100 }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ ...heading, fontSize: 24, color: "var(--text-1)", marginBottom: 32, textAlign: "center" }}>
              Common questions about YouTube editor pay
            </h2>
            <div>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "20px 0", cursor: "pointer", background: "none", border: "none", textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-1)", paddingRight: 24 }}>{item.q}</span>
                    <span style={{
                      width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      background: openFaq === i ? "var(--gradient)" : "var(--glass-mid)", transition: "transform 0.2s",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  {openFaq === i && (
                    <p style={{ paddingBottom: 20, fontSize: 14, lineHeight: 1.65, color: "var(--text-2)", fontWeight: 300 }}>
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ paddingBottom: 100 }}>
          <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
            <p style={{ ...heading, fontSize: 22, color: "var(--text-1)", marginBottom: 12 }}>
              Stop guessing what to pay.
            </p>
            <p style={{ fontSize: 14, color: "var(--text-2)", fontWeight: 300, marginBottom: 28 }}>
              Free account. Real industry data. Takes 30 seconds.
            </p>
            <Link href="/sign-up" className="btn-cta" style={{ padding: "14px 32px" }}>
              Create free account
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
