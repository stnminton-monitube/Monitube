"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Member = {
  id: string; name: string; role: string; avatar: string; joinedAt: string;
  videosCredited: number; avgViews: number; avgRetention: number; avgCtr: number;
  totalWatchTime: number; trend: "up" | "down" | "stable";
  estimatedRevenueGenerated: number;
};

type Video = {
  id: string; title: string; thumbnail: string; publishedAt: string;
  views: number; likes: number; comments: number; retention: number;
  ctr: number; contentType: string; watchTimeHours: number;
  estimatedRevenue: number;
  credits: Array<{ memberId: string; memberName: string; role: string; weight: number }>;
};

type Channel = {
  id: string; name: string; thumbnail: string; subscribers: number;
  totalViews: number; videoCount: number; avgRetention: number; avgCtr: number;
  estimatedRpm: number; totalEstimatedRevenue: number;
};

export type DemoData = {
  channel: Channel;
  members: Member[];
  videos: Video[];
};

type DemoContextType = {
  demo: DemoData | null;
  loading: boolean;
  error: string;
  loadDemo: (query: string) => Promise<void>;
  clearDemo: () => void;
};

const DemoContext = createContext<DemoContextType>({
  demo: null, loading: false, error: "",
  loadDemo: async () => {}, clearDemo: () => {},
});

export function useDemo() { return useContext(DemoContext); }

export default function DemoProvider({ children }: { children: ReactNode }) {
  const [demo, setDemo] = useState<DemoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("monitube_demo");
    if (saved) {
      try { setDemo(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  async function loadDemo(query: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/youtube/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to load"); return; }
      setDemo(data);
      localStorage.setItem("monitube_demo", JSON.stringify(data));
    } catch {
      setError("Failed to connect");
    } finally {
      setLoading(false);
    }
  }

  function clearDemo() {
    setDemo(null);
    localStorage.removeItem("monitube_demo");
  }

  return (
    <DemoContext.Provider value={{ demo, loading, error, loadDemo, clearDemo }}>
      {children}
    </DemoContext.Provider>
  );
}
