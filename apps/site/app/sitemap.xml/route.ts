import { find } from "@/lib/strapi";
import { getServerSideSitemap } from "next-sitemap";

export async function GET(request: Request) {
   // *** site user
   const URL = process.env.NEXTAUTH_URL || "";

   // *** get all pages from strapi
   const { data: AllPages } = await find(
      "pages",
      {
         fields: ["slug"],
         publicationState: "live"
      },
      "no-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   // *** all pages formate for sitemap
   const pages = AllPages?.data?.map((page: any) => {
      return {
         loc: `${URL}/${page?.attributes?.slug}`,
         lastmod: new Date().toISOString(),
         changefreq: "weekly",
         priority: 0.9
      };
   });

   // ** get all ads from strapi
   const { data: AllAds } = await find(
      "manage-ads",
      {
         fields: ["slug"],
         publicationState: "live"
      },
      "force-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   // *** all ads formate for sitemap
   const ads = AllAds?.data?.map((ad: any) => {
      return {
         loc: `${URL}/ads/${ad?.attributes?.slug}`,
         lastmod: new Date().toISOString(),
         changefreq: "weekly",
         priority: 0.8
      };
   });

   // *** get all posts from strapi
   const { data: AllPosts } = await find(
      "posts",
      {
         fields: ["slug"],
         publicationState: "live"
      },
      "force-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   // *** all posts formate for sitemap
   const posts = AllPosts?.data?.map((post: any) => {
      return {
         loc: `${URL}/blog/${post?.attributes?.slug}`,
         lastmod: new Date().toISOString(),
         changefreq: "weekly",
         priority: 0.8
      };
   });

   return getServerSideSitemap([
      {
         loc: URL,
         lastmod: new Date().toISOString(),
         changefreq: "daily",
         priority: 1.0
      },
      ...pages,
      ...ads,
      ...posts,
      {
         loc: `${URL}/contact-us`,
         lastmod: new Date().toISOString(),
         changefreq: "weekly",
         priority: 0.7
      },
      {
         loc: `${URL}/signin`,
         lastmod: new Date().toISOString(),
         changefreq: "weekly",
         priority: 0.7
      },
      {
         loc: `${URL}/signup`,
         lastmod: new Date().toISOString(),
         changefreq: "weekly",
         priority: 0.7
      },
      {
         loc: `${URL}/forgot-password`,
         lastmod: new Date().toISOString(),
         changefreq: "weekly",
         priority: 0.7
      },
      {
         loc: `${URL}/reset-password`,
         lastmod: new Date().toISOString(),
         changefreq: "weekly",
         priority: 0.7
      },
      {
         loc: `${URL}/404`,
         lastmod: new Date().toISOString(),
         changefreq: "weekly",
         priority: 0.7
      }
   ]);
}
