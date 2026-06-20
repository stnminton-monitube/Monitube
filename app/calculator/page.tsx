"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";

/* ------------------------------------------------------------------ */
/*  Metadata (exported from layout or head for client components)      */
/* ------------------------------------------------------------------ */

// SEO metadata is in layout.tsx for this route — see app/calculator/layout.tsx

/* ------------------------------------------------------------------ */
/*  Data & Types                                                       */
/* ------------------------------------------------------------------ */

type PayModel = "per_video" | "monthly" | "revenue_share" | "hybrid";

const ROLE_DATA: Record<
  string,
  {
    label: string;
    perVideoRange: [number, number];
    monthlyRange: [number, number];
    revShareRange: [number, number];
  }
> = {
  editor: {
    label: "Editor",
    perVideoRange: [100, 600],
    monthlyRange: [1500, 5000],
    revShareRange: [5, 15],
  },
  lead_editor: {
    label: "Lead Editor",
    perVideoRange: [250, 1000],
    monthlyRange: [3000, 8000],
    revShareRange: [8, 20],
  },
  assistant_editor: {
    label: "Assistant Editor",
    perVideoRange: [50, 200],
    monthlyRange: [800, 2500],
    revShareRange: [3, 8],
  },
  thumbnail_designer: {
    label: "Thumbnail Designer",
    perVideoRange: [20, 100],
    monthlyRange: [500, 2000],
    revShareRange: [2, 5],
  },
  writer: {
    label: "Scriptwriter",
    perVideoRange: [75, 400],
    monthlyRange: [1200, 4000],
    revShareRange: [5, 12],
  },
};

const COMPLEXITY_MULTIPLIER: Record<
  string,
  { label: string; desc: string; mult: number }
> = {
  basic: {
    label: "Basic",
    desc: "Talking head, minimal cuts, no effects",
    mult: 0.7,
  },
  standard: {
    label: "Standard",
    desc: "Jump cuts, music, light graphics",
    mult: 1.0,
  },
  advanced: {
    label: "Advanced",
    desc: "B-roll, motion graphics, sound design",
    mult: 1.5,
  },
  premium: {
    label: "Premium",
    desc: "MrBeast-level production, heavy VFX",
    mult: 2.5,
  },
};

const FAQ_ITEMS = [
  {
    q: "How much should I pay a YouTube editor?",
    a: "Most YouTube editors charge $100–$600 per video for standard content, or $1,500–$5,000/month on a retainer. The rate depends on video complexity, your channel size, and the editor’s experience. Channels with under 100K views per video typically pay on the lower end, while high-production channels pay premium rates.",
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
    a: "Switch to a retainer once you’re uploading on a consistent weekly schedule and plan to keep that pace. Retainers give your editor financial stability, which builds loyalty and reduces turnover. Most channels make the switch around 4–8 videos per month.",
  },
  {
    q: "How do I know if I'm overpaying my editor?",
    a: "A healthy benchmark is spending 10–20% of your channel’s revenue on editing. If you’re above 30%, consider whether the quality justifies the cost, or explore a hybrid model with a lower base plus revenue share. Use the calculator above to compare your current spend against industry rates.",
  },
];

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

function fmt(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}

function formatViewsInput(value: string): string {
  const num = value.replace(/[^\d]/g, "");
  if (!num) return "";
  return parseInt(num).toLocaleString();
}

function parseViewsInput(value: string): number {
  return parseInt(value.replace(/[^\d]/g, "") || "0");
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 8.5L6.5 11.5L12.5 5"
        stroke="#7B6EF6"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PublicCalculatorPage() {
  const [role, setRole] = useState("editor");
  const [model, setModel] = useState<PayModel>("per_video");
  const [videosPerMonth, setVideosPerMonth] = useState(8);
  const [avgRpm, setAvgRpm] = useState(4);
  const [avgViews, setAvgViews] = useState(100000);
  const [viewsInput, setViewsInput] = useState("100,000");
  const [complexity, setComplexity] = useState("standard");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const roleInfo = ROLE_DATA[role];
  const comp = COMPLEXITY_MULTIPLIER[complexity];

  const revenuePerVideo = (avgViews / 1000) * avgRpm;
  const monthlyRevenue = revenuePerVideo * videosPerMonth;

  let suggestedPay = 0;
  let payLabel = "";
  let payContext = "";

  if (model === "per_video") {
    const base =
      (roleInfo.perVideoRange[0] + roleInfo.perVideoRange[1]) / 2;
    suggestedPay = base * comp.mult;
    const monthlyTotal = suggestedPay * videosPerMonth;
    payLabel = `${fmt(suggestedPay)} per video`;
    payContext = `That’s ${fmt(monthlyTotal)}/month for ${videosPerMonth} videos — ${((monthlyTotal / monthlyRevenue) * 100).toFixed(1)}% of your estimated revenue.`;
  } else if (model === "monthly") {
    const base =
      (roleInfo.monthlyRange[0] + roleInfo.monthlyRange[1]) / 2;
    suggestedPay = base * comp.mult;
    const perVideo = suggestedPay / videosPerMonth;
    payLabel = `${fmt(suggestedPay)} per month`;
    payContext = `That’s ${fmt(perVideo)} per video — ${((suggestedPay / monthlyRevenue) * 100).toFixed(1)}% of your estimated monthly revenue.`;
  } else if (model === "revenue_share") {
    const pct =
      (roleInfo.revShareRange[0] + roleInfo.revShareRange[1]) / 2;
    suggestedPay = (pct / 100) * monthlyRevenue;
    payLabel = `${pct.toFixed(0)}% of revenue`;
    payContext = `At your current views, that’s roughly ${fmt(suggestedPay)}/month. Scales up or down with performance — ${role === "editor" ? "editors" : "team members"} are incentivized to do great work.`;
  } else if (model === "hybrid") {
    const flatBase = roleInfo.perVideoRange[0] * comp.mult * 0.6;
    const pct = roleInfo.revShareRange[0] + 2;
    const commissionPart = (pct / 100) * monthlyRevenue;
    suggestedPay = flatBase * videosPerMonth + commissionPart;
    payLabel = `${fmt(flatBase)} per video + ${pct}% of revenue`;
    payContext = `The flat fee gives them stability. The commission rewards performance. Total estimated: ${fmt(suggestedPay)}/month.`;
  }

  const teamCostPct = (suggestedPay / monthlyRevenue) * 100;
  const costPer1kViews =
    avgViews > 0 ? suggestedPay / (avgViews / 1000) : 0;

  /* -- Inline input styles for the dark theme -- */
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid var(--glass-border-hi)",
    background: "var(--glass-low)",
    color: "var(--text-1)",
    fontSize: 14,
    fontFamily: "'DM Mono', monospace",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    color: "var(--text-2)",
    fontWeight: 500,
    marginBottom: 6,
  };

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section
        style={{
          padding: "140px 24px 60px",
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120%",
            height: "60%",
            background:
              "radial-gradient(ellipse at center, rgba(123,110,246,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <p
          style={{
            ...mono,
            fontSize: 13,
            color: "#7B6EF6",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 16,
          }}
        >
          Free Tool
        </p>
        <h1
          style={{
            ...heading,
            fontSize: "clamp(32px, 6vw, 56px)",
            color: "var(--text-1)",
            marginBottom: 16,
          }}
        >
          YouTube Editor{" "}
          <span
            style={{
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Pay Calculator
          </span>
        </h1>
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 17px)",
            color: "var(--text-2)",
            lineHeight: 1.65,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          Calculate what to pay your YouTube editor, writer, or thumbnail
          designer. Industry rates for per-video, monthly retainer, revenue
          share, and hybrid models.
        </p>
      </section>

      {/* ============================================================ */}
      {/*  CALCULATOR                                                   */}
      {/* ============================================================ */}
      <section
        style={{
          padding: "40px 24px 80px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
          }}
        >
          {/* Top row: channel + role + complexity */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {/* Your Channel */}
            <div
              className="glass"
              style={{ borderRadius: 20, padding: "32px 28px" }}
            >
              <p
                style={{
                  ...mono,
                  fontSize: 11,
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 20,
                }}
              >
                Your Channel
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 14,
                }}
              >
                <div>
                  <label style={labelStyle}>Videos/month</label>
                  <input
                    type="number"
                    value={videosPerMonth}
                    onChange={(e) =>
                      setVideosPerMonth(
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    RPM{" "}
                    <span style={{ color: "var(--text-3)", fontWeight: 400 }}>
                      ($/1K)
                    </span>
                  </label>
                  <input
                    type="number"
                    value={avgRpm}
                    onChange={(e) =>
                      setAvgRpm(
                        Math.max(0.5, parseFloat(e.target.value) || 0.5)
                      )
                    }
                    step="0.5"
                    min="0.5"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Avg views/video</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={viewsInput}
                    onChange={(e) => {
                      const formatted = formatViewsInput(e.target.value);
                      setViewsInput(formatted);
                      setAvgViews(parseViewsInput(e.target.value));
                    }}
                    placeholder="100,000"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: 14,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "var(--glass-faint)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <p style={{ fontSize: 12, color: "var(--text-2)" }}>
                  Estimated revenue:{" "}
                  <span
                    style={{ ...mono, fontWeight: 500, color: "var(--text-1)" }}
                  >
                    {fmt(revenuePerVideo)}
                  </span>{" "}
                  per video &middot;{" "}
                  <span
                    style={{ ...mono, fontWeight: 500, color: "var(--text-1)" }}
                  >
                    {fmt(monthlyRevenue)}
                  </span>
                  /month
                </p>
              </div>
            </div>

            {/* Role + Complexity */}
            <div
              className="glass"
              style={{ borderRadius: 20, padding: "32px 28px" }}
            >
              <p
                style={{
                  ...mono,
                  fontSize: 11,
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 20,
                }}
              >
                Who are you hiring?
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 24,
                }}
              >
                {Object.entries(ROLE_DATA).map(([key, r]) => (
                  <button
                    key={key}
                    onClick={() => setRole(key)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      border:
                        role === key
                          ? "1px solid rgba(123,110,246,0.4)"
                          : "1px solid var(--glass-border-hi)",
                      background:
                        role === key
                          ? "rgba(123,110,246,0.15)"
                          : "var(--glass-faint)",
                      color:
                        role === key ? "#a89fff" : "var(--text-2)",
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <p
                style={{
                  ...mono,
                  fontSize: 11,
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 14,
                }}
              >
                Video Complexity
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 8,
                }}
              >
                {Object.entries(COMPLEXITY_MULTIPLIER).map(([key, c]) => (
                  <button
                    key={key}
                    onClick={() => setComplexity(key)}
                    style={{
                      padding: "10px 8px",
                      borderRadius: 12,
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      border:
                        complexity === key
                          ? "1px solid rgba(123,110,246,0.4)"
                          : "1px solid var(--glass-border)",
                      background:
                        complexity === key
                          ? "rgba(123,110,246,0.1)"
                          : "transparent",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color:
                          complexity === key
                            ? "#a89fff"
                            : "var(--text-1)",
                        marginBottom: 2,
                      }}
                    >
                      {c.label}
                    </p>
                    <p
                      style={{
                        fontSize: 10,
                        color: "var(--text-3)",
                        lineHeight: 1.4,
                      }}
                    >
                      {c.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payment model row */}
          <div
            className="glass"
            style={{ borderRadius: 20, padding: "32px 28px" }}
          >
            <p
              style={{
                ...mono,
                fontSize: 11,
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 20,
              }}
            >
              Payment Model
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              {[
                {
                  key: "per_video" as PayModel,
                  label: "Per Video",
                  desc: "Flat fee for each edit. Simple, predictable. Best for freelancers or low volume.",
                },
                {
                  key: "monthly" as PayModel,
                  label: "Monthly Retainer",
                  desc: "Fixed monthly pay for a set number of videos. Gives your editor stability.",
                },
                {
                  key: "revenue_share" as PayModel,
                  label: "Revenue Share",
                  desc: "% of each video’s AdSense earnings. Aligns incentives — they earn more when you do.",
                },
                {
                  key: "hybrid" as PayModel,
                  label: "Hybrid",
                  desc: "Small flat fee per video + a % of revenue. Best of both — stability plus upside.",
                },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setModel(m.key)}
                  style={{
                    padding: "16px",
                    borderRadius: 14,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    border:
                      model === m.key
                        ? "1px solid rgba(123,110,246,0.4)"
                        : "1px solid var(--glass-border)",
                    background:
                      model === m.key
                        ? "rgba(123,110,246,0.1)"
                        : "transparent",
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color:
                        model === m.key
                          ? "#a89fff"
                          : "var(--text-1)",
                      marginBottom: 4,
                    }}
                  >
                    {m.label}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--text-3)",
                      lineHeight: 1.5,
                    }}
                  >
                    {m.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Results panel */}
          <div
            style={{
              borderRadius: 20,
              padding: "36px 32px",
              background:
                "linear-gradient(135deg, rgba(123,110,246,0.08), rgba(233,107,245,0.05))",
              border: "1px solid rgba(123,110,246,0.15)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 32,
              }}
            >
              {/* Suggested pay */}
              <div>
                <p
                  style={{
                    ...mono,
                    fontSize: 11,
                    color: "#7B6EF6",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 12,
                  }}
                >
                  Suggested Pay
                </p>
                <p
                  style={{
                    ...heading,
                    ...mono,
                    fontSize: "clamp(28px, 4vw, 36px)",
                    color: "var(--text-1)",
                    marginBottom: 8,
                  }}
                >
                  {payLabel}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-2)",
                    lineHeight: 1.6,
                  }}
                >
                  {payContext}
                </p>
                {costPer1kViews > 0 && (
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--text-3)",
                      marginTop: 8,
                    }}
                  >
                    Cost per 1K views:{" "}
                    <span style={{ ...mono, color: "var(--text-1)" }}>
                      {fmt(costPer1kViews)}
                    </span>
                  </p>
                )}
              </div>

              {/* Industry range */}
              <div>
                <p
                  style={{
                    ...mono,
                    fontSize: 11,
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 12,
                  }}
                >
                  Industry Range for {roleInfo.label}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {[
                    {
                      label: "Per video",
                      value: `${fmt(roleInfo.perVideoRange[0])} – ${fmt(roleInfo.perVideoRange[1])}`,
                    },
                    {
                      label: "Monthly",
                      value: `${fmt(roleInfo.monthlyRange[0])} – ${fmt(roleInfo.monthlyRange[1])}`,
                    },
                    {
                      label: "Revenue share",
                      value: `${roleInfo.revShareRange[0]}% – ${roleInfo.revShareRange[1]}%`,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                      }}
                    >
                      <span style={{ color: "var(--text-3)" }}>
                        {row.label}
                      </span>
                      <span style={{ ...mono, color: "var(--text-1)" }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost health */}
              <div>
                <p
                  style={{
                    ...mono,
                    fontSize: 11,
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 12,
                  }}
                >
                  Cost Health
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background:
                        teamCostPct <= 15
                          ? "#10b981"
                          : teamCostPct <= 30
                            ? "#f59e0b"
                            : "#ef4444",
                    }}
                  />
                  <p style={{ fontSize: 13, color: "var(--text-2)" }}>
                    {teamCostPct <= 15
                      ? "Healthy — under 15% of revenue"
                      : teamCostPct <= 30
                        ? "Moderate — 15–30% of revenue"
                        : "High — exceeds 30% of revenue"}
                  </p>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "var(--glass-mid)",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 3,
                      width: `${Math.min(teamCostPct, 100)}%`,
                      background:
                        teamCostPct <= 15
                          ? "#10b981"
                          : teamCostPct <= 30
                            ? "#f59e0b"
                            : "#ef4444",
                    }}
                  />
                </div>
                <p
                  style={{
                    ...mono,
                    fontSize: 11,
                    color: "var(--text-3)",
                    marginTop: 6,
                  }}
                >
                  {teamCostPct.toFixed(1)}% of estimated revenue
                </p>
              </div>
            </div>

            {/* Tip */}
            <div
              style={{
                marginTop: 24,
                padding: "14px 18px",
                borderRadius: 12,
                background: "var(--glass-faint)",
                border: "1px solid var(--glass-border)",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ flexShrink: 0, marginTop: 1 }}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="var(--text-3)"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 16v-4M12 8h.01"
                  stroke="var(--text-3)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-3)",
                  lineHeight: 1.6,
                }}
              >
                {model === "per_video" &&
                  "Per-video works best when you’re uploading irregularly or testing a new editor. Switch to a retainer once you have a consistent schedule."}
                {model === "monthly" &&
                  "Retainers give your editor stability and loyalty. Most channels switch to this once they upload weekly."}
                {model === "revenue_share" &&
                  "Revenue share aligns incentives — your editor earns more when videos perform. Some creators add a minimum guarantee so the editor isn’t hurt by a slow month."}
                {model === "hybrid" &&
                  "Hybrid is the gold standard for top channels. A small base covers the editor’s time, and the commission motivates great work."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <section
        style={{
          padding: "80px 24px",
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            ...heading,
            fontSize: "clamp(24px, 4vw, 36px)",
            color: "var(--text-1)",
            marginBottom: 16,
          }}
        >
          Ready to manage your{" "}
          <span
            style={{
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            whole team?
          </span>
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "var(--text-2)",
            lineHeight: 1.65,
            marginBottom: 12,
          }}
        >
          Track payments, manage your video pipeline, and give your team
          verified portfolios — all from one dashboard.
        </p>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-3)",
            marginBottom: 32,
          }}
        >
          Free to start. Pro is $5/team member/month.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/sign-up"
            className="btn-cta"
            style={{ fontSize: 15, padding: "16px 32px" }}
          >
            Get started free
          </Link>
          <Link
            href="/#pricing"
            className="btn-outline"
            style={{ fontSize: 15, padding: "16px 32px" }}
          >
            See pricing
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section
        style={{
          padding: "80px 24px 120px",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            ...heading,
            fontSize: "clamp(24px, 4vw, 36px)",
            color: "var(--text-1)",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          Frequently asked questions
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="glass"
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--text-1)",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    style={{
                      flexShrink: 0,
                      transition: "transform 0.2s",
                      transform: isOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    <path
                      d="M4 7L9 12L14 7"
                      stroke="var(--text-3)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "0 24px 20px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--text-2)",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                       */}
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
          <Link
            href="/"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500,
              fontSize: 17,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.02em",
              textDecoration: "none",
            }}
          >
            Moni
            <span
              style={{
                background: "var(--gradient-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              tube
            </span>
          </Link>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>
            &copy; {new Date().getFullYear()} Monitube. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
