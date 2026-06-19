import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY;
const YT = "https://www.googleapis.com/youtube/v3";

function extractChannelInput(raw: string): { type: "id" | "handle" | "username"; value: string } | null {
  const trimmed = raw.trim();

  // @handle
  if (trimmed.startsWith("@")) return { type: "handle", value: trimmed };

  // Full URL patterns
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

  // Raw channel ID
  if (trimmed.startsWith("UC") && trimmed.length === 24) return { type: "id", value: trimmed };

  // Treat as handle
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
  if (!query || typeof query !== "string") return NextResponse.json({ error: "Missing query" }, { status: 400 });

  const input = extractChannelInput(query);
  const channelId = await resolveChannelId(input);
  if (!channelId) return NextResponse.json({ error: "Channel not found. Try pasting the full YouTube channel URL." }, { status: 404 });

  // Fetch channel details
  const channelRes = await fetch(
    `${YT}/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${API_KEY}`
  );
  const channelData = await channelRes.json();
  const channel = channelData.items?.[0];
  if (!channel) return NextResponse.json({ error: "Channel not found" }, { status: 404 });

  // Fetch recent videos
  const searchRes = await fetch(
    `${YT}/search?part=id&channelId=${channelId}&order=date&maxResults=12&type=video&key=${API_KEY}`
  );
  const searchData = await searchRes.json();
  const videoIds = (searchData.items ?? []).map((v: { id: { videoId: string } }) => v.id.videoId).join(",");

  let videos: Array<{
    id: string; title: string; thumbnail: string; publishedAt: string;
    views: number; likes: number; comments: number;
  }> = [];

  if (videoIds) {
    const videosRes = await fetch(
      `${YT}/videos?part=snippet,statistics&id=${videoIds}&key=${API_KEY}`
    );
    const videosData = await videosRes.json();
    videos = (videosData.items ?? []).map((v: {
      id: string;
      snippet: { title: string; thumbnails: { medium: { url: string } }; publishedAt: string };
      statistics: { viewCount?: string; likeCount?: string; commentCount?: string };
    }) => ({
      id: v.id,
      title: v.snippet.title,
      thumbnail: v.snippet.thumbnails.medium.url,
      publishedAt: v.snippet.publishedAt,
      views: parseInt(v.statistics.viewCount ?? "0"),
      likes: parseInt(v.statistics.likeCount ?? "0"),
      comments: parseInt(v.statistics.commentCount ?? "0"),
    }));
  }

  const stats = channel.statistics;
  const totalViews = parseInt(stats.viewCount ?? "0");
  const subscribers = parseInt(stats.subscriberCount ?? "0");
  const videoCount = parseInt(stats.videoCount ?? "0");
  const avgViews = videoCount > 0 ? Math.round(totalViews / videoCount) : 0;

  return NextResponse.json({
    channel: {
      id: channelId,
      name: channel.snippet.title,
      description: channel.snippet.description?.slice(0, 200),
      thumbnail: channel.snippet.thumbnails?.medium?.url,
      subscribers,
      totalViews,
      videoCount,
      avgViews,
    },
    videos,
  });
}
