"use client";

import { useState, useCallback, DragEvent } from "react";
import {
  IconPlus,
  IconGripVertical,
  IconCalendar,
  IconVideo,
  IconX,
} from "@tabler/icons-react";

// ── Types ──────────────────────────────────────────────────────────────

type Stage = "idea" | "script" | "filming" | "editing" | "review" | "published";

interface TeamMember {
  name: string;
  role: string;
}

interface PipelineVideo {
  id: string;
  title: string;
  stage: Stage;
  members: TeamMember[];
  dueDate: string | null;
  priority: "urgent" | "normal" | "on-track";
}

// ── Constants ──────────────────────────────────────────────────────────

const STAGES: { key: Stage; label: string }[] = [
  { key: "idea", label: "Idea" },
  { key: "script", label: "Script" },
  { key: "filming", label: "Filming" },
  { key: "editing", label: "Editing" },
  { key: "review", label: "Review" },
  { key: "published", label: "Published" },
];

const ROLE_COLORS: Record<string, string> = {
  Creator: "bg-purple-100 text-purple-700",
  Writer: "bg-blue-100 text-blue-700",
  Editor: "bg-pink-100 text-pink-700",
  "Asst. Editor": "bg-orange-100 text-orange-700",
  Manager: "bg-green-100 text-green-700",
  Designer: "bg-cyan-100 text-cyan-700",
  Researcher: "bg-amber-100 text-amber-700",
};

const PRIORITY_DOT: Record<string, string> = {
  urgent: "bg-red-500",
  normal: "bg-yellow-400",
  "on-track": "bg-emerald-500",
};

const PRIORITY_LABEL: Record<string, string> = {
  urgent: "Urgent",
  normal: "Normal",
  "on-track": "On track",
};

// ── Demo data ──────────────────────────────────────────────────────────

const INITIAL_VIDEOS: PipelineVideo[] = [
  {
    id: "v1",
    title: "Why Nobody Talks About This Camera Trick",
    stage: "idea",
    members: [{ name: "Jake Morrison", role: "Creator" }],
    dueDate: null,
    priority: "normal",
  },
  {
    id: "v2",
    title: "I Spent 30 Days Using Only AI Tools",
    stage: "script",
    members: [
      { name: "Sofia Chen", role: "Writer" },
      { name: "Jake Morrison", role: "Creator" },
    ],
    dueDate: "2026-07-02",
    priority: "on-track",
  },
  {
    id: "v3",
    title: "The $50 vs $5,000 Microphone Challenge",
    stage: "filming",
    members: [
      { name: "Jake Morrison", role: "Creator" },
      { name: "Priya Sharma", role: "Researcher" },
    ],
    dueDate: "2026-06-28",
    priority: "urgent",
  },
  {
    id: "v4",
    title: "How Top Creators Structure Their B-Roll",
    stage: "editing",
    members: [
      { name: "Marcus Williams", role: "Editor" },
      { name: "Sofia Chen", role: "Asst. Editor" },
    ],
    dueDate: "2026-06-25",
    priority: "on-track",
  },
  {
    id: "v5",
    title: "Everything Wrong With YouTube Shorts Strategy",
    stage: "editing",
    members: [{ name: "Marcus Williams", role: "Editor" }],
    dueDate: "2026-06-24",
    priority: "urgent",
  },
  {
    id: "v6",
    title: "The Perfect YouTube Thumbnail Formula",
    stage: "review",
    members: [
      { name: "Priya Sharma", role: "Designer" },
      { name: "Jake Morrison", role: "Creator" },
    ],
    dueDate: "2026-06-22",
    priority: "normal",
  },
  {
    id: "v7",
    title: "I Tried Every Editing Software So You Don't Have To",
    stage: "published",
    members: [
      { name: "Marcus Williams", role: "Editor" },
      { name: "Sofia Chen", role: "Writer" },
    ],
    dueDate: null,
    priority: "on-track",
  },
  {
    id: "v8",
    title: "Studio Tour 2026 — Full Gear Breakdown",
    stage: "idea",
    members: [
      { name: "Jake Morrison", role: "Creator" },
      { name: "Priya Sharma", role: "Manager" },
    ],
    dueDate: "2026-07-15",
    priority: "on-track",
  },
];

// ── Component ──────────────────────────────────────────────────────────

export default function PipelinePage() {
  const [videos, setVideos] = useState<PipelineVideo[]>(INITIAL_VIDEOS);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<Stage | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // ── Drag handlers ───────────────────────────────────────────────────

  const handleDragStart = useCallback(
    (e: DragEvent<HTMLDivElement>, videoId: string) => {
      e.dataTransfer.setData("text/plain", videoId);
      e.dataTransfer.effectAllowed = "move";
      setDraggingId(videoId);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setOverStage(null);
  }, []);

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>, stage: Stage) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setOverStage(stage);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setOverStage(null);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>, stage: Stage) => {
      e.preventDefault();
      const videoId = e.dataTransfer.getData("text/plain");
      setVideos((prev) =>
        prev.map((v) => (v.id === videoId ? { ...v, stage } : v))
      );
      setDraggingId(null);
      setOverStage(null);
    },
    []
  );

  // ── Add video ───────────────────────────────────────────────────────

  const addVideo = useCallback((title: string) => {
    const newVideo: PipelineVideo = {
      id: `v${Date.now()}`,
      title,
      stage: "idea",
      members: [],
      dueDate: null,
      priority: "normal",
    };
    setVideos((prev) => [...prev, newVideo]);
    setShowAddModal(false);
  }, []);

  // ── Render ──────────────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
            Pipeline
          </h1>
          <p className="text-[13px] text-zinc-500 mt-1">
            Track videos from idea to published — drag cards between stages.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
        >
          <IconPlus size={16} />
          Add video
        </button>
      </div>

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
        {STAGES.map((stage) => {
          const stageVideos = videos.filter((v) => v.stage === stage.key);
          const isOver = overStage === stage.key && draggingId !== null;

          return (
            <div
              key={stage.key}
              className={`flex-shrink-0 w-[280px] rounded-2xl border p-3 transition-colors ${
                isOver
                  ? "bg-[#7B6EF6]/5 border-[#7B6EF6]/30"
                  : "bg-zinc-50 border-zinc-200"
              }`}
              onDragOver={(e) => handleDragOver(e, stage.key)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.key)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
                  {stage.label}
                </h3>
                <span className="text-[11px] bg-white text-zinc-500 px-2 py-0.5 rounded-full font-medium border border-zinc-100">
                  {stageVideos.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2 min-h-[120px]">
                {stageVideos.map((video) => (
                  <div
                    key={video.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, video.id)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white rounded-xl border border-zinc-200 p-3 cursor-grab active:cursor-grabbing transition-all hover:border-zinc-300 hover:shadow-sm group ${
                      draggingId === video.id ? "opacity-40 scale-[0.97]" : ""
                    }`}
                  >
                    {/* Top row: grip + priority */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <IconGripVertical
                          size={14}
                          className="text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        <div
                          className={`w-2 h-2 rounded-full ${PRIORITY_DOT[video.priority]}`}
                          title={PRIORITY_LABEL[video.priority]}
                        />
                        <span className="text-[10px] text-zinc-400">
                          {PRIORITY_LABEL[video.priority]}
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail placeholder */}
                    <div className="w-full h-[72px] rounded-lg bg-zinc-100 mb-2.5 flex items-center justify-center">
                      <IconVideo size={20} className="text-zinc-300" />
                    </div>

                    {/* Title */}
                    <p className="text-[13px] font-medium text-zinc-900 leading-snug mb-2.5 line-clamp-2">
                      {video.title}
                    </p>

                    {/* Team members */}
                    {video.members.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {video.members.map((m, i) => (
                          <span
                            key={i}
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                              ROLE_COLORS[m.role] ?? "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            {m.name.split(" ")[0]} · {m.role}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Due date */}
                    {video.dueDate && (
                      <div className="flex items-center gap-1 mt-1">
                        <IconCalendar size={12} className="text-zinc-400" />
                        <span className="text-[11px] text-zinc-400">
                          {new Date(video.dueDate + "T00:00:00").toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Empty state */}
                {stageVideos.length === 0 && (
                  <div className="flex items-center justify-center h-[120px] rounded-xl border-2 border-dashed border-zinc-200 text-[12px] text-zinc-400">
                    Drop here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Video Modal */}
      {showAddModal && <AddVideoModal onAdd={addVideo} onClose={() => setShowAddModal(false)} />}
    </div>
  );
}

// ── Add Video Modal ────────────────────────────────────────────────────

function AddVideoModal({
  onAdd,
  onClose,
}: {
  onAdd: (title: string) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="relative bg-white rounded-2xl border border-zinc-200 shadow-xl w-full max-w-md p-6 mx-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-lg font-medium text-zinc-900">
            New Video Idea
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <IconX size={18} className="text-zinc-400" />
          </button>
        </div>
        <label className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium block mb-2">
          Video Title
        </label>
        <input
          type="text"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && title.trim()) onAdd(title.trim());
          }}
          placeholder="e.g. Top 10 Camera Hacks for Beginners"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/30 focus:border-[#7B6EF6]/50 mb-5"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-[13px] text-zinc-500 hover:bg-zinc-100 transition-colors cursor-pointer font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => title.trim() && onAdd(title.trim())}
            disabled={!title.trim()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7B6EF6] to-[#E96BF5] text-white text-[13px] font-medium disabled:opacity-50 hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
          >
            Add to Pipeline
          </button>
        </div>
      </div>
    </div>
  );
}
