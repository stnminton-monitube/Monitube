"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

function Check({ color = "var(--success)" }: { color?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2, color: "var(--text-3)" }}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="cta" className="px-4" ref={ref}
      style={{ borderTop: "1px solid var(--glass-border)", paddingTop: 96, paddingBottom: 96 }}>
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64 }}
        >
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 5.5vw, 68px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "var(--text-1)",
          }}>
            Pick your plan.
            <br />
            <span className="g-text">Start today.</span>
          </h2>
          <p style={{ marginTop: 16, fontSize: 15, color: "var(--text-2)", fontWeight: 300 }}>
            Your team members always pay nothing. You only pay for the management tools.
          </p>
        </motion.div>

        {/* Three pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16" style={{ alignItems: "stretch" }}>

          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-7 flex flex-col"
          >
            <div style={{ minHeight: 158 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20, color: "var(--text-3)", fontWeight: 500, fontFamily: "var(--font-mono)" }}>Free</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 4 }}>
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, color: "var(--text-1)", lineHeight: 1, fontSize: 44 }}>$5</span>
                <span style={{ fontSize: 13, marginBottom: 4, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>/mo</span>
              </div>
              <p style={{ fontSize: 12, marginBottom: 6, color: "var(--text-2)", fontWeight: 300 }}>
                For small channels testing the waters.
              </p>
              <p style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                Team members always free
              </p>
            </div>
            <Link href="/sign-up" className="btn-outline w-full mb-6 justify-center"
              style={{ display: "flex", borderRadius: 10, padding: "11px 16px", fontSize: 13 }}>
              Get started
            </Link>
            <ul className="flex flex-col gap-2.5 flex-1">
              {[
                "1 channel · up to 5 members",
                "YouTube API auto-sync",
                "Video credit system",
                "Role-based analytics",
                "Team member profiles",
              ].map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <Check />
                  <span style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 300 }}>{f}</span>
                </li>
              ))}
              {["AI features", "Bonus tracking", "Performance log"].map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <Cross />
                  <span style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 300 }}>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-7 flex flex-col relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(123,110,246,0.15), rgba(233,107,245,0.07))",
              border: "1px solid rgba(123,110,246,0.32)",
              boxShadow: "var(--glow-sm), var(--shadow-lg)",
            }}
          >
            <div aria-hidden className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(123,110,246,0.22) 0%, transparent 70%)" }} />

            <div style={{ minHeight: 158, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", fontWeight: 500, fontFamily: "var(--font-mono)" }}>Pro</div>
                <span style={{ fontSize: 10, padding: "4px 10px", borderRadius: 100, background: "var(--gradient)", color: "white", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-mono)" }}>
                  Most popular
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 4 }}>
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, color: "white", lineHeight: 1, fontSize: 44 }}>$50</span>
                <span style={{ fontSize: 13, marginBottom: 4, color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-mono)" }}>/mo</span>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.48)", fontWeight: 300 }}>
                For channels running a real team.
              </p>
            </div>
            <Link href="/sign-up?plan=pro"
              className="btn-cta w-full mb-6 relative justify-center"
              style={{ display: "flex", borderRadius: 10, padding: "11px 16px", fontSize: 13, boxShadow: "var(--glow-sm)" }}>
              Start free trial
            </Link>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, color: "rgba(255,255,255,0.25)", position: "relative", fontFamily: "var(--font-mono)" }}>
              Everything in Free, plus
            </div>
            <ul className="flex flex-col gap-2.5 flex-1 relative">
              {[
                "Up to 100 team members",
                "AI chat — ask anything",
                "AI performance summaries",
                "Bonus & target tracking",
                "Private performance log",
                "Bi-weekly AI email reports",
                "Trend charts & CSV export",
                "Priority support",
              ].map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <Check color="#a89fff" />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.58)", fontWeight: 300 }}>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Lifetime — gold/amber treatment, clearly a different tier */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-7 flex flex-col relative overflow-hidden"
            style={{
              background: "linear-gradient(155deg, rgba(18, 13, 6, 0.98), rgba(28, 20, 4, 0.95))",
              border: "1px solid rgba(212,160,23,0.4)",
              boxShadow: "0 0 60px rgba(212,160,23,0.07), var(--shadow-lg)",
            }}
          >
            {/* Gold shimmer top edge */}
            <div aria-hidden className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.8), rgba(255,210,80,0.5), transparent)" }} />
            {/* Warm glow */}
            <div aria-hidden className="absolute -bottom-16 -right-16 w-56 h-56 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(212,160,23,0.1) 0%, transparent 65%)" }} />
            <div aria-hidden className="absolute -top-10 -left-10 w-44 h-44 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 65%)" }} />

            <div style={{ minHeight: 158, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(212,160,23,0.6)", fontWeight: 500, fontFamily: "var(--font-mono)" }}>Lifetime</div>
                <span style={{ fontSize: 10, padding: "4px 10px", borderRadius: 100, background: "rgba(212,160,23,0.12)", color: "#D4A017", border: "1px solid rgba(212,160,23,0.3)", fontWeight: 500, fontFamily: "var(--font-mono)" }}>
                  Pay once
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 4 }}>
                <span style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 500, lineHeight: 1, fontSize: 44,
                  background: "linear-gradient(125deg, #F5C842, #D4A017)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  $750
                </span>
              </div>
              <div style={{ fontSize: 12, marginBottom: 4, color: "#D4A017", fontFamily: "var(--font-mono)", fontWeight: 300 }}>
                own it forever
              </div>
              <p style={{ fontSize: 11, color: "rgba(212,160,23,0.4)", fontWeight: 300, fontFamily: "var(--font-mono)" }}>
                ≈ Pro plan paid off in 15 months
              </p>
            </div>

            <Link href="/sign-up?plan=lifetime"
              className="w-full mb-6 relative justify-center transition-all duration-200"
              style={{
                display: "flex", alignItems: "center",
                borderRadius: 10, padding: "11px 16px", fontSize: 13,
                background: "rgba(212,160,23,0.12)",
                border: "1px solid rgba(212,160,23,0.35)",
                color: "#D4A017",
                fontWeight: 500,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,160,23,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(212,160,23,0.12)")}>
              Get lifetime access
            </Link>

            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, color: "rgba(212,160,23,0.35)", position: "relative", fontFamily: "var(--font-mono)" }}>
              Everything in Pro, plus
            </div>
            <ul className="flex flex-col gap-2.5 flex-1 relative">
              {[
                "Never pay again — ever",
                "All future features included",
                "Priority support forever",
                "Early access to new releases",
              ].map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <Check color="#D4A017" />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Final CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl text-center overflow-hidden"
          style={{ padding: "72px 48px", background: "var(--glass-low)", border: "1px solid var(--glass-border-hi)" }}
        >
          <div aria-hidden className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(123,110,246,0.1) 0%, transparent 55%)" }} />
          <div className="relative">
            <h3 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(28px, 4vw, 46px)",
              letterSpacing: "-0.04em",
              color: "var(--text-1)",
              lineHeight: 1.05,
              marginBottom: 16,
            }}>
              Know your team.<br />
              <span className="g-text">Run your channel better.</span>
            </h3>
            <p style={{ fontSize: 15, marginBottom: 40, color: "var(--text-2)", fontWeight: 300, maxWidth: 400, margin: "0 auto 40px" }}>
              Connect your channel and see your team's real performance in under 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/sign-up" className="btn-cta"
                style={{ boxShadow: "var(--glow-md)", padding: "15px 36px", fontSize: 15 }}>
                Get started →
              </Link>
              <Link href="/faq" className="btn-outline" style={{ padding: "15px 36px", fontSize: 15 }}>
                Read the FAQ
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
              {["Team members always free", "Cancel anytime", "Plans start at $5/mo"].map((note) => (
                <span key={note} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {note}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
