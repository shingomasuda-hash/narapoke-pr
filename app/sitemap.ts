import type { MetadataRoute } from "next";
import { shop } from "@/content/shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/morning", priority: 0.9 },
    { path: "/lunch", priority: 0.9 },
    { path: "/sweets", priority: 0.8 },
    { path: "/access", priority: 0.6 },
  ];

  return routes.map((route) => ({
    url: `${shop.siteUrl}${route.path}`,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
