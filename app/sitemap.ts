import type { MetadataRoute } from "next";
import { cars } from "@/data/cars";
import { guides } from "@/data/guides";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", "/cars", "/guide", "/calculator", "/compare", "/credit", "/about", ...cars.map((c) => `/cars/${c.slug}`), ...guides.map((g) => `/guide/${g.slug}`)];
  return paths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: "weekly", priority: path === "" ? 1 : 0.7 }));
}
