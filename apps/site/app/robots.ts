import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
   return {
      rules: {
         userAgent: "*",
         allow: "/",
         disallow: ["/api", "/_next", "/auth", "/dashboard", "/_error"]
      },
      sitemap: `${process.env.NEXTAUTH_URL || ""}/sitemap.xml`
   };
}
