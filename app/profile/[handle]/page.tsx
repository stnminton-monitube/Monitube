import Link from "next/link";

/* ───────────────────────── Demo Data ───────────────────────── */

interface ProfileData {
  name: string;
  initial: string;
  role: string;
  channelName: string;
  bio: string;
  handle: string;
  videosCredited: number;
  totalViews: number;
  channelsVerified: number;
  joinDate: string;
  endDate: string;
  niches: string[];
  availableForWork: boolean;
  featuredVideos: {
    title: string;
    views: number;
    date: string;
  }[];
}

const PROFILES: Record<string, ProfileData> = {
  jake: {
    name: "Jake Morrison",
    initial: "J",
    role: "Editor",
    channelName: "MrBeast",
    bio: "Full-time editor specializing in fast-paced, retention-optimized content. 4+ years editing for top-tier creators in the gaming and challenge space.",
    handle: "jake",
    videosCredited: 25,
    totalViews: 2_400_000,
    channelsVerified: 1,
    joinDate: "Jan 2023",
    endDate: "Present",
    niches: ["Gaming", "True Crime", "Long-form"],
    availableForWork: true,
    featuredVideos: [
      { title: "I Spent 50 Hours Investigating a Cold Case Nobody Talks About", views: 482_000, date: "Mar 2025" },
      { title: "The Disappearance That Changed Everything in This Small Town", views: 371_000, date: "Feb 2025" },
      { title: "We Found Evidence the Police Missed for 15 Years", views: 298_000, date: "Jan 2025" },
      { title: "This Unsolved Mystery Has a Terrifying Hidden Detail", views: 256_000, date: "Dec 2024" },
      { title: "The True Story Behind the Most Famous Heist in History", views: 441_000, date: "Nov 2024" },
      { title: "Why This 30-Year-Old Case Was Just Reopened", views: 312_000, date: "Oct 2024" },
    ],
  },
  sofia: {
    name: "Sofia Chen",
    initial: "S",
    role: "Thumbnail Designer",
    channelName: "MrBeast",
    bio: "Thumbnail designer with a focus on high-CTR visuals. Expert in facial expression photography, bold typography, and A/B testing thumbnail variants.",
    handle: "sofia",
    videosCredited: 30,
    totalViews: 3_100_000,
    channelsVerified: 1,
    joinDate: "Mar 2022",
    endDate: "Present",
    niches: ["Gaming", "True Crime", "Long-form"],
    availableForWork: true,
    featuredVideos: [
      { title: "I Survived 100 Days in an Abandoned Prison", views: 612_000, date: "Mar 2025" },
      { title: "We Tested Every Survival Myth to See What Actually Works", views: 534_000, date: "Feb 2025" },
      { title: "The Scariest Place I Have Ever Filmed", views: 389_000, date: "Jan 2025" },
      { title: "24 Hours Inside the World's Most Secure Building", views: 467_000, date: "Dec 2024" },
      { title: "I Challenged a Pro Gamer and This Happened", views: 521_000, date: "Nov 2024" },
      { title: "This Thumbnail Hack Doubled Our CTR Overnight", views: 278_000, date: "Oct 2024" },
    ],
  },
  marcus: {
    name: "Marcus Williams",
    initial: "M",
    role: "Writer",
    channelName: "MrBeast",
    bio: "Scriptwriter focused on narrative-driven YouTube content. Strong background in true crime research and long-form storytelling.",
    handle: "marcus",
    videosCredited: 18,
    totalViews: 1_800_000,
    channelsVerified: 1,
    joinDate: "Jun 2023",
    endDate: "Present",
    niches: ["True Crime", "Documentary", "Long-form"],
    availableForWork: true,
    featuredVideos: [
      { title: "The Case That Fooled Every Detective for a Decade", views: 342_000, date: "Mar 2025" },
      { title: "What Really Happened the Night of the Break-In", views: 287_000, date: "Feb 2025" },
      { title: "I Interviewed the Only Witness and They Changed Their Story", views: 195_000, date: "Jan 2025" },
      { title: "The Hidden Clue Everyone Overlooked in This Famous Case", views: 231_000, date: "Dec 2024" },
      { title: "How a Tiny Detail Solved a 20-Year Mystery", views: 318_000, date: "Nov 2024" },
      { title: "This Criminal Left One Mistake That Ruined Everything", views: 189_000, date: "Oct 2024" },
    ],
  },
  priya: {
    name: "Priya Sharma",
    initial: "P",
    role: "Editor",
    channelName: "MrBeast",
    bio: "Editor with experience in documentary-style pacing. Skilled in color grading, sound design, and retention-focused editing techniques.",
    handle: "priya",
    videosCredited: 14,
    totalViews: 1_200_000,
    channelsVerified: 1,
    joinDate: "Sep 2023",
    endDate: "Present",
    niches: ["Gaming", "True Crime", "Long-form"],
    availableForWork: true,
    featuredVideos: [
      { title: "We Recreated the Crime Scene to Find the Truth", views: 267_000, date: "Mar 2025" },
      { title: "The Most Chilling 911 Call Ever Recorded", views: 198_000, date: "Feb 2025" },
      { title: "Inside the Investigation That Shocked a Nation", views: 156_000, date: "Jan 2025" },
      { title: "A New Lead Just Surfaced in This Cold Case", views: 213_000, date: "Dec 2024" },
      { title: "The Interrogation Tape They Did Not Want You to See", views: 178_000, date: "Nov 2024" },
      { title: "How Forensics Finally Cracked This Impossible Case", views: 142_000, date: "Oct 2024" },
    ],
  },
  tyler: {
    name: "Tyler Brooks",
    initial: "T",
    role: "Asst. Editor",
    channelName: "MrBeast",
    bio: "Assistant editor handling rough cuts, footage organization, and assembly edits. Fast turnaround with strong attention to timeline structure.",
    handle: "tyler",
    videosCredited: 10,
    totalViews: 850_000,
    channelsVerified: 1,
    joinDate: "Jan 2024",
    endDate: "Present",
    niches: ["Gaming", "True Crime", "Long-form"],
    availableForWork: true,
    featuredVideos: [
      { title: "I Tracked Down the Person Behind the Anonymous Tip", views: 178_000, date: "Mar 2025" },
      { title: "The Evidence Locker Had One Item Nobody Checked", views: 145_000, date: "Feb 2025" },
      { title: "Why the Original Investigation Went Completely Wrong", views: 112_000, date: "Jan 2025" },
      { title: "A Retired Detective Revealed What Really Happened", views: 134_000, date: "Dec 2024" },
      { title: "The Surveillance Footage That Changed the Case", views: 156_000, date: "Nov 2024" },
      { title: "We Found a Connection No One Else Noticed", views: 98_000, date: "Oct 2024" },
    ],
  },
  rachel: {
    name: "Rachel Kim",
    initial: "R",
    role: "Writer",
    channelName: "MrBeast",
    bio: "Research-driven scriptwriter with a knack for turning complex stories into engaging, binge-worthy content. Background in journalism.",
    handle: "rachel",
    videosCredited: 8,
    totalViews: 620_000,
    channelsVerified: 1,
    joinDate: "Apr 2024",
    endDate: "Present",
    niches: ["True Crime", "Documentary", "Long-form"],
    availableForWork: true,
    featuredVideos: [
      { title: "The Podcast Host Who Accidentally Solved a Murder", views: 134_000, date: "Mar 2025" },
      { title: "Every Detail About This Case Was Wrong", views: 112_000, date: "Feb 2025" },
      { title: "She Disappeared Without a Trace Until Now", views: 89_000, date: "Jan 2025" },
      { title: "The Witness Protection Story Nobody Believed", views: 97_000, date: "Dec 2024" },
      { title: "How a DNA Match Rewrote an Entire Investigation", views: 105_000, date: "Nov 2024" },
      { title: "The Letter That Arrived 10 Years After the Crime", views: 78_000, date: "Oct 2024" },
    ],
  },
};

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

const ROLE_COLORS: Record<string, string> = {
  Editor: "bg-purple-50 text-purple-700 border-purple-200",
  "Thumbnail Designer": "bg-pink-50 text-pink-700 border-pink-200",
  Writer: "bg-blue-50 text-blue-700 border-blue-200",
  "Asst. Editor": "bg-orange-50 text-orange-700 border-orange-200",
};

/* ───────────────────────── Page ───────────────────────── */

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const profile = PROFILES[handle];

  if (!profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-zinc-400">?</span>
          </div>
          <h1 className="font-heading text-xl font-medium text-zinc-900 mb-2">
            Profile not found
          </h1>
          <p className="text-[13px] text-zinc-500 mb-6">
            We couldn&apos;t find a profile for @{handle}.
          </p>
          <Link
            href="/"
            className="text-[13px] text-[#7B6EF6] hover:text-[#6358d4] transition-colors"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Top Bar ─── */}
      <header className="border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center">
              <span className="text-white text-[11px] font-bold font-heading">M</span>
            </div>
            <span className="font-heading text-[15px] font-semibold text-zinc-900">
              Monitube
            </span>
          </Link>
          <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-3 py-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7B6EF6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[11px] font-medium text-purple-700">
              Verified Profile
            </span>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left column */}
          <div className="md:col-span-2">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7B6EF6] to-[#E96BF5] flex items-center justify-center text-white text-3xl font-semibold font-heading shrink-0">
                {profile.initial}
              </div>
              <div>
                <h1 className="font-heading text-3xl font-medium tracking-tight text-zinc-900">
                  {profile.name}
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                      ROLE_COLORS[profile.role] ?? "bg-zinc-50 text-zinc-600 border-zinc-200"
                    }`}
                  >
                    {profile.role}
                  </span>
                  <span className="text-[12px] text-zinc-400">
                    Verified by{" "}
                    <span className="text-zinc-600 font-medium">{profile.channelName}</span>
                  </span>
                </div>
                <p className="text-[13px] text-zinc-500 mt-3 leading-relaxed max-w-lg">
                  {profile.bio}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Available for work
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {profile.niches.map((niche) => (
                    <span
                      key={niche}
                      className="text-[11px] font-medium px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200"
                    >
                      {niche}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column — stats */}
          <div>
            <div className="rounded-2xl border border-zinc-200 p-6">
              <p className="font-heading text-4xl font-medium tracking-tight text-zinc-900">
                {fmt(profile.totalViews)}
              </p>
              <p className="text-[13px] text-zinc-500 mt-1">total views</p>

              <div className="border-t border-zinc-100 mt-4 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-zinc-500">Videos credited</span>
                  <span className="text-[13px] font-medium font-mono text-zinc-900">
                    {profile.videosCredited}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-zinc-500">Channels verified</span>
                  <span className="text-[13px] font-medium font-mono text-zinc-900">
                    {profile.channelsVerified}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-zinc-400 mt-4 leading-relaxed">
                All stats verified by channel owner
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Verified Channels ─── */}
      <section className="max-w-5xl mx-auto px-6 pb-10">
        <h2 className="font-heading text-lg font-medium text-zinc-900 mb-4">
          Verified Channels
        </h2>
        <div className="rounded-2xl border border-zinc-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium text-zinc-900">{profile.channelName}</p>
              <p className="text-[12px] text-zinc-500 mt-0.5">
                {profile.role} &middot; {profile.joinDate} &ndash; {profile.endDate}
              </p>
            </div>
            <div className="flex items-center gap-6 text-right">
              <div>
                <p className="text-[12px] text-zinc-400">Videos</p>
                <p className="text-[14px] font-medium font-mono text-zinc-900">
                  {profile.videosCredited}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-zinc-400">Total Views</p>
                <p className="text-[14px] font-medium font-mono text-zinc-900">
                  {fmt(profile.totalViews)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Videos ─── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="font-heading text-lg font-medium text-zinc-900 mb-4">
          Featured Videos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.featuredVideos.map((video, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 overflow-hidden hover:border-zinc-300 transition-colors"
            >
              {/* Placeholder thumbnail */}
              <div className="aspect-video bg-zinc-100 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d4d4d8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className="p-3">
                <p className="text-[12px] font-medium text-zinc-900 leading-snug line-clamp-2">
                  {video.title}
                </p>
                <p className="text-[11px] text-zinc-400 mt-1.5">
                  <span className="font-mono">{fmt(video.views)}</span> views &middot;{" "}
                  {video.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <p className="text-[11px] text-zinc-400">
            Powered by{" "}
            <Link href="/" className="text-[#7B6EF6] hover:text-[#6358d4] transition-colors">
              Monitube
            </Link>
          </p>
          <p className="text-[11px] text-zinc-400 font-mono">
            monitube.work/@{profile.handle}
          </p>
        </div>
      </footer>
    </div>
  );
}
