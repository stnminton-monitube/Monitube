export function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /api
Sitemap: https://monitube.work/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
