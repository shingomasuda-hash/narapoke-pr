import type { MetadataRoute } from "next";
import { shop } from "@/content/shop";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${shop.siteUrl}/sitemap.xml`,
  };
}
