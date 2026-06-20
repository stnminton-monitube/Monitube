import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY;
const YT = "https://www.googleapis.com/youtube/v3";

const TEAM = [
  { id: "m1", name: "Jake Morrison",    role: "editor",             joinPct: 0,    avatar: "J" },
  { id: "m2", name: "Sofia Chen",       role: "thumbnail_designer", joinPct: 0,    avatar: "S" },
  { id: "m3", name: "Marcus Williams",  role: "writer",             joinPct: 0.25, avatar: "M" },
  { id: "m4", name: "Priya Sharma",     role: "editor",             joinPct: 0.45, avatar: "P" },
  { id: "m5", name: "Tyler Brooks",     role: "assistant_editor",   joinPct: 0.6,  avatar: "T" },
  { id: "m6", name: "Rachel Kim",       role: "writer",             joinPct: 0.75, avatar: "R" },
];

function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
}

function simulateRetention(views: number, seed: number): number {
  const rng = seededRandom(seed);
  const base = 35 + rng() * 25;
  const viewBonus = Math.min(views / 500000, 10) * rng();
  return Math.round((base + viewBonus) * 10) / 10;
}

function simulateCtr(views: number, seed: number): number {
  const rng = seededRandom(seed);
  const base = 3 + rng() * 9;
  const viewBonus = Math.min(views / 1000000, 3) * rng();
  return Math.round((base + viewBonus) * 10) / 10;
}

function extractChannelInput(raw: string): { type: "id" | "handle" | "username"; value: string } | null {
  const trimmed = raw.trim();
  if (trimmed.startsWith("@")) return { type: "handle", value: trimmed };
  try {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    const path = url.pathname;
    const channelMatch = path.match(/\/channel\/(UC[\w-]+)/);
    if (channelMatch) return { type: "id", value: channelMatch[1] };
    const handleMatch = path.match(/\/@([\w.-]+)/);
    if (handleMatch) return { type: "handle", value: `@${handleMatch[1]}` };
    const userMatch = path.match(/\/user\/([\w.-]+)/);
    if (userMatch) return { type: "username", value: userMatch[1] };
    const cMatch = path.match(/\/c\/([\w.-]+)/);
    if (cMatch) return { type: "handle", value: `@${cMatch[1]}` };
  } catch { /* not a URL */ }
  if (trimmed.startsWith("UC") && trimmed.length === 24) return { type: "id", value: trimmed };
  return { type: "handle", value: trimmed.startsWith("@") ? trimmed : `@${trimmed}` };
}

async function resolveChannelId(input: ReturnType<typeof extractChannelInput>): Promise<string | null> {
  if (!input) return null;
  if (input.type === "id") return input.value;
  if (input.type === "handle") {
    const res = await fetch(`${YT}/channels?part=id&forHandle=${encodeURIComponent(input.value)}&key=${API_KEY}`);
    const data = await res.json();
    return data.items?.[0]?.id ?? null;
  }
  const res = await fetch(`${YT}/channels?part=id&forUsername=${encodeURIComponent(input.value)}&key=${API_KEY}`);
  const data = await res.json();
  return data.items?.[0]?.id ?? null;
}

export async function POST(req: NextRequest) {
  if (!API_KEY) return NextResponse.json({ error: "YouTube API key not configured" }, { status: 500 });

  const { query } = await req.json();
  if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

  const input = extractChannelInput(query);
  const channelId = await resolveChannelId(input);
  if (!channelId) return NextResponse.json({ error: "Channel not found" }, { status: 404 });

  // Fetch channel info
  const chRes = await fetch(`${YT}/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`);
  const chData = await chRes.json();
  const ch = chData.items?.[0];
  if (!ch) return NextResponse.json({ error: "Channel not found" }, { status: 404 });

  // Fetch up to 50 recent videos
  const searchRes = await fetch(
    `${YT}/search?part=id&channelId=${channelId}&order=date&maxResults=50&type=video&key=${API_KEY}`
  );
  const searchData = await searchRes.json();
  const videoIds = (searchData.items ?? []).map((v: { id: { videoId: string } }) => v.id.videoId);

  if (videoIds.length === 0) return NextResponse.json({ error: "No videos found on this channel" }, { status: 404 });

  // Fetch video details in batches of 50
  const videosRes = await fetch(
    `${YT}/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(",")}&key=${API_KEY}`
  );
  const videosData = await videosRes.json();

  // Sort oldest → newest for realistic team growth
  const rawVideos = (videosData.items ?? []).sort(
    (a: { snippet: { publishedAt: string } }, b: { snippet: { publishedAt: string } }) =>
      new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime()
  );

  const totalVideos = rawVideos.length;

  // Build credited videos with simulated stats and team assignments
  const videos = rawVideos.map((v: {
    id: string;
    snippet: { title: string; thumbnails: { medium: { url: string } }; publishedAt: string };
    statistics: { viewCount?: string; likeCount?: string; commentCount?: string };
    contentDetails: { duration?: string };
  }, i: number) => {
    const views = parseInt(v.statistics.viewCount ?? "0");
    const likes = parseInt(v.statistics.likeCount ?? "0");
    const comments = parseInt(v.statistics.commentCount ?? "0");
    const retention = simulateRetention(views, views + i * 7);
    const ctr = simulateCtr(views, views + i * 13);

    // Parse duration to determine content type
    const dur = v.contentDetails?.duration ?? "";
    const minMatch = dur.match(/(\d+)M/);
    const mins = minMatch ? parseInt(minMatch[1]) : 0;
    const contentType = mins >= 10 ? "long_form" : mins > 0 ? "short_form" : "shorts";

    // Determine which team members were "hired" by this video
    const progress = totalVideos > 1 ? i / (totalVideos - 1) : 1;
    const activeMembers = TEAM.filter(m => progress >= m.joinPct);

    // Assign credits
    const credits: Array<{ memberId: string; memberName: string; role: string; weight: number }> = [];
    const editors = activeMembers.filter(m => m.role === "editor");
    const writers = activeMembers.filter(m => m.role === "writer");
    const designers = activeMembers.filter(m => m.role === "thumbnail_designer");
    const assistants = activeMembers.filter(m => m.role === "assistant_editor");

    if (editors.length === 1) {
      credits.push({ memberId: editors[0].id, memberName: editors[0].name, role: "editor", weight: 100 });
    } else if (editors.length > 1) {
      // Alternate primary editor, or split
      const rng = seededRandom(views + i);
      if (rng() > 0.4) {
        const primary = editors[i % editors.length];
        credits.push({ memberId: primary.id, memberName: primary.name, role: "editor", weight: 100 });
      } else {
        credits.push({ memberId: editors[0].id, memberName: editors[0].name, role: "editor", weight: 60 });
        credits.push({ memberId: editors[1].id, memberName: editors[1].name, role: "editor", weight: 40 });
      }
    }

    designers.forEach(d => {
      credits.push({ memberId: d.id, memberName: d.name, role: "thumbnail_designer", weight: 100 });
    });

    if (writers.length > 0) {
      const writer = writers[i % writers.length];
      credits.push({ memberId: writer.id, memberName: writer.name, role: "writer", weight: 100 });
    }

    if (assistants.length > 0 && seededRandom(views)() > 0.3) {
      credits.push({ memberId: assistants[0].id, memberName: assistants[0].name, role: "assistant_editor", weight: 100 });
    }

    const watchTimeHours = Math.round((views * (retention / 100) * mins) / 60 * 10) / 10;

    return {
      id: v.id,
      title: v.snippet.title,
      thumbnail: v.snippet.thumbnails.medium.url,
      publishedAt: v.snippet.publishedAt,
      views,
      likes,
      comments,
      retention,
      ctr,
      contentType,
      watchTimeHours,
      estimatedRevenue: 0, // placeholder, calculated after RPM is determined
      credits,
    };
  });

  // Calculate per-member aggregate stats
  const members = TEAM.map(member => {
    const creditedVideos = videos.filter(
      (v: { credits: Array<{ memberId: string }> }) => v.credits.some((c: { memberId: string }) => c.memberId === member.id)
    );
    const videoCount = creditedVideos.length;

    if (videoCount === 0) return null;

    const totalViews = creditedVideos.reduce((sum: number, v: { views: number }) => sum + v.views, 0);
    const avgViews = Math.round(totalViews / videoCount);
    const avgRetention = Math.round(
      creditedVideos.reduce((sum: number, v: { retention: number }) => sum + v.retention, 0) / videoCount * 10
    ) / 10;
    const avgCtr = Math.round(
      creditedVideos.reduce((sum: number, v: { ctr: number }) => sum + v.ctr, 0) / videoCount * 10
    ) / 10;
    const totalWatchTime = Math.round(
      creditedVideos.reduce((sum: number, v: { watchTimeHours: number }) => sum + v.watchTimeHours, 0)
    );

    // Trend: compare last 5 credited videos vs previous 5
    let trend: "up" | "down" | "stable" = "stable";
    if (videoCount >= 6) {
      const recent = creditedVideos.slice(-5);
      const previous = creditedVideos.slice(-10, -5);
      if (previous.length > 0) {
        const recentAvg = recent.reduce((s: number, v: { views: number }) => s + v.views, 0) / recent.length;
        const prevAvg = previous.reduce((s: number, v: { views: number }) => s + v.views, 0) / previous.length;
        trend = recentAvg > prevAvg * 1.05 ? "up" : recentAvg < prevAvg * 0.95 ? "down" : "stable";
      }
    }

    const joinedVideoIndex = videos.findIndex(
      (v: { credits: Array<{ memberId: string }> }) => v.credits.some((c: { memberId: string }) => c.memberId === member.id)
    );
    const joinedAt = joinedVideoIndex >= 0 ? videos[joinedVideoIndex].publishedAt : videos[0].publishedAt;

    return {
      id: member.id,
      name: member.name,
      role: member.role,
      avatar: member.avatar,
      joinedAt,
      videosCredited: videoCount,
      avgViews,
      avgRetention,
      avgCtr,
      totalWatchTime,
      trend,
    };
  }).filter(Boolean);

  // Channel-wide averages
  const channelAvgRetention = videos.length > 0
    ? Math.round(videos.reduce((s: number, v: { retention: number }) => s + v.retention, 0) / videos.length * 10) / 10
    : 0;
  const channelAvgCtr = videos.length > 0
    ? Math.round(videos.reduce((s: number, v: { ctr: number }) => s + v.ctr, 0) / videos.length * 10) / 10
    : 0;

  // Estimate RPM based on channel size (larger channels tend to have higher RPMs)
  const subscribers = parseInt(ch.statistics.subscriberCount ?? "0");
  const rpmRng = seededRandom(subscribers + 42);
  const rpmBase = subscribers >= 5_000_000 ? 5 : subscribers >= 1_000_000 ? 4 : subscribers >= 100_000 ? 3.5 : 2.5;
  const estimatedRpm = Math.round((rpmBase + rpmRng() * 3) * 100) / 100;

  // Calculate estimated revenue for each video
  videos.forEach((v: { views: number; estimatedRevenue: number }) => {
    v.estimatedRevenue = Math.round((v.views / 1000) * estimatedRpm * 100) / 100;
  });

  const totalEstimatedRevenue = Math.round(
    videos.reduce((s: number, v: { estimatedRevenue: number }) => s + v.estimatedRevenue, 0) * 100
  ) / 100;

  // Add estimated revenue generated per member
  const membersWithRevenue = (members as Array<{ id: string; name: string; role: string; avatar: string; joinedAt: string; videosCredited: number; avgViews: number; avgRetention: number; avgCtr: number; totalWatchTime: number; trend: "up" | "down" | "stable" }>).map(member => {
    const creditedVideos = videos.filter(
      (v: { credits: Array<{ memberId: string; weight: number }> }) =>
        v.credits.some((c: { memberId: string }) => c.memberId === member.id)
    );
    const revenueGenerated = creditedVideos.reduce(
      (sum: number, v: { estimatedRevenue: number; credits: Array<{ memberId: string; weight: number }> }) => {
        const credit = v.credits.find((c: { memberId: string }) => c.memberId === member.id);
        return sum + (v.estimatedRevenue * ((credit?.weight ?? 100) / 100));
      },
      0
    );
    return {
      ...member,
      estimatedRevenueGenerated: Math.round(revenueGenerated * 100) / 100,
    };
  });

  return NextResponse.json({
    channel: {
      id: channelId,
      name: ch.snippet.title,
      thumbnail: ch.snippet.thumbnails?.medium?.url,
      subscribers,
      totalViews: parseInt(ch.statistics.viewCount ?? "0"),
      videoCount: parseInt(ch.statistics.videoCount ?? "0"),
      avgRetention: channelAvgRetention,
      avgCtr: channelAvgCtr,
      estimatedRpm,
      totalEstimatedRevenue,
    },
    members: membersWithRevenue,
    videos,
  });
}
