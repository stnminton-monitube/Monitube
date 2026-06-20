import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Editor Pay Calculator — Fair Rates for 2026 | Monitube",
  description:
    "Calculate what to pay your YouTube editor, writer, or thumbnail designer. Industry rates for per-video, monthly retainer, revenue share, and hybrid models.",
  openGraph: {
    title: "YouTube Editor Pay Calculator — Fair Rates for 2026 | Monitube",
    description:
      "Calculate what to pay your YouTube editor, writer, or thumbnail designer. Industry rates for per-video, monthly retainer, revenue share, and hybrid models.",
    type: "website",
    url: "https://monitube.work/calculator",
    siteName: "Monitube",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Editor Pay Calculator — Fair Rates for 2026 | Monitube",
    description:
      "Calculate what to pay your YouTube editor, writer, or thumbnail designer. Industry rates for per-video, monthly retainer, revenue share, and hybrid models.",
  },
  alternates: {
    canonical: "/calculator",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
