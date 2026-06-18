"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const featured = {
  quote: "I used to dread bonus conversations. Now I just open Monitube and show the numbers. Takes five minutes. Everyone agrees.",
  name: "Tom Baxter",
  role: "Channel Owner",
  stats: "4.3M subscribers",
  initials: "TB",
};

const supporting = [
  {
    quote: "I used to guess which editor was responsible for my best videos. Now I know exactly. Three of my top-performing months traced directly back to one person — I gave them a raise they completely deserved.",
    name: "Chris Delmonte",
    role: "Channel Owner · 2.1M subs",
    initials: "CD",
  },
  {
    quote: "The AI flagged that my best editor hadn't been credited in three weeks. I hadn't noticed. Without Monitube I would have lost him — and probably didn't even know why he left.",
    name: "Marcus Webb",
    role: "Channel Owner · 850K subs",
    initials: "MW",
  },
  {
    quote: "I was paying two editors the same rate. Monitube showed me one was consistently hitting 65% retention and the other was averaging 48%. That's not the same job. We fixed it.",
    name: "Leila Rashid",
    role: "Channel Owner · 1.6M subs",
    initials: "LR",
  },
];

export default function Proof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="proof" className="px-4" ref={ref}
      style={{
        borderTop: "1px solid var(--glass-border)",
        paddingTop: 96,
        paddingBottom: 96,
      }}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 24 }}
        >
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-3)", fontFamily: "var(--font-mono)", marginBottom: 48 }}>
            What owners say
          </p>

          {/* Featured quote */}
          <div style={{ maxWidth: 760 }}>
            <div style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(22px, 3.5vw, 44px)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "var(--text-1)",
              marginBottom: 36,
            }}>
              <span className="g-text" style={{ fontSize: "1.4em", lineHeight: 0.5, verticalAlign: "middle", marginRight: 8, display: "inline-block", marginBottom: -8 }}>"</span>
              {featured.quote}
              <span className="g-text" style={{ fontSize: "1.4em", lineHeight: 0.5, verticalAlign: "middle", marginLeft: 8, display: "inline-block", marginBottom: -8 }}>"</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "white", fontWeight: 600, fontFamily: "var(--font-mono)", flexShrink: 0 }}>
                {featured.initials}
              </div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 16, color: "var(--text-1)", letterSpacing: "-0.02em" }}>
                  {featured.name}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", fontWeight: 300 }}>
                  {featured.role} · {featured.stats}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supporting quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginTop: 56 }}>
          {supporting.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-6 cursor-default"
              style={{ transition: "background 0.2s, border-color 0.2s" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "var(--glass-mid)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--glass-border-hi)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "var(--glass-low)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--glass-border)";
              }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                {Array(5).fill(0).map((_, j) => (
                  <svg key={j} width="10" height="10" viewBox="0 0 24 24" fill="#7B6EF6" opacity="0.6">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--text-2)", fontWeight: 300, marginBottom: 20 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white", fontWeight: 600, fontFamily: "var(--font-mono)", flexShrink: 0 }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text-1)" }}>{t.name}</div>
                  <div style={{ fontSize: 10, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
