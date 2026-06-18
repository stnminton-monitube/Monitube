"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ paddingTop: 160, paddingBottom: 80 }}>

      {/* === Ambient lighting === */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-80 left-1/2 -translate-x-1/2 w-[1100px] h-[800px]"
          style={{ background: "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(123,110,246,0.18) 0%, transparent 100%)" }} />
        <div className="absolute top-1/4 -left-80 w-[700px] h-[700px]"
          style={{ background: "radial-gradient(ellipse, rgba(123,110,246,0.05) 0%, transparent 65%)" }} />
        <div className="absolute top-1/3 -right-60 w-[600px] h-[600px]"
          style={{ background: "radial-gradient(ellipse, rgba(233,107,245,0.05) 0%, transparent 65%)" }} />
      </div>

      {/* === Copy block === */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">

        <motion.h1
          variants={rise(0.07)} initial="hidden" animate="show"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(48px, 8.5vw, 104px)",
            lineHeight: 0.96,
            letterSpacing: "-0.045em",
            color: "var(--text-1)",
            marginBottom: 32,
          }}
        >
          The analytics your<br />
          YouTube team{" "}
          <span className="g-text">deserves.</span>
        </motion.h1>

        <motion.p
          variants={rise(0.14)} initial="hidden" animate="show"
          style={{
            fontSize: 17, lineHeight: 1.65, color: "var(--text-2)", fontWeight: 300,
            maxWidth: 480, margin: "0 auto 40px",
          }}
        >
          Stop managing your team on gut feeling. See exactly who's driving results — with real retention, CTR, and watch time pulled straight from YouTube.
        </motion.p>

        <motion.div
          variants={rise(0.2)} initial="hidden" animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5"
        >
          <Link href="/sign-up" className="btn-cta" style={{ boxShadow: "var(--glow-sm)", padding: "15px 32px", fontSize: 15 }}>
            Start for free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
          <Link href="#how-it-works" className="btn-outline" style={{ padding: "15px 32px", fontSize: 15 }}>See how it works</Link>
        </motion.div>

        <motion.p variants={rise(0.26)} initial="hidden" animate="show"
          style={{ fontSize: 12, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
          From $5/mo · Team members always free
        </motion.p>
      </div>

      {/* === Two hero cards — equal height === */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-4"
        style={{ alignItems: "stretch", marginTop: 72 }}
      >
        {/* Glow behind cards */}
        <div aria-hidden className="absolute -inset-12 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(123,110,246,0.09) 0%, transparent 70%)", filter: "blur(24px)", borderRadius: "50%" }} />

        {/* === Card A: Team dashboard === */}
        <div className="glass rounded-2xl overflow-hidden flex flex-col"
          style={{ border: "1px solid var(--glass-border-hi)", boxShadow: "var(--shadow-lg), var(--glow-sm)" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
            style={{ borderColor: "var(--glass-border)", background: "var(--glass-faint)" }}>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--success)" }} />
              <span style={{ fontSize: 11, color: "var(--text-2)", fontWeight: 500, fontFamily: "var(--font-mono)" }}>Channel Overview</span>
            </div>
            <span style={{ fontSize: 10, color: "var(--success)", background: "rgba(0,200,150,0.1)", border: "1px solid rgba(0,200,150,0.2)", padding: "2px 8px", borderRadius: 6, fontFamily: "var(--font-mono)" }}>
              Live
            </span>
          </div>

          <div className="p-4 flex flex-col gap-3 flex-1">
            <div className="grid grid-cols-3 gap-2">
              {[["Avg Retention", "63%", "+11pts"], ["Avg CTR", "6.4%", "+1.4pts"], ["Views (30d)", "2.4M", "+18%"]].map(([l, v, d]) => (
                <div key={l} className="rounded-xl p-3.5"
                  style={{ background: "var(--glass-mid)", border: "1px solid var(--glass-border)" }}>
                  <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>{l}</div>
                  <div className="g-text" style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 20, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 10, color: "var(--success)", marginTop: 4, fontFamily: "var(--font-mono)" }}>{d}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl overflow-hidden flex flex-col flex-1"
              style={{ border: "1px solid var(--glass-border)", background: "var(--glass-faint)" }}>
              <div className="px-3.5 py-2.5 border-b flex items-center justify-between"
                style={{ borderColor: "var(--glass-border)" }}>
                <span style={{ fontSize: 10, color: "var(--text-2)", fontWeight: 500 }}>Team performance</span>
                <span style={{ fontSize: 10, color: "var(--purple)", fontFamily: "var(--font-mono)" }}>This month</span>
              </div>
              {[
                { n: "Jake Morrison",  r: "Editor",    v: "64%",  l: "retention", d: "+12pts", g: true  },
                { n: "Sofia Chen",     r: "Thumbnail", v: "8.1%", l: "CTR",       d: "+2.3pts",g: true  },
                { n: "Marcus Lee",     r: "Writer",    v: "52%",  l: "retention", d: "−4pts",  g: false },
                { n: "Priya Nair",     r: "Editor",    v: "59%",  l: "retention", d: "+7pts",  g: true  },
              ].map((row) => (
                <div key={row.n}
                  className="px-3.5 py-2.5 border-b flex items-center justify-between cursor-default"
                  style={{ borderColor: "var(--glass-border)", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(123,110,246,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <div className="flex items-center gap-2.5">
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%", background: "var(--gradient)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, color: "white", fontWeight: 600, flexShrink: 0, fontFamily: "var(--font-mono)",
                    }}>
                      {row.n.split(" ").map(x => x[0]).join("")}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 500, color: "var(--text-1)" }}>{row.n}</div>
                      <div style={{ fontSize: 9, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>{row.r}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "var(--text-1)", fontFamily: "var(--font-mono)" }}>{row.v} <span style={{ fontSize: 9, color: "var(--text-3)" }}>{row.l}</span></div>
                    <div style={{ fontSize: 9, color: row.g ? "var(--success)" : "var(--pink)", fontFamily: "var(--font-mono)" }}>{row.d} vs avg</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === Card B: AI Chat === */}
        <div className="glass rounded-2xl overflow-hidden flex flex-col"
          style={{ border: "1px solid var(--glass-border-hi)", boxShadow: "var(--shadow-lg), var(--glow-sm)" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
            style={{ borderColor: "var(--glass-border)", background: "var(--glass-faint)" }}>
            <div className="flex items-center gap-2.5">
              <div style={{ width: 20, height: 20, borderRadius: 7, background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <span style={{ fontSize: 11, color: "var(--text-2)", fontWeight: 500 }}>AI Assistant</span>
            </div>
            <span style={{ fontSize: 10, color: "var(--purple)", fontFamily: "var(--font-mono)", background: "rgba(123,110,246,0.1)", padding: "2px 8px", borderRadius: 6, border: "1px solid rgba(123,110,246,0.2)" }}>Pro</span>
          </div>

          <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
            {[
              { u: true,  t: "Who had the best month?" },
              { u: false, t: "Jake Morrison. 64% avg retention across 5 videos — 12pts above your channel average. His last 3 uploads all outperformed your historical top videos. He's earned a bonus conversation." },
              { u: true,  t: "Why is Marcus underperforming?" },
              { u: false, t: "His retention dropped 8pts over 6 weeks. It tracks with longer scripts — 15-min videos average 44% vs 61% on his shorter cuts. Worth a format conversation before reading it as effort." },
            ].map((m, i) => (
              <div key={i} className={`flex ${m.u ? "justify-end" : "gap-2"}`}>
                {!m.u && (
                  <div style={{ width: 22, height: 22, borderRadius: 7, background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                )}
                <div style={{
                  maxWidth: "82%", padding: "9px 13px", borderRadius: 12, fontSize: 11.5, lineHeight: 1.6, fontWeight: 300,
                  background: m.u ? "rgba(123,110,246,0.14)" : "var(--glass-mid)",
                  border: `1px solid ${m.u ? "rgba(123,110,246,0.22)" : "var(--glass-border)"}`,
                  color: "var(--text-1)",
                }}>
                  {m.t}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pb-4 flex-shrink-0">
            <div style={{
              background: "rgba(123,110,246,0.07)", border: "1px solid rgba(123,110,246,0.18)",
              borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: 10,
            }}>
              <div style={{ width: 20, height: 20, borderRadius: 7, background: "rgba(123,110,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 500, color: "var(--purple)", marginBottom: 2, fontFamily: "var(--font-mono)" }}>Bonus threshold hit</div>
                <div style={{ fontSize: 11, color: "var(--text-2)", fontWeight: 300 }}>
                  Jake exceeded 60% retention target — suggested bonus:{" "}
                  <span style={{ color: "var(--text-1)", fontWeight: 500, fontFamily: "var(--font-mono)" }}>$120</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span style={{ fontSize: 10, color: "var(--text-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--text-3)" }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
