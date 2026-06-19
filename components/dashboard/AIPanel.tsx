"use client";

import { useState, useRef, useEffect } from "react";
import { useDemo } from "@/components/dashboard/DemoProvider";
import { IconX, IconBrain, IconSend, IconLoader2 } from "@tabler/icons-react";

type Message = { role: "user" | "ai"; text: string };

function buildContext(demo: ReturnType<typeof useDemo>["demo"]): string {
  if (!demo) return "No channel data loaded.";

  const { channel, members, videos } = demo;
  const lines: string[] = [];

  lines.push(`Channel: ${channel.name}`);
  lines.push(`Subscribers: ${channel.subscribers.toLocaleString()}`);
  lines.push(`Channel avg retention: ${channel.avgRetention}%`);
  lines.push(`Channel avg CTR: ${channel.avgCtr}%`);
  lines.push(`Recent videos analyzed: ${videos.length}`);
  lines.push("");

  lines.push("TEAM MEMBERS:");
  members.forEach(m => {
    lines.push(`- ${m.name} (${m.role.replace("_", " ")}): ${m.videosCredited} videos, avg retention ${m.avgRetention}%, avg CTR ${m.avgCtr}%, avg views ${m.avgViews.toLocaleString()}, trend: ${m.trend}, joined ${new Date(m.joinedAt).toLocaleDateString()}`);
  });
  lines.push("");

  lines.push("TOP 10 RECENT VIDEOS:");
  [...videos].reverse().slice(0, 10).forEach(v => {
    const credits = v.credits.map(c => `${c.memberName} (${c.role}${c.weight < 100 ? ` ${c.weight}%` : ""})`).join(", ");
    lines.push(`- "${v.title}" — ${v.views.toLocaleString()} views, ${v.retention}% retention, ${v.ctr}% CTR. Credits: ${credits}`);
  });

  return lines.join("\n");
}

const SUGGESTIONS = [
  "Who is performing best this month?",
  "Should I give anyone a bonus?",
  "Which videos performed above average?",
  "How is my team doing overall?",
];

export default function AIPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { demo } = useDemo();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text?: string) {
    const msg = text ?? input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, context: buildContext(demo) }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "Something went wrong. Try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {open && <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />}

      {/* Panel */}
      <div className={`
        fixed top-0 right-0 z-50 h-full w-[380px] max-w-full
        bg-white border-l border-zinc-200 shadow-xl
        flex flex-col transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}
      `}>
        {/* Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-zinc-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center">
              <IconBrain size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-zinc-900">Ask AI</p>
              <p className="text-[10px] text-zinc-400">Team insights</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 cursor-pointer">
            <IconX size={18} />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="text-center pt-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7B6EF6]/10 to-[#E96BF5]/10 flex items-center justify-center mx-auto mb-4">
                <IconBrain size={22} className="text-[#7B6EF6]" />
              </div>
              <p className="text-[13px] text-zinc-500 mb-1">Ask anything about your team</p>
              <p className="text-[11px] text-zinc-400 mb-6 px-4">
                I have access to all your channel stats, team performance, and video data.
              </p>
              <div className="flex flex-col gap-2 px-2">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left px-3.5 py-2.5 rounded-xl border border-zinc-100 text-[12px] text-zinc-600 hover:bg-zinc-50 hover:border-zinc-200 cursor-pointer transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white"
                  : "bg-zinc-50 border border-zinc-100 text-zinc-700"
              }`}>
                {msg.role === "ai" && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <IconBrain size={12} className="text-[#7B6EF6]" />
                    <span className="text-[10px] text-[#7B6EF6] font-medium">Monitube AI</span>
                  </div>
                )}
                <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <IconLoader2 size={14} className="animate-spin text-[#7B6EF6]" />
                  <span className="text-[12px] text-zinc-400">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-zinc-100 shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about your team..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/20 focus:border-[#7B6EF6]/40"
              disabled={loading}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white disabled:opacity-40 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <IconSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
