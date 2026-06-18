"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, useClerk } from "@clerk/nextjs";

function UserMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const initial = user?.firstName?.[0] ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? "?";
  const name = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress ?? "";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(123,110,246,0.08)",
          border: "1px solid rgba(123,110,246,0.2)",
          borderRadius: 10, padding: "5px 10px 5px 5px",
          cursor: "pointer", color: "var(--text-1)",
        }}
      >
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "linear-gradient(135deg, #7B6EF6, #E96BF5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 600, color: "white",
          fontFamily: "'Bricolage Grotesque', sans-serif", flexShrink: 0,
        }}>
          {initial}
        </div>
        <span style={{ fontSize: 13, fontWeight: 400, letterSpacing: "-0.01em", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {name}
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: "var(--text-3)", flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0,
              minWidth: 180, borderRadius: 14,
              background: "rgba(13,13,28,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
              overflow: "hidden", zIndex: 100,
            }}
          >
            <div style={{ padding: "6px" }}>
              <Link href="/dashboard" onClick={() => setOpen(false)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 8, color: "var(--text-2)",
                fontSize: 13, fontWeight: 400, textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(123,110,246,0.1)"; e.currentTarget.style.color = "var(--text-1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-2)"; }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>
                Dashboard
              </Link>
              <Link href="/dashboard/settings" onClick={() => setOpen(false)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 8, color: "var(--text-2)",
                fontSize: 13, fontWeight: 400, textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(123,110,246,0.1)"; e.currentTarget.style.color = "var(--text-1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-2)"; }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M3.1 3.1l1.06 1.06M10.84 10.84l1.06 1.06M3.1 11.9l1.06-1.06M10.84 4.16l1.06-1.06" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Settings
              </Link>
              <div style={{ margin: "4px 6px", height: 1, background: "rgba(255,255,255,0.06)" }} />
              <button onClick={() => { setOpen(false); signOut(() => router.push("/")); }} style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "9px 12px", borderRadius: 8, color: "rgba(255,100,100,0.7)",
                fontSize: 13, fontWeight: 400, background: "transparent",
                border: "none", cursor: "pointer", textAlign: "left",
                transition: "background 0.15s, color 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,80,80,0.08)"; e.currentTarget.style.color = "rgba(255,100,100,1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,100,100,0.7)"; }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5.5 13H3a1 1 0 01-1-1V3a1 1 0 011-1h2.5M10 10.5L13 7.5M13 7.5L10 4.5M13 7.5H5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

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
            {isLoaded && isSignedIn ? (
              <UserMenu />
            ) : (
              <>
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
              </>
            )}
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
                {isLoaded && isSignedIn ? (
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="btn-cta w-full justify-center">Dashboard</Link>
                ) : (
                  <>
                    <Link href="/sign-in" className="btn-outline text-center w-full justify-center">Sign in</Link>
                    <Link href="/sign-up" className="btn-cta w-full justify-center">Get started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
