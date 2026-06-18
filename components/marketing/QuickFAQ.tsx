"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
  {
    q: "Does my team have to pay anything?",
    a: "No. Team members are always free. You're the only one who pays — and only if you want Pro features. Every editor, writer, and designer on your team signs up and builds their profile at no cost.",
  },
  {
    q: "How does it actually get my YouTube data?",
    a: "You connect once through Google OAuth — the same secure process you use to sign into anything with Google. After that, Monitube pulls your stats automatically. Views, retention, CTR, watch time. You never enter a number manually.",
  },
  {
    q: "Can I actually base bonus decisions on this?",
    a: "That's the whole point. You set a formula — say, \"$20 for every 1% above your channel average.\" Monitube watches the data, calculates it automatically, and notifies you when someone's earned it. No more conversations based on gut feeling.",
  },
  {
    q: "I only have 2-3 people. Is it worth it?",
    a: "That's actually the sweet spot. With a small team, you'll immediately see who's driving better retention and who's fallen behind — and those conversations are easier when you have numbers, not opinions. The smaller the team, the more each person matters.",
  },
  {
    q: "Is my channel data kept private?",
    a: "Completely. Your dashboard, your team's stats, your private notes — none of it is visible outside your account. Team members can only see their own performance. Nothing is shared publicly without your explicit permission.",
  },
  {
    q: "I've tried spreadsheets. Why is this different?",
    a: "Spreadsheets break because you have to maintain them. Monitube connects directly to YouTube's API — it updates itself. You set it up once and it runs indefinitely. When someone publishes a new video, the stats flow in automatically.",
  },
];

function FAQRow({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderBottom: "1px solid var(--glass-border)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left cursor-pointer"
        style={{ padding: "22px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, background: "none", border: "none" }}
        aria-expanded={open}
      >
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: "-0.02em", color: "var(--text-1)", lineHeight: 1.3 }}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink: 0, width: 24, height: 24, borderRadius: 8, background: open ? "var(--gradient)" : "var(--glass-mid)", border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ paddingBottom: 24, fontSize: 14, lineHeight: 1.7, color: "var(--text-2)", fontWeight: 300 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function QuickFAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="px-4" ref={ref}
      style={{
        borderTop: "1px solid var(--glass-border)",
        paddingTop: 96,
        paddingBottom: 96,
      }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(32px, 4.5vw, 54px)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "var(--text-1)",
              marginBottom: 20,
            }}>
              Questions you<br />
              probably have.
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-2)", fontWeight: 300, lineHeight: 1.65, maxWidth: 320 }}>
              The things most people ask before signing up — answered straight.
            </p>
          </motion.div>

          {/* Right: accordion */}
          <div style={{ borderTop: "1px solid var(--glass-border)" }}>
            {faqs.map((f, i) => (
              <FAQRow key={f.q} q={f.q} a={f.a} delay={0.05 + i * 0.05} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
