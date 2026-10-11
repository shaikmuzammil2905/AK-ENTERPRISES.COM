import { MetadataRoute } from "next";
import { getProducts } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://akenterprisecorp.in";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/export-supply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const products = await getProducts(true);
    const productRoutes: MetadataRoute.Sitemap = (products || []).map(
      (product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      })
    );

    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
