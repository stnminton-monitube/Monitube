"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "One dashboard. No spreadsheets.",
    tagline: "Your whole team's performance, always up to date.",
    desc: "Every team member, every video, every stat — in one view, updated automatically from YouTube. You'll never open a spreadsheet to track your team again.",
    wide: true,
    pro: false,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01M12 9v6M9 12h6"/>
      </svg>
    ),
    title: "Real attribution per video",
    tagline: "Every video credited to the right person.",
    desc: "Editors own their retention numbers. Designers own their CTR. No more splitting credit or guessing who drove what. Every stat tied directly to the person responsible.",
    wide: false,
    pro: false,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Bonus formulas that run themselves",
    tagline: "Set a rule once. Get notified when someone earns it.",
    desc: "\"$20 for every 1% above channel average.\" You define it. Monitube watches the data and alerts you when the threshold is hit — with the exact calculation done for you.",
    wide: false,
    pro: true,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "AI that knows your entire team",
    tagline: "Ask anything. Get a specific, data-backed answer.",
    desc: "Not summaries. Not generic advice. Ask \"Who should I give a bonus?\" or \"Why is Marcus underperforming?\" and get a real answer — with names, numbers, and context.",
    wide: false,
    pro: true,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "Private performance log",
    tagline: "Notes the AI actually reads.",
    desc: "Flag good work. Log a rough stretch. Keep timestamped context on every team member — and when you ask the AI for a recommendation, it factors all of it in.",
    wide: false,
    pro: true,
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const heroFeature = features[0];
  const row1 = features.slice(1, 3);
  const row2 = features.slice(3, 5);

  return (
    <section id="benefits" className="px-4" ref={ref}
      style={{
        borderTop: "1px solid var(--glass-border)",
        background: "linear-gradient(180deg, transparent 0%, rgba(123,110,246,0.025) 50%, transparent 100%)",
        paddingTop: 96,
        paddingBottom: 96,
      }}>
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
            maxWidth: 560,
          }}>
            Five things that change<br />
            how you run your channel.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">

          {/* Hero feature — full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl cursor-default"
            style={{
              padding: "40px 44px",
              border: "1px solid var(--glass-border-hi)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 40,
              alignItems: "center",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.background = "var(--glass-mid)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--glass-border-hi)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = "var(--glass-low)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--glass-border)";
            }}
          >
            <div>
              <div style={{ color: "var(--purple)", marginBottom: 16, opacity: 0.8 }}>
                {heroFeature.icon}
              </div>
              <h3 style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(22px, 3vw, 30px)",
                letterSpacing: "-0.025em",
                color: "var(--text-1)",
                marginBottom: 10,
              }}>
                {heroFeature.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-2)", fontWeight: 300, maxWidth: 540 }}>
                {heroFeature.desc}
              </p>
            </div>

            {/* Visual accent */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
              {[
                { label: "Jake", role: "Editor", stat: "64% ret", good: true },
                { label: "Sofia", role: "Thumb", stat: "8.1% CTR", good: true },
                { label: "Marcus", role: "Writer", stat: "52% ret", good: false },
              ].map(r => (
                <div key={r.label} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "8px 14px", borderRadius: 10,
                  background: "var(--glass-mid)", border: "1px solid var(--glass-border)",
                  minWidth: 180,
                }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "white", fontWeight: 600, flexShrink: 0, fontFamily: "var(--font-mono)" }}>
                    {r.label[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "var(--text-1)" }}>{r.label}</div>
                    <div style={{ fontSize: 9, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>{r.role}</div>
                  </div>
                  <div style={{ fontSize: 11, color: r.good ? "var(--success)" : "var(--pink)", fontFamily: "var(--font-mono)", fontWeight: 400 }}>{r.stat}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 1 — 2 equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {row1.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.16 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl cursor-default"
                style={{ padding: "32px 32px 36px", transition: "background 0.2s, border-color 0.2s" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--glass-mid)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--glass-border-hi)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--glass-low)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--glass-border)";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ color: "var(--purple)", opacity: 0.8 }}>{feat.icon}</div>
                  {feat.pro && (
                    <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: "rgba(123,110,246,0.12)", color: "var(--purple)", border: "1px solid rgba(123,110,246,0.22)", fontWeight: 500, fontFamily: "var(--font-mono)" }}>
                      Pro
                    </span>
                  )}
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 19, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: 8 }}>
                  {feat.title}
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 300, marginBottom: 12, fontFamily: "var(--font-mono)" }}>
                  {feat.tagline}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-2)", fontWeight: 300 }}>
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Row 2 — 2 equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {row2.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.28 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl cursor-default"
                style={{ padding: "32px 32px 36px", transition: "background 0.2s, border-color 0.2s" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--glass-mid)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--glass-border-hi)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--glass-low)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--glass-border)";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ color: "var(--purple)", opacity: 0.8 }}>{feat.icon}</div>
                  {feat.pro && (
                    <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: "rgba(123,110,246,0.12)", color: "var(--purple)", border: "1px solid rgba(123,110,246,0.22)", fontWeight: 500, fontFamily: "var(--font-mono)" }}>
                      Pro
                    </span>
                  )}
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 19, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: 8 }}>
                  {feat.title}
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 300, marginBottom: 12, fontFamily: "var(--font-mono)" }}>
                  {feat.tagline}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-2)", fontWeight: 300 }}>
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
