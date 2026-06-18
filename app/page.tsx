import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import Problem from "@/components/marketing/Problem";
import Solution from "@/components/marketing/Solution";
import Benefits from "@/components/marketing/Benefits";
import Proof from "@/components/marketing/Proof";
import QuickFAQ from "@/components/marketing/QuickFAQ";
import CTA from "@/components/marketing/CTA";
import Footer from "@/components/marketing/Footer";

export const metadata = {
  title: "Monitube — YouTube Team Analytics for Channel Owners",
  description:
    "Stop managing your team on gut feeling. See exactly who's driving results with real retention, CTR, and watch time pulled straight from YouTube.",
  openGraph: {
    title: "Monitube — YouTube Team Analytics for Channel Owners",
    description:
      "Stop managing your team on gut feeling. See exactly who's driving results with real retention, CTR, and watch time pulled straight from YouTube.",
    url: "https://monitube.work",
    siteName: "Monitube",
  },
};

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Benefits />
      <Proof />
      <QuickFAQ />
      <CTA />
      <Footer />
    </main>
  );
}
