"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const problems = [
  {
    n: "01",
    hook: "Paying your team fairly is harder than it looks.",
    body: "Bonus decisions are stressful when they're based on a feeling. You want your team to feel recognized and rewarded for what they actually contributed — but without real numbers, every payout is a judgment call. That uncertainty is uncomfortable for you, and your team feels it too.",
  },
  {
    n: "02",
    hook: "You're growing, but you don't know what's actually driving it.",
    body: "Your retention is up. Your views are climbing. But which editor? Which thumbnail style? Which script format? You can celebrate a trend without understanding what caused it — which means you can't deliberately repeat it, and you don't know who to credit.",
  },
  {
    n: "03",
    hook: "An underperformer can coast for two months before you notice.",
    body: "Nobody's pulling weekly retention reports for each team member. A bad stretch can go unnoticed for six to eight weeks before it shows in your channel numbers. By then you've paid for it twice — in invoices, and in content that underperformed.",
  },
  {
    n: "04",
    hook: "There's no record of who built what.",
    body: "Which editor drove your best month? Who's improved the most over the past six months? Without a log, those answers live in your head at best — and every bonus conversation, every rate negotiation, and every promotion decision starts from memory.",
  },
];

export default function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="problem" className="px-4" ref={ref}
      style={{ borderTop: "1px solid var(--glass-border)", paddingTop: 96, paddingBottom: 0 }}>
      <div className="max-w-6xl mx-auto">

        {/* Section headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingBottom: 80 }}
        >
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(38px, 6vw, 76px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "var(--text-1)",
            maxWidth: 680,
          }}>
            Running your team<br />
            on instinct only<br />
            works{" "}
            <span className="g-text">for so long.</span>
          </h2>
        </motion.div>

        {/* Problem rows */}
        <div style={{ borderTop: "1px solid var(--glass-border)" }}>
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-default"
              style={{
                borderBottom: "1px solid var(--glass-border)",
                padding: "36px 0",
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                gap: "32px",
                alignItems: "start",
                transition: "background 0.25s",
                marginLeft: -16,
                marginRight: -16,
                paddingLeft: 16,
                paddingRight: 16,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(123,110,246,0.025)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {/* Number */}
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-3)",
                fontWeight: 300,
                paddingTop: 5,
              }}>
                {p.n}
              </div>

              {/* Hook */}
              <h3 style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(17px, 2.2vw, 22px)",
                lineHeight: 1.2,
                letterSpacing: "-0.025em",
                color: "var(--text-1)",
              }}>
                {p.hook}
              </h3>

              {/* Explanation */}
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-2)", fontWeight: 300, paddingTop: 3 }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bridge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{ padding: "64px 0 96px" }}
        >
          <p style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(20px, 3vw, 30px)",
            lineHeight: 1.3,
            letterSpacing: "-0.025em",
            color: "var(--text-2)",
            maxWidth: 560,
          }}>
            Monitube handles it all —{" "}
            <Link href="#how-it-works" style={{ color: "var(--text-1)", textDecoration: "none", borderBottom: "1px solid rgba(123,110,246,0.4)" }}>
              here's how it works.
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
