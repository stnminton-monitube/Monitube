"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/marketing/Navbar";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const heading: React.CSSProperties = {
  fontFamily: "'Bricolage Grotesque', sans-serif",
  fontWeight: 500,
  letterSpacing: "-0.035em",
  lineHeight: 1.1,
};

const mono: React.CSSProperties = {
  fontFamily: "'DM Mono', monospace",
};

function FadeIn({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG)                                                 */
/* ------------------------------------------------------------------ */

function IconPipeline() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="3" width="6" height="22" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="3" width="6" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="19" y="3" width="6" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconCalculator() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="3" width="20" height="22" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="7" y="6" width="14" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="10" cy="15.5" r="1.2" fill="currentColor" />
      <circle cx="14" cy="15.5" r="1.2" fill="currentColor" />
      <circle cx="18" cy="15.5" r="1.2" fill="currentColor" />
      <circle cx="10" cy="20" r="1.2" fill="currentColor" />
      <circle cx="14" cy="20" r="1.2" fill="currentColor" />
      <circle cx="18" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconPayment() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="6" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 11h22" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 17h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconInvoice() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M7 3h10l6 6v16a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M17 3v6h6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 15h10M9 19h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconBonus() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 25c0-5 4-9 9-9s9 4 9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18 8l2-2M20 6l1.5-0.5" stroke="#7B6EF6" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3.5 8.5L6.5 11.5L12.5 5" stroke="#7B6EF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature card data                                                  */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: <IconPipeline />,
    title: "Pipeline",
    desc: "Track every video from idea to published. Know who’s editing what.",
    color: "#7B6EF6",
  },
  {
    icon: <IconCalculator />,
    title: "Pay Calculator",
    desc: "Industry rates for editors, writers, designers. Stop guessing.",
    color: "#E96BF5",
  },
  {
    icon: <IconPayment />,
    title: "Payment Log",
    desc: "Record every payment. Filter by person, month, or type.",
    color: "#6EE7B7",
  },
  {
    icon: <IconInvoice />,
    title: "Invoices",
    desc: "Professional invoices your team can customize. Organized for tax time.",
    color: "#FBBF24",
  },
  {
    icon: <IconBonus />,
    title: "Bonuses",
    desc: "Set targets. When your editor hits them, you get notified.",
    color: "#F472B6",
  },
  {
    icon: <IconProfile />,
    title: "Verified Profiles",
    desc: "Your team gets a public portfolio backed by real data.",
    color: "#38BDF8",
  },
];

/* ------------------------------------------------------------------ */
/*  Problem statements                                                 */
/* ------------------------------------------------------------------ */

const problems = [
  {
    bold: "You Venmo’d your editor $400 last Tuesday. Can you find that receipt in 6 months?",
    answer: "Monitube logs every payment with dates, amounts, and tax categories.",
  },
  {
    bold: "Your thumbnail designer charges $65. Is that good? Is that terrible?",
    answer: "Our calculator uses real industry data so you never overpay — or underpay.",
  },
  {
    bold: "Your editor’s been on 47 videos. They have zero proof.",
    answer: "Verified profiles let your team prove their work with real channel data.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "160px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "140%",
            height: "80%",
            background:
              "radial-gradient(ellipse at center, rgba(123,110,246,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 860, textAlign: "center", position: "relative" }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              ...heading,
              fontSize: "clamp(36px, 6vw, 72px)",
              color: "var(--text-1)",
              marginBottom: 28,
            }}
          >
            Your YouTube team is costing you money{" "}
            <span className="g-text">you can&apos;t track.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "var(--text-2)",
              lineHeight: 1.7,
              maxWidth: 620,
              margin: "0 auto 44px",
            }}
          >
            Monitube is the command center for channel owners who pay editors,
            designers, and writers &mdash; and need to actually know where
            the money goes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/calculator" className="btn-cta" style={{ fontSize: 15, padding: "16px 32px" }}>
              Try the free calculator
            </Link>
            <a href="#pricing" className="btn-outline" style={{ fontSize: 15, padding: "16px 32px" }}>
              See pricing
            </a>
          </motion.div>
        </div>

        {/* Dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginTop: 72, width: "100%", maxWidth: 680, position: "relative" }}
        >
          <div
            className="glass"
            style={{
              borderRadius: 20,
              padding: "28px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ ...mono, fontSize: 12, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Monthly spending overview
              </span>
              <span style={{ ...mono, fontSize: 12, color: "var(--text-3)" }}>Jun 2026</span>
            </div>

            {/* Bar chart mock */}
            <div style={{ display: "flex", gap: 16, alignItems: "flex-end", height: 100 }}>
              {[
                { label: "Editing", cost: 85, color: "#7B6EF6" },
                { label: "Thumbnails", cost: 40, color: "#E96BF5" },
                { label: "Writing", cost: 25, color: "#6EE7B7" },
                { label: "Motion", cost: 55, color: "#FBBF24" },
              ].map((bar) => (
                <div key={bar.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      width: "100%",
                      height: `${bar.cost}%`,
                      background: bar.color,
                      borderRadius: "6px 6px 2px 2px",
                      opacity: 0.75,
                      minHeight: 8,
                    }}
                  />
                  <span style={{ ...mono, fontSize: 10, color: "var(--text-3)" }}>{bar.label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--glass-border)", paddingTop: 16 }}>
              <div>
                <p style={{ ...mono, fontSize: 11, color: "var(--text-3)", marginBottom: 2 }}>Total cost</p>
                <p style={{ ...heading, fontSize: 22, color: "var(--text-1)" }}>$3,240</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ ...mono, fontSize: 11, color: "var(--text-3)", marginBottom: 2 }}>Est. revenue</p>
                <p style={{ ...heading, fontSize: 22, color: "#6EE7B7" }}>$18,600</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  THE PROBLEM — bold statements                                */}
      {/* ============================================================ */}
      <section style={{ padding: "140px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
          {problems.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div>
                <p
                  style={{
                    ...heading,
                    fontSize: "clamp(22px, 3.5vw, 36px)",
                    color: "var(--text-1)",
                    marginBottom: 16,
                    lineHeight: 1.25,
                  }}
                >
                  {item.bold}
                </p>
                <p
                  style={{
                    fontSize: "clamp(15px, 1.8vw, 18px)",
                    color: "var(--text-2)",
                    lineHeight: 1.65,
                    borderLeft: "2px solid rgba(123,110,246,0.3)",
                    marginLeft: 0,
                    paddingLeft: 20,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURES — 3x2 grid                                         */}
      {/* ============================================================ */}
      <section style={{ padding: "140px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <h2
            style={{
              ...heading,
              fontSize: "clamp(28px, 4.5vw, 48px)",
              textAlign: "center",
              color: "var(--text-1)",
              marginBottom: 16,
            }}
          >
            Everything you need.{" "}
            <span className="g-text">Nothing you don&apos;t.</span>
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-2)",
              fontSize: 17,
              maxWidth: 480,
              margin: "0 auto 64px",
            }}
          >
            Six tools built for YouTube teams. No bloat.
          </p>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.07}>
              <div
                className="glass"
                style={{
                  borderRadius: 18,
                  padding: "36px 30px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${f.color}10`,
                    border: `1px solid ${f.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: f.color,
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    ...heading,
                    fontSize: 20,
                    color: "var(--text-1)",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CALCULATOR PREVIEW                                           */}
      {/* ============================================================ */}
      <section style={{ padding: "140px 24px", maxWidth: 700, margin: "0 auto" }}>
        <FadeIn>
          <h2
            style={{
              ...heading,
              fontSize: "clamp(26px, 4vw, 42px)",
              textAlign: "center",
              color: "var(--text-1)",
              marginBottom: 48,
            }}
          >
            How much should you pay your editor?
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="glass"
            style={{
              borderRadius: 20,
              padding: "40px 36px",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 24 }}>
              <span
                style={{
                  ...mono,
                  fontSize: 12,
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Editor
              </span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-3)" }} />
              <span style={{ ...mono, fontSize: 12, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Standard complexity
              </span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-3)" }} />
              <span style={{ ...mono, fontSize: 12, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Per video
              </span>
            </div>

            <p
              style={{
                ...heading,
                fontSize: "clamp(36px, 5vw, 52px)",
                color: "var(--text-1)",
                marginBottom: 12,
              }}
            >
              $350{" "}
              <span style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--text-3)", fontWeight: 400, letterSpacing: 0 }}>
                per video
              </span>
            </p>

            <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 32 }}>
              That&apos;s{" "}
              <span style={{ color: "var(--text-1)", fontWeight: 500 }}>$2,800/month</span>{" "}
              for 8 videos &mdash;{" "}
              <span style={{ ...mono, color: "#7B6EF6", fontSize: 14 }}>14%</span>{" "}
              of your estimated revenue
            </p>

            <Link
              href="/calculator"
              className="btn-cta"
              style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "16px 28px" }}
            >
              Try the full calculator &mdash; free, no signup
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ============================================================ */}
      {/*  PRICING                                                     */}
      {/* ============================================================ */}
      <section
        id="pricing"
        style={{ padding: "140px 24px", maxWidth: 900, margin: "0 auto" }}
      >
        <FadeIn>
          <h2
            style={{
              ...heading,
              fontSize: "clamp(28px, 4.5vw, 48px)",
              textAlign: "center",
              marginBottom: 64,
              color: "var(--text-1)",
            }}
          >
            Simple pricing
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {/* Free tier */}
          <FadeIn>
            <div
              className="glass"
              style={{
                borderRadius: 20,
                padding: "44px 36px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  ...mono,
                  fontSize: 13,
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 8,
                }}
              >
                Free
              </p>
              <p style={{ ...heading, fontSize: 44, color: "var(--text-1)", marginBottom: 4 }}>
                $0
              </p>
              <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 32 }}>
                free forever &mdash; no credit card
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  flex: 1,
                }}
              >
                {["Pay Calculator", "Pipeline (3 videos, 1 member)"].map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 15,
                      color: "var(--text-2)",
                    }}
                  >
                    <IconCheck />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/calculator"
                className="btn-outline"
                style={{ marginTop: 36, justifyContent: "center", width: "100%" }}
              >
                Try the calculator
              </Link>
            </div>
          </FadeIn>

          {/* Pro tier */}
          <FadeIn delay={0.1}>
            <div
              style={{
                borderRadius: 20,
                padding: "44px 36px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background:
                  "linear-gradient(135deg, rgba(123,110,246,0.1), rgba(233,107,245,0.06))",
                border: "1px solid rgba(123,110,246,0.25)",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <p
                  style={{
                    ...mono,
                    fontSize: 13,
                    color: "#7B6EF6",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Pro
                </p>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#fff",
                    background: "var(--gradient)",
                    borderRadius: 20,
                    padding: "3px 12px",
                    letterSpacing: "0.02em",
                  }}
                >
                  Recommended
                </span>
              </div>
              <p style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                <span style={{ ...heading, fontSize: 44, color: "var(--text-1)" }}>$5</span>
                <span style={{ fontSize: 14, color: "var(--text-3)" }}>/team member/mo</span>
              </p>
              <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 32 }}>
                A 5-person team = $25/mo. Cancel anytime.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  flex: 1,
                }}
              >
                {[
                  "Everything unlimited",
                  "Earnings & spending tracking",
                  "Payment logging",
                  "Invoicing",
                  "Bonuses & targets",
                  "Verified profiles",
                  "Priority support",
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 15,
                      color: "var(--text-2)",
                    }}
                  >
                    <IconCheck />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className="btn-cta"
                style={{ marginTop: 36, justifyContent: "center", width: "100%" }}
              >
                Get started
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                   */}
      {/* ============================================================ */}
      <section
        style={{
          padding: "140px 24px 160px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "80%",
            background:
              "radial-gradient(ellipse at center, rgba(123,110,246,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <FadeIn>
          <h2
            style={{
              ...heading,
              fontSize: "clamp(28px, 5vw, 52px)",
              color: "var(--text-1)",
              marginBottom: 24,
              position: "relative",
              maxWidth: 700,
              margin: "0 auto 24px",
            }}
          >
            Stop running your team on Venmo receipts and Google&nbsp;Sheets.
          </h2>
          <div style={{ position: "relative" }}>
            <Link
              href="/sign-up"
              className="btn-cta"
              style={{ fontSize: 16, padding: "18px 40px" }}
            >
              Get started free
            </Link>
          </div>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-3)",
              marginTop: 20,
              position: "relative",
            }}
          >
            Free forever. Upgrade when you&apos;re ready.
          </p>
        </FadeIn>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer
        style={{
          borderTop: "1px solid var(--glass-border)",
          padding: "40px 24px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <span
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500,
              fontSize: 17,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.02em",
            }}
          >
            Moni<span className="g-text">tube</span>
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {(
              [
                ["Features", "#pricing"],
                ["Calculator", "/calculator"],
                ["Pricing", "#pricing"],
                ["Sign in", "/sign-in"],
              ] as const
            ).map(([label, href]) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontSize: 13,
                  color: "var(--text-3)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-3)")
                }
              >
                {label}
              </Link>
            ))}
          </div>

          <p style={{ fontSize: 12, color: "var(--text-3)" }}>
            &copy; 2026 Monitube. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
