"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";

const faqs = [
  {
    category: "General",
    items: [
      {
        q: "What is Monitube?",
        a: "Monitube is the operating system for YouTube teams. It helps channel owners manage their video pipeline, track what they pay editors and designers, generate invoices, set bonus targets, and give their team verified public portfolios.",
      },
      {
        q: "Who is Monitube for?",
        a: "Any YouTube creator who pays people to help run their channel — editors, writers, thumbnail designers, assistants. Whether you have 1 freelancer or 15 team members, Monitube keeps everything organized.",
      },
      {
        q: "Is the pay calculator really free?",
        a: "Yes, completely free, no signup required. It uses real industry data from 2024-2026 to help you figure out fair rates for any role. Most people discover Monitube through the calculator.",
      },
    ],
  },
  {
    category: "Pay & Finances",
    items: [
      {
        q: "How much should I pay my YouTube editor?",
        a: "It depends on video complexity, their experience, and your payment model. Basic edits run $100-250/video, standard $200-500, and high-production $500-2,000+. Monthly retainers range from $1,500-$5,000. Use our free calculator for a personalized recommendation.",
      },
      {
        q: "What payment models does Monitube support?",
        a: "Per-video flat rates, monthly retainers, revenue share (% of video earnings), and hybrid models (small flat fee + commission). You can track any combination across your team.",
      },
      {
        q: "Does Monitube process payments?",
        a: "No. Monitube tracks and organizes payments — it doesn't move money. You pay your team however you normally do (PayPal, wire, Venmo). Monitube logs the records, generates invoices, and keeps everything organized for taxes.",
      },
      {
        q: "Can I use Monitube for tax records?",
        a: "Yes. Every payment is logged with dates, amounts, and categories. Invoices are sortable by team member, month, or type. You can filter and export records when tax season comes around.",
      },
    ],
  },
  {
    category: "Projects & Pipeline",
    items: [
      {
        q: "How does the video pipeline work?",
        a: "It's a kanban board with 6 stages: Idea, Script, Filming, Editing, Review, Published. Drag videos between stages, assign team members, set deadlines, and see where every video stands at a glance.",
      },
      {
        q: "Can my team members see the pipeline?",
        a: "On the Pro plan, team members can see their assigned videos and update their progress. On the free plan, only the channel owner can access the pipeline.",
      },
    ],
  },
  {
    category: "Public Profiles",
    items: [
      {
        q: "What are verified profiles?",
        a: "Every team member gets a public page at monitube.work/@name. The channel owner confirms which videos they worked on, so the credits are verified — not self-reported. Editors share these profiles when applying for work.",
      },
      {
        q: "Are profiles free for team members?",
        a: "Yes, always. The channel owner pays the subscription. Team member profiles cost nothing.",
      },
      {
        q: "What shows on a public profile?",
        a: "Name, role, verified channels, credited videos, total view counts, and an availability status. The team member controls what they show. Private information like pay, bonuses, and owner notes are never visible.",
      },
    ],
  },
  {
    category: "Plans & Pricing",
    items: [
      {
        q: "What's free and what's paid?",
        a: "The pay calculator is always free, no signup needed. The free plan includes a basic pipeline (3 videos, 1 team member). Pro unlocks everything: unlimited pipeline, payment tracking, invoices, earnings, bonuses, and public profiles — at $5 per team member per month.",
      },
      {
        q: "How does per-member pricing work?",
        a: "You pay $5/month for each team member you add. A 3-person team costs $15/mo. A 10-person team costs $50/mo. It scales naturally with your team size. Cancel anytime.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. No contracts, no lock-in. Cancel from your settings and your plan ends at the current billing period.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b cursor-pointer" style={{ borderColor: "var(--glass-border)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
      >
        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-1)", paddingRight: 32 }}>{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full"
          style={{ background: open ? "var(--gradient)" : "var(--glass-mid)" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p style={{ paddingBottom: 20, fontSize: 14, lineHeight: 1.65, color: "var(--text-2)", fontWeight: 300 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategorySection({ category, items }: { category: string; items: { q: string; a: string }[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <h2 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--glass-border)", color: "var(--purple)", fontWeight: 500 }}>
        {category}
      </h2>
      {items.map((item) => (
        <FAQItem key={item.q} {...item} />
      ))}
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-4" style={{ background: "var(--bg)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="mb-16">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 transition-colors duration-200"
              style={{ fontSize: 12, color: "var(--text-3)", textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to home
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 500, fontSize: "clamp(36px, 5.5vw, 56px)",
                lineHeight: 1.02, letterSpacing: "-0.035em",
                color: "var(--text-1)", marginBottom: 16,
              }}
            >
              Frequently asked<br /><span className="g-text">questions</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: 15, color: "var(--text-2)", fontWeight: 300 }}
            >
              Everything you need to know about Monitube.
            </motion.p>
          </div>

          {faqs.map((section) => (
            <CategorySection key={section.category} category={section.category} items={section.items} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 glass rounded-2xl p-10 text-center relative overflow-hidden"
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at top left, rgba(123,110,246,0.12) 0%, transparent 60%)" }} />
            <h3 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500, fontSize: 26, letterSpacing: "-0.025em",
              color: "var(--text-1)", marginBottom: 12,
            }} className="relative">
              Ready to get started?
            </h3>
            <p style={{ fontSize: 14, marginBottom: 28, color: "var(--text-2)", fontWeight: 300 }} className="relative">
              Free calculator. $5/member when you need more.
            </p>
            <div className="relative flex items-center justify-center gap-3">
              <Link href="/calculator" className="btn-outline">Try the calculator</Link>
              <Link href="/sign-up" className="btn-cta" style={{ boxShadow: "var(--glow-sm)" }}>Get started</Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
