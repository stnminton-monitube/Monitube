"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-500 ${
          scrolled ? "glass" : ""
        }`}
        style={scrolled ? { boxShadow: "var(--shadow-md), var(--glow-sm)" } : {}}
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="cursor-pointer select-none">
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 17, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>
              Moni<span className="g-text">tube</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              ["Features", "#benefits"],
              ["Pricing", "#cta"],
              ["FAQ", "/faq"],
            ].map(([label, href]) => (
              <Link key={label} href={href}
                className="text-[13px] transition-colors duration-200 cursor-pointer"
                style={{ color: "var(--text-3)", fontWeight: 400, letterSpacing: "-0.01em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}>
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/sign-in"
              className="text-[13px] px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer"
              style={{ color: "var(--text-3)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}>
              Sign in
            </Link>
            <Link href="/sign-up" className="btn-cta" style={{ padding: "8px 18px", fontSize: 13, borderRadius: 10 }}>
              Get started
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg cursor-pointer" style={{ color: "var(--text-2)" }}
            aria-label="Toggle menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <><line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
              ) : (
                <><line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[76px] left-4 right-4 z-40 glass rounded-2xl p-5"
            style={{ boxShadow: "var(--shadow-lg)" }}>
            <div className="flex flex-col gap-4">
              {[["Features", "#benefits"], ["Pricing", "#cta"], ["FAQ", "/faq"]].map(([l, h]) => (
                <Link key={l} href={h} onClick={() => setMobileOpen(false)}
                  className="text-[14px] cursor-pointer" style={{ color: "var(--text-2)" }}>{l}</Link>
              ))}
              <div className="pt-3 border-t flex flex-col gap-2" style={{ borderColor: "var(--glass-border)" }}>
                <Link href="/sign-in" className="btn-outline text-center w-full justify-center">Sign in</Link>
                <Link href="/sign-up" className="btn-cta w-full justify-center">Get started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
