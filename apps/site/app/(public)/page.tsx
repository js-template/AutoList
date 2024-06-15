import blockComponentMapping from "@/lib/component.map";
import { find } from "@/lib/strapi";
import { StrapiSeoFormate } from "@/lib/strapiSeo";
import { getLanguageFromCookie } from "@/utils/language";
import type { Metadata } from "next";
import {} from "next/navigation";
import Script from "next/script";
import { Fragment } from "react";

// *** generate metadata for the page
export async function generateMetadata(): Promise<Metadata> {
   const language = getLanguageFromCookie();
   // fetch data
   const product = await find(
      "home-page",
      {
         populate: "deep",
         publicationState: "live",
         locale: [language]
      },
      "no-store",
      process.env.STRAPI_AUTH_TOKEN
   );

   return StrapiSeoFormate(product?.data?.data?.attributes?.seo);
}

export default async function HomePage() {
   const language = getLanguageFromCookie();

   const { data, error } = await find(
      "home-page",
      {
         populate: "deep",
         publicationState: "live",
         locale: [language]
      },
      "no-store",
      process.env.STRAPI_AUTH_TOKEN
   );

   const blocks = data?.data?.attributes?.blocks || [];

   if (error) {
      throw error;
   }

   return (
      <Fragment>
         {blocks?.map((block: any, index: number) => {
            const BlockConfig = blockComponentMapping[block.__component];

            if (BlockConfig) {
               const { component: ComponentToRender } = BlockConfig;

               return <ComponentToRender key={index} data={block} {...block} />;
            }
            return null; // Handle the case where the component mapping is missing
         })}
         {/* JSON_LD for SEO */}
         {data?.data?.attributes?.seo?.structuredData && (
            <Script
               id='json-ld-structured-data'
               type='application/ld+json'
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify(data?.data?.attributes?.seo?.structuredData)
               }}
            />
         )}
      </Fragment>
   );
}
