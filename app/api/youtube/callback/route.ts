import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/youtube/callback`;

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code || !CLIENT_ID || !CLIENT_SECRET) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/calculator?error=auth_failed`);
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokens.access_token) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/calculator?error=token_failed`);
  }

  // Fetch channel info
  const channelRes = await fetch(
    "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
    { headers: { Authorization: `Bearer ${tokens.access_token}` } }
  );
  const channelData = await channelRes.json();
  const channel = channelData.items?.[0];

  // Fetch revenue data from YouTube Analytics
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000);
  const startDate = thirtyDaysAgo.toISOString().split("T")[0];
  const endDate = now.toISOString().split("T")[0];

  const analyticsRes = await fetch(
    `https://youtubeanalytics.googleapis.com/v2/reports?` +
    `ids=channel==MINE&startDate=${startDate}&endDate=${endDate}` +
    `&metrics=estimatedRevenue,views,estimatedMinutesWatched` +
    `&dimensions=month`,
    { headers: { Authorization: `Bearer ${tokens.access_token}` } }
  );
  const analyticsData = await analyticsRes.json();

  let rpm = 4;
  let monthlyRevenue = 0;
  let monthlyViews = 0;

  if (analyticsData.rows && analyticsData.rows.length > 0) {
    const lastMonth = analyticsData.rows[analyticsData.rows.length - 1];
    monthlyRevenue = lastMonth[1] ?? 0;
    monthlyViews = lastMonth[2] ?? 0;
    rpm = monthlyViews > 0 ? (monthlyRevenue / monthlyViews) * 1000 : 4;
  }

  // Store data in a cookie so the calculator can read it
  const ytData = JSON.stringify({
    channelName: channel?.snippet?.title ?? "",
    channelId: channel?.id ?? "",
    subscribers: parseInt(channel?.statistics?.subscriberCount ?? "0"),
    rpm: Math.round(rpm * 100) / 100,
    monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
    monthlyViews,
    connectedAt: new Date().toISOString(),
  });

  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/calculator?connected=true`);
  response.cookies.set("yt_channel_data", ytData, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}
