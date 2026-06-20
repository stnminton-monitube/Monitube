import type { DemoData } from "@/components/dashboard/DemoProvider";

export type LogEntry = {
  id: string;
  memberId: string;
  memberName: string;
  memberAvatar: string;
  note: string;
  visibleToMember: boolean;
  createdAt: string;
};

export type BonusTarget = {
  id: string;
  memberId: string;
  memberName: string;
  memberRole: string;
  statType: string;
  statLabel: string;
  threshold: number;
  bonusPerUnit: number;
  videoCount: number;
  isActive: boolean;
  currentValue: number;
  progress: number;
};

export type BonusAchievement = {
  id: string;
  targetId: string;
  memberName: string;
  statLabel: string;
  achievedValue: number;
  threshold: number;
  suggestedAmount: number;
  status: "pending" | "accepted" | "dismissed";
  achievedAt: string;
};

export type AlertItem = {
  id: string;
  type: "milestone" | "underuse" | "credit" | "target";
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
};

export type ActivityItem = {
  id: string;
  type: "credit" | "join" | "milestone" | "bonus" | "log";
  title: string;
  description: string;
  memberName?: string;
  memberAvatar?: string;
  createdAt: string;
};

const LOG_TEMPLATES = [
  { note: "Delivered the edit 2 days early — didn't sacrifice quality either. Solid work.", positive: true },
  { note: "Took the lead on the thumbnail redesign without being asked. Shows real ownership.", positive: true },
  { note: "Script was well-researched but pacing was slow in the middle section. Discussed with them.", positive: false },
  { note: "Stepped in to cover when the other editor was sick. Handled it cleanly.", positive: true },
  { note: "This was their best video yet — retention was well above average. Worth recognizing.", positive: true },
  { note: "Missed the deadline by a full day. Had a conversation about it — said it won't happen again.", positive: false },
  { note: "The B-roll choices on this one were perfect. Viewers commented on the production quality.", positive: true },
  { note: "Thumbnails have been consistently strong. CTR trending up every month since they joined.", positive: true },
  { note: "Asked great questions during the briefing. Shows they care about understanding the vision.", positive: true },
  { note: "Watch time on their edited videos is 20% higher than the channel average. Impressive.", positive: true },
  { note: "Needs to work on color grading consistency between videos. Mentioned it in our 1-on-1.", positive: false },
  { note: "Came up with the hook for the intro — it tested really well. Should do this more.", positive: true },
];

export function generateLogs(demo: DemoData): LogEntry[] {
  const logs: LogEntry[] = [];
  const members = demo.members;

  members.forEach((m, mi) => {
    const count = 1 + (mi % 3);
    for (let i = 0; i < count; i++) {
      const template = LOG_TEMPLATES[(mi * 3 + i) % LOG_TEMPLATES.length];
      const videoIndex = Math.min(
        Math.floor((mi * 5 + i * 7) % demo.videos.length),
        demo.videos.length - 1
      );
      const video = demo.videos[videoIndex];
      const daysAgo = 3 + i * 8 + mi * 4;
      const date = new Date(Date.now() - daysAgo * 86400000);

      logs.push({
        id: `log-${mi}-${i}`,
        memberId: m.id,
        memberName: m.name,
        memberAvatar: m.avatar,
        note: template.note,
        visibleToMember: template.positive && i === 0,
        createdAt: date.toISOString(),
      });
    }
  });

  return logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function generateBonuses(demo: DemoData): { targets: BonusTarget[]; achievements: BonusAchievement[] } {
  const targets: BonusTarget[] = [];
  const achievements: BonusAchievement[] = [];

  const editors = demo.members.filter(m => m.role === "editor");
  const designers = demo.members.filter(m => m.role === "thumbnail_designer");

  if (editors[0]) {
    const current = editors[0].avgRetention;
    targets.push({
      id: "bt-1",
      memberId: editors[0].id,
      memberName: editors[0].name,
      memberRole: editors[0].role,
      statType: "retention",
      statLabel: "Avg Retention",
      threshold: 50,
      bonusPerUnit: 15,
      videoCount: 5,
      isActive: true,
      currentValue: current,
      progress: Math.min((current / 50) * 100, 100),
    });
  }

  if (designers[0]) {
    const current = designers[0].avgCtr;
    targets.push({
      id: "bt-2",
      memberId: designers[0].id,
      memberName: designers[0].name,
      memberRole: designers[0].role,
      statType: "ctr",
      statLabel: "Avg CTR",
      threshold: 8,
      bonusPerUnit: 20,
      videoCount: 5,
      isActive: true,
      currentValue: current,
      progress: Math.min((current / 8) * 100, 100),
    });
  }

  if (editors[1]) {
    const current = editors[1].avgRetention;
    targets.push({
      id: "bt-3",
      memberId: editors[1].id,
      memberName: editors[1].name,
      memberRole: editors[1].role,
      statType: "retention",
      statLabel: "Avg Retention",
      threshold: 45,
      bonusPerUnit: 10,
      videoCount: 3,
      isActive: true,
      currentValue: current,
      progress: Math.min((current / 45) * 100, 100),
    });
  }

  // Generate an achievement for the first editor if they beat their target
  if (editors[0] && editors[0].avgRetention >= 50) {
    achievements.push({
      id: "ba-1",
      targetId: "bt-1",
      memberName: editors[0].name,
      statLabel: "Avg Retention",
      achievedValue: editors[0].avgRetention,
      threshold: 50,
      suggestedAmount: Math.round((editors[0].avgRetention - 50) * 15),
      status: "pending",
      achievedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    });
  }

  return { targets, achievements };
}

export function generateAlerts(demo: DemoData): AlertItem[] {
  const alerts: AlertItem[] = [];
  const now = Date.now();

  // Milestone alerts for high-view videos
  demo.videos
    .filter(v => v.views >= 100000)
    .slice(0, 3)
    .forEach((v, i) => {
      const milestone = v.views >= 1000000 ? "1M" : v.views >= 500000 ? "500K" : "100K";
      alerts.push({
        id: `alert-milestone-${i}`,
        type: "milestone",
        title: `"${v.title.slice(0, 40)}..." hit ${milestone} views`,
        description: `The team credited on this video: ${v.credits.map(c => c.memberName.split(" ")[0]).join(", ")}`,
        createdAt: new Date(now - (i + 1) * 86400000 * 2).toISOString(),
        read: i > 0,
      });
    });

  // Underuse alert
  const leastCredited = [...demo.members].sort((a, b) => a.videosCredited - b.videosCredited)[0];
  if (leastCredited && leastCredited.videosCredited < demo.members[0].videosCredited * 0.5) {
    alerts.push({
      id: "alert-underuse-1",
      type: "underuse",
      title: `${leastCredited.name} hasn't been credited in a while`,
      description: `Only ${leastCredited.videosCredited} videos total. Consider assigning them to upcoming projects.`,
      createdAt: new Date(now - 3 * 86400000).toISOString(),
      read: false,
    });
  }

  // Bonus target alert
  const editors = demo.members.filter(m => m.role === "editor");
  if (editors[0] && editors[0].avgRetention >= 50) {
    alerts.push({
      id: "alert-target-1",
      type: "target",
      title: `${editors[0].name} hit their retention target`,
      description: `Avg retention is ${editors[0].avgRetention}% — above the 50% threshold. Suggested bonus ready for review.`,
      createdAt: new Date(now - 86400000).toISOString(),
      read: false,
    });
  }

  return alerts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function generateActivity(demo: DemoData): ActivityItem[] {
  const items: ActivityItem[] = [];
  const now = Date.now();

  // Recent video credits
  const recentVideos = [...demo.videos].slice(-8).reverse();
  recentVideos.forEach((v, i) => {
    const primary = v.credits[0];
    if (!primary) return;
    items.push({
      id: `act-credit-${i}`,
      type: "credit",
      title: `${primary.memberName} was credited on a new video`,
      description: `"${v.title.slice(0, 50)}${v.title.length > 50 ? "..." : ""}" — ${v.credits.length} team member${v.credits.length > 1 ? "s" : ""} credited`,
      memberName: primary.memberName,
      memberAvatar: primary.memberName[0],
      createdAt: new Date(now - (i + 1) * 86400000).toISOString(),
    });
  });

  // Team join events
  demo.members.forEach((m, i) => {
    items.push({
      id: `act-join-${i}`,
      type: "join",
      title: `${m.name} joined the team`,
      description: `Role: ${m.role.replace("_", " ")}`,
      memberName: m.name,
      memberAvatar: m.avatar,
      createdAt: m.joinedAt,
    });
  });

  // Milestones
  demo.videos
    .filter(v => v.views >= 100000)
    .slice(0, 2)
    .forEach((v, i) => {
      const milestone = v.views >= 1000000 ? "1M" : v.views >= 500000 ? "500K" : "100K";
      items.push({
        id: `act-mile-${i}`,
        type: "milestone",
        title: `Video hit ${milestone} views`,
        description: `"${v.title.slice(0, 50)}..."`,
        createdAt: new Date(now - (i + 2) * 86400000 * 3).toISOString(),
      });
    });

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function fmtDollars(n: number): string {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return "$" + (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return "$" + Math.round(n).toLocaleString();
}

function fmtViews(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toLocaleString();
}

export function generateSummary(demo: DemoData): string {
  const { members, videos, channel } = demo;

  const totalRecentViews = videos.reduce((s, v) => s + v.views, 0);
  const totalEstRevenue = videos.reduce((s, v) => s + (v.estimatedRevenue ?? 0), 0);
  const bestVideo = [...videos].sort((a, b) => b.views - a.views)[0];
  const topByViews = [...members].sort((a, b) => b.avgViews - a.avgViews)[0];

  const parts: string[] = [];

  // Lead with views and revenue
  if (totalRecentViews > 0 && totalEstRevenue > 0) {
    parts.push(
      `Your team generated an estimated ${fmtDollars(totalEstRevenue)} across ${videos.length} videos (${fmtViews(totalRecentViews)} total views at ~$${channel.estimatedRpm ?? 4} RPM).`
    );
  } else if (totalRecentViews > 0) {
    const avgViews = Math.round(totalRecentViews / videos.length);
    parts.push(
      `Across ${videos.length} recent videos, your team is averaging ${fmtViews(avgViews)} views per video.`
    );
  }

  // Highlight top performer by views
  if (topByViews) {
    parts.push(
      `${topByViews.name.split(" ")[0]}'s videos average ${fmtViews(topByViews.avgViews)} views — the highest on the team.`
    );
  }

  // Best video
  if (bestVideo) {
    const credits = bestVideo.credits.map(c => c.memberName.split(" ")[0]).join(" and ");
    const revStr = bestVideo.estimatedRevenue ? `, earning an estimated ${fmtDollars(bestVideo.estimatedRevenue)}` : "";
    parts.push(
      `Your top video hit ${fmtViews(bestVideo.views)} views${revStr}, credited to ${credits}.`
    );
  }

  // Cost efficiency insight
  const totalMemberRevenue = members.reduce((s, m) => s + (m.estimatedRevenueGenerated ?? 0), 0);
  if (totalMemberRevenue > 0) {
    const avgCostPerView = members.length > 0
      ? totalRecentViews / members.length
      : 0;
    if (avgCostPerView > 0) {
      parts.push(
        `Use the Pay Calculator to see each role's cost per view and whether they're worth the investment.`
      );
    }
  }

  return parts.join(" ");
}
