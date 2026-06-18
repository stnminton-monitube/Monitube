import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monitube — Verified YouTube Team Analytics",
  description:
    "A command center for channel owners and a credible public profile for every editor, writer, and designer who builds YouTube channels.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
