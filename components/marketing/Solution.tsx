"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "Connect once.",
    bullets: [
      "Link your YouTube channel via Google OAuth",
      "Views, retention, CTR, and watch time sync automatically",
      "Every new video is tracked from the moment it goes live",
    ],
  },
  {
    n: "02",
    title: "Credit your team.",
    bullets: [
      "Paste a YouTube URL and assign who worked on it",
      "Set roles: editor gets retention, designer gets CTR",
      "Members can submit credits — you approve before anything logs",
    ],
  },
  {
    n: "03",
    title: "See the truth.",
    bullets: [
      "Every stat shown against your channel average",
      "Spot outliers — who's overperforming, who's falling behind",
      "No spreadsheets. No manual updates. Just the data.",
    ],
  },
  {
    n: "04",
    title: "Make decisions.",
    bullets: [
      "Ask the AI anything about your team",
      "Set bonus formulas — Monitube tells you when they're earned",
      "Hire, promote, and reward with actual evidence",
    ],
  },
];

export default function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" className="px-4" ref={ref}
      style={{
        borderTop: "1px solid var(--glass-border)",
        background: "linear-gradient(180deg, var(--bg-mid) 0%, var(--bg) 100%)",
        paddingTop: 96,
        paddingBottom: 96,
      }}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64 }}
        >
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 5.5vw, 68px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "var(--text-1)",
            maxWidth: 500,
          }}>
            How it works.
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-2)", fontWeight: 300, marginTop: 16, maxWidth: 400, lineHeight: 1.65 }}>
            Connect once. Everything else runs automatically.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ border: "1px solid var(--glass-border)", borderRadius: 20, overflow: "hidden" }}>
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col cursor-default"
              style={{
                padding: "32px 28px 36px",
                background: "var(--glass-faint)",
                borderRight: i < 3 ? "1px solid var(--glass-border)" : "none",
                transition: "background 0.2s",
                gap: 24,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--glass-low)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--glass-faint)")}
            >
              <div className="g-text" style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 400,
                fontSize: 40,
                lineHeight: 1,
              }}>
                {s.n}
              </div>

              <div>
                <h3 style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 500,
                  fontSize: 18,
                  letterSpacing: "-0.02em",
                  color: "var(--text-1)",
                  marginBottom: 16,
                }}>
                  {s.title}
                </h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {s.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--purple)", flexShrink: 0, marginTop: 7, opacity: 0.6 }} />
                      <span style={{ fontSize: 12.5, lineHeight: 1.6, color: "var(--text-2)", fontWeight: 300 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex items-center gap-4"
        >
          <Link href="/sign-up" className="btn-cta" style={{ boxShadow: "var(--glow-sm)" }}>
            Get started free
          </Link>
          <p style={{ fontSize: 12, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
            Team members always free
          </p>
        </motion.div>
      </div>
    </section>
  );
}
