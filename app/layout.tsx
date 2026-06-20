import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Monitube — Manage Your YouTube Team | Pay, Projects, Profiles",
  description:
    "The operating system for YouTube teams. Calculate fair editor pay, track video production, manage payments, and give your team verified portfolios.",
  metadataBase: new URL("https://monitube.work"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "youtube editor pay calculator",
    "youtube team management",
    "how much to pay youtube editor",
    "youtube editor portfolio",
    "youtube video production pipeline",
  ],
  openGraph: {
    title: "Monitube — Manage Your YouTube Team | Pay, Projects, Profiles",
    description:
      "The operating system for YouTube teams. Calculate fair editor pay, track video production, manage payments, and give your team verified portfolios.",
    type: "website",
    url: "https://monitube.work",
    siteName: "Monitube",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monitube — Manage Your YouTube Team | Pay, Projects, Profiles",
    description:
      "The operating system for YouTube teams. Calculate fair editor pay, track video production, manage payments, and give your team verified portfolios.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
