"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

const faqs = [
  {
    category: "General",
    items: [
      {
        q: "What exactly is Monitube?",
        a: "Monitube is a verified YouTube team analytics platform. It gives channel owners a private dashboard to manage their team with real YouTube data — retention, CTR, views, and more — pulled directly from YouTube's API.",
      },
      {
        q: "Who is Monitube for?",
        a: "Primarily channel owners who want to manage their team with actual data instead of guesswork. It's also useful for freelance editors, writers, and thumbnail designers who want a verified public profile backed by real stats they can share with potential clients.",
      },
      {
        q: "Do I need a large team to use Monitube?",
        a: "No. Many owners start with just 1-2 team members. The free plan supports up to 5 members — enough to get real value immediately.",
      },
    ],
  },
  {
    category: "For Channel Owners",
    items: [
      {
        q: "How does Monitube get my YouTube data?",
        a: "You connect your YouTube channel through the official Google OAuth flow. Monitube then pulls your stats automatically through the YouTube Analytics API. You never have to enter numbers manually.",
      },
      {
        q: "Do my team members need to pay?",
        a: "No. Team members are always free. You're the only one who pays — and only if you want Pro features. Team members sign up, get credited for their work, and build their profile at no cost.",
      },
      {
        q: "Can I invite someone who isn't on Monitube yet?",
        a: "Yes. You invite by email. If they haven't signed up yet, their stats are attached immediately. When they create an account, the profile is theirs.",
      },
      {
        q: "Does Monitube handle payments or bonuses?",
        a: "No. Monitube calculates and suggests bonuses based on your formula and real performance data — but it never moves money. Actual payment happens however you normally pay your team.",
      },
    ],
  },
  {
    category: "For Team Members",
    items: [
      {
        q: "Is my profile really free forever?",
        a: "Yes. Team member profiles are free forever. The channel owner pays the subscription — your profile costs you nothing.",
      },
      {
        q: "What goes on my public profile?",
        a: "Your name, role, bio, verified channels you've worked for, featured videos with real stats, and headline numbers like average retention or CTR. You control exactly what appears — you can hide videos or choose which stats to highlight.",
      },
      {
        q: "What is never shown on my public profile?",
        a: "Owner private notes, bonus or payment information, AI summaries, and any videos or channels you've chosen to hide are never public.",
      },
    ],
  },
  {
    category: "AI Features",
    items: [
      {
        q: "What can the AI actually do?",
        a: "The AI has access to your entire team's data — all stats, performance logs, bonus rules, credit history, and private notes you've written. You can ask anything: \"Who should I give a bonus to?\", \"Is Jake improving?\", \"Who hasn't been credited recently?\" It gives real, specific answers.",
      },
      {
        q: "Is AI available on the free plan?",
        a: "No. AI features are Pro-only. The free plan gives you core analytics and team management tools.",
      },
      {
        q: "Does AI content ever appear on public profiles?",
        a: "Never. AI output is strictly private to the owner. No AI content is ever shown on any public-facing profile.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    items: [
      {
        q: "Is my YouTube data secure?",
        a: "Yes. YouTube data is accessed through the official Google OAuth flow. Monitube never stores your Google password — only a secure token. Row Level Security means users only access their own data.",
      },
      {
        q: "Are private notes really private?",
        a: "Yes. Private performance log notes are owner-only. They are never shown on public profiles, never shown to the team member, and never included in any public-facing content.",
      },
      {
        q: "Can team members see each other's stats?",
        a: "No. Team members only see their own stats on their private dashboard.",
      },
    ],
  },
  {
    category: "Plans & Billing",
    items: [
      {
        q: "What's included in the free plan?",
        a: "The free plan ($5/month) includes 1 channel, up to 5 team members, YouTube API connection, the full video credit system, role-based stats, and public profiles for all team members.",
      },
      {
        q: "What does Pro add?",
        a: "Pro ($50/month) adds AI chat, AI summaries, private performance log, bonus & target tracking, bi-weekly email reports, milestone notifications, full trend charts, CSV/PDF export, and priority support.",
      },
      {
        q: "What's the Lifetime deal?",
        a: "The Lifetime plan ($750 one-time) gives you everything in Pro — forever, with no monthly bill. All future features included. Pay once and you're done.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. No lock-in. Cancel from your account settings and your plan ends at the current billing period.",
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
        aria-expanded={open}
      >
        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-1)", paddingRight: 32 }}>
          {q}
        </span>
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
            <p style={{ paddingBottom: 20, fontSize: 14, lineHeight: 1.65, color: "var(--text-2)", fontWeight: 300 }}>
              {a}
            </p>
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
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-8 transition-colors duration-200"
              style={{ fontSize: 12, color: "var(--text-3)", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
            >
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
                fontWeight: 500,
                fontSize: "clamp(36px, 5.5vw, 56px)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                color: "var(--text-1)",
                marginBottom: 16,
              }}
            >
              Frequently asked
              <br />
              <span className="g-text">questions</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: 15, color: "var(--text-2)", fontWeight: 300 }}
            >
              Everything you need to know about Monitube.{" "}
              <Link href="/contact" className="g-text" style={{ fontWeight: 500, textDecoration: "none" }}>
                Still have questions? Contact us.
              </Link>
            </motion.p>
          </div>

          {/* FAQ sections */}
          {faqs.map((section) => (
            <CategorySection key={section.category} category={section.category} items={section.items} />
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
              Team members always free. Owners from $5/month.
            </p>
            <Link href="/sign-up" className="btn-cta relative" style={{ boxShadow: "var(--glow-sm)" }}>
              Start for free
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
