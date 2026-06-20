import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://monitube.work", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://monitube.work/calculator", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://monitube.work/faq", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://monitube.work/sign-in", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://monitube.work/sign-up", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
