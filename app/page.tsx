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

function IconKanban() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="4" width="7" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12.5" y="4" width="7" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="21" y="4" width="7" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconMoney() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="7" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h3M26 12h3M3 20h3M26 20h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 27c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSpreadsheet() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="3" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 9h22M3 15h22M10 9v16M18 9v16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconVenmo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="6" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 14h4M16 14h4M8 18h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="20" cy="8" r="4" fill="#E96BF5" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M19 8l1 1 2-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconNoProof() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="4" y1="4" x2="24" y2="24" stroke="#E96BF5" strokeWidth="1.5" strokeLinecap="round" />
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
          alignItems: "center",
          justifyContent: "center",
          padding: "140px 24px 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120%",
            height: "80%",
            background:
              "radial-gradient(ellipse at center, rgba(123,110,246,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 800, textAlign: "center", position: "relative" }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              ...heading,
              fontSize: "clamp(40px, 7vw, 72px)",
              color: "var(--text-1)",
              marginBottom: 24,
            }}
          >
            Run your YouTube team{" "}
            <span className="g-text">like a business</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontSize: "clamp(16px, 2.2vw, 19px)",
              color: "var(--text-2)",
              lineHeight: 1.65,
              maxWidth: 600,
              margin: "0 auto 40px",
            }}
          >
            Monitube is the operating system for YouTube creators — manage
            projects, track payments, and give your team verified portfolios.
            All in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/sign-up" className="btn-cta" style={{ fontSize: 15, padding: "16px 32px" }}>
              Get started
            </Link>
            <a href="#how-it-works" className="btn-outline" style={{ fontSize: 15, padding: "16px 32px" }}>
              See how it works
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROBLEM                                                     */}
      {/* ============================================================ */}
      <section
        id="problem"
        style={{ padding: "100px 24px 120px", maxWidth: 1100, margin: "0 auto" }}
      >
        <FadeIn>
          <h2
            style={{
              ...heading,
              fontSize: "clamp(28px, 4.5vw, 42px)",
              textAlign: "center",
              marginBottom: 60,
              color: "var(--text-1)",
            }}
          >
            You&apos;re running a team with{" "}
            <span className="g-text">spreadsheets&nbsp;and&nbsp;DMs</span>
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {[
            {
              icon: <IconSpreadsheet />,
              text: "You track video assignments in a Google Sheet that nobody updates",
            },
            {
              icon: <IconVenmo />,
              text: "You Venmo your editor and forget what you paid last month",
            },
            {
              icon: <IconNoProof />,
              text: "Your editor can’t prove they worked on your channel when applying for other work",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="glass"
                style={{
                  borderRadius: 16,
                  padding: "36px 28px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <div style={{ color: "var(--text-2)" }}>{item.icon}</div>
                <p
                  style={{
                    fontSize: 16,
                    color: "var(--text-2)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  THREE PILLARS                                                */}
      {/* ============================================================ */}
      <section
        id="how-it-works"
        style={{ padding: "100px 24px 120px", maxWidth: 1100, margin: "0 auto" }}
      >
        <FadeIn>
          <h2
            style={{
              ...heading,
              fontSize: "clamp(28px, 4.5vw, 42px)",
              textAlign: "center",
              marginBottom: 16,
              color: "var(--text-1)",
            }}
          >
            Three tools. <span className="g-text">One dashboard.</span>
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-2)",
              fontSize: 17,
              marginBottom: 60,
              maxWidth: 480,
              margin: "0 auto 60px",
            }}
          >
            Everything your team needs, nothing it doesn&apos;t.
          </p>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {[
            {
              icon: <IconKanban />,
              title: "Projects",
              tagline: "See every video from idea to published",
              points: [
                "Kanban pipeline with drag-and-drop",
                "Assign team members to each video",
                "Set deadlines, track revisions, know where everything stands",
              ],
            },
            {
              icon: <IconMoney />,
              title: "Pay",
              tagline: "Know exactly what you’re spending",
              points: [
                "Pay calculator with real industry rates",
                "Log every payment — per video, monthly, or revenue share",
                "See your total team cost vs channel revenue",
              ],
            },
            {
              icon: <IconProfile />,
              title: "Profiles",
              tagline: "Verified portfolios for your team",
              points: [
                "Every team member gets a public profile at monitube.work/@name",
                "Owner-verified credits — not self-reported",
                "Real stats from real channels that editors can share when applying for work",
              ],
            },
          ].map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.12}>
              <div
                className="glass"
                style={{
                  borderRadius: 20,
                  padding: "44px 40px",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "rgba(123,110,246,0.08)",
                      border: "1px solid rgba(123,110,246,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#7B6EF6",
                      flexShrink: 0,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        ...heading,
                        fontSize: 24,
                        color: "var(--text-1)",
                        marginBottom: 2,
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: 15, color: "var(--text-2)" }}>
                      {feature.tagline}
                    </p>
                  </div>
                </div>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, paddingLeft: 0 }}>
                  {feature.points.map((pt) => (
                    <li
                      key={pt}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 15,
                        color: "var(--text-2)",
                        lineHeight: 1.55,
                      }}
                    >
                      <span style={{ flexShrink: 0, marginTop: 2 }}>
                        <IconCheck />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHO IT'S FOR                                                 */}
      {/* ============================================================ */}
      <section style={{ padding: "100px 24px 120px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <h2
            style={{
              ...heading,
              fontSize: "clamp(28px, 4.5vw, 42px)",
              textAlign: "center",
              marginBottom: 60,
              color: "var(--text-1)",
            }}
          >
            Built for YouTube creators{" "}
            <span className="g-text">who manage a team</span>
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {[
            {
              label: "Just hired your first editor",
              description:
                "You need to figure out fair pay and stay organized — before everything lives in your DMs forever.",
            },
            {
              label: "Running a team of 5–15",
              description:
                "You need a real system before things fall apart. Track who’s doing what, what you’re spending, and who deserves credit.",
            },
          ].map((persona, i) => (
            <FadeIn key={persona.label} delay={i * 0.1}>
              <div
                className="glass"
                style={{
                  borderRadius: 16,
                  padding: "36px 32px",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    ...mono,
                    fontSize: 13,
                    color: "#7B6EF6",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 12,
                  }}
                >
                  Persona {i + 1}
                </p>
                <h3
                  style={{
                    ...heading,
                    fontSize: 22,
                    color: "var(--text-1)",
                    marginBottom: 12,
                  }}
                >
                  {persona.label}
                </h3>
                <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.65 }}>
                  {persona.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PRICING                                                     */}
      {/* ============================================================ */}
      <section
        id="pricing"
        style={{ padding: "100px 24px 120px", maxWidth: 900, margin: "0 auto" }}
      >
        <FadeIn>
          <h2
            style={{
              ...heading,
              fontSize: "clamp(28px, 4.5vw, 42px)",
              textAlign: "center",
              marginBottom: 60,
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
                padding: "40px 32px",
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
              <p
                style={{
                  ...heading,
                  fontSize: 40,
                  color: "var(--text-1)",
                  marginBottom: 4,
                }}
              >
                $0
              </p>
              <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 28 }}>
                free forever — no login needed
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  flex: 1,
                }}
              >
                {[
                  "Pay Calculator",
                  "Pipeline (up to 3 videos, 1 team member)",
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 14,
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
                style={{
                  marginTop: 32,
                  justifyContent: "center",
                  width: "100%",
                }}
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
                padding: "40px 32px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background:
                  "linear-gradient(135deg, rgba(123,110,246,0.08), rgba(233,107,245,0.06))",
                border: "1px solid rgba(123,110,246,0.2)",
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
                    padding: "2px 10px",
                    letterSpacing: "0.02em",
                  }}
                >
                  Recommended
                </span>
              </div>
              <p style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ ...heading, fontSize: 40, color: "var(--text-1)" }}>$5</span>
                <span style={{ fontSize: 14, color: "var(--text-3)" }}>/team member/mo</span>
              </p>
              <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 28 }}>
                A 5-person team = $25/mo
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  flex: 1,
                }}
              >
                {[
                  "Unlimited pipeline videos",
                  "Unlimited team members",
                  "Payment tracking & logging",
                  "Invoicing from team members",
                  "Public verified profiles",
                  "AI team insights",
                  "Priority support",
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 14,
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
                style={{
                  marginTop: 32,
                  justifyContent: "center",
                  width: "100%",
                }}
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
          padding: "120px 24px 140px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "80%",
            background:
              "radial-gradient(ellipse at center, rgba(123,110,246,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <FadeIn>
          <h2
            style={{
              ...heading,
              fontSize: "clamp(28px, 5vw, 48px)",
              color: "var(--text-1)",
              marginBottom: 20,
              position: "relative",
            }}
          >
            Start managing your team{" "}
            <span className="g-text">today</span>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-2)",
              marginBottom: 36,
              position: "relative",
            }}
          >
            Free to start. Upgrade when you need it.
          </p>
          <div style={{ position: "relative" }}>
            <Link
              href="/sign-up"
              className="btn-cta"
              style={{ fontSize: 16, padding: "18px 40px" }}
            >
              Get started
            </Link>
          </div>
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
            {[
              ["Features", "#how-it-works"],
              ["Pricing", "#pricing"],
              ["Sign in", "/sign-in"],
            ].map(([label, href]) => (
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
            &copy; {new Date().getFullYear()} Monitube. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
