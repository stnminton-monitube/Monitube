"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 pb-10" style={{ borderTop: "1px solid var(--glass-border)" }}>
      <div className="max-w-6xl mx-auto pt-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center mb-3 cursor-pointer">
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 17, letterSpacing: "-0.02em", color: "var(--text-1)" }}>
                Moni<span className="g-text">tube</span>
              </span>
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.65, maxWidth: 280, color: "var(--text-3)", fontWeight: 300 }}>
              Verified YouTube team analytics. A command center for owners who want to manage with data.
            </p>
          </div>

          {[
            {
              heading: "Product",
              links: [
                { label: "How it works", href: "#how-it-works" },
                { label: "Features", href: "#benefits" },
                { label: "Pricing", href: "#cta" },
              ],
            },
            {
              heading: "Company",
              links: [
                { label: "About", href: "/about" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ],
            },
            {
              heading: "Legal",
              links: [
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ],
            },
          ].map((col) => (
            <div key={col.heading}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, color: "var(--text-3)", fontWeight: 500 }}>
                {col.heading}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}
                      className="transition-colors duration-200 cursor-pointer"
                      style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 300, textDecoration: "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: "1px solid var(--glass-border)" }}>
          <p style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 300 }}>
            © 2025 Monitube. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 300 }}>monitube.work</p>
        </div>
      </div>
    </footer>
  );
}
