import _ from "lodash";
import Markdown from "react-markdown";

import SidebarPostCard from "@/components/widget/sidebar/post.server";
import { find } from "@/lib/strapi";
import { StrapiSeoFormate } from "@/lib/strapiSeo";
import ImageOpt from "@/optimize/image";
import { getLanguageFromCookie } from "@/utils/language";
import type { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";
import { Fragment } from "react";

// *** generate metadata type
type Props = {
   params: { slug: string };
   searchParams: { [key: string]: string | string[] | undefined };
};

// *** generate metadata for the page
export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const pageSlug = params?.slug;
   const language = getLanguageFromCookie();
   // fetch data
   const { data } = await find(
      "posts",
      {
         filters: {
            slug: {
               $eq: pageSlug
            }
         },
         populate: "deep",
         publicationState: "live",
         locale: [language]
      },
      "force-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   return StrapiSeoFormate(data?.data[0]?.attributes?.seo, `/blog/${pageSlug}`);
}

const BlogDetails = async ({ params }: { params: { slug: string } }) => {
   const pageSlug = params.slug || "";
   const language = getLanguageFromCookie();

   // *** single page data fetch ***
   const { data, error } = await find(
      "posts",
      {
         filters: {
            slug: {
               $eq: pageSlug
            }
         },
         populate: "deep",
         publicationState: "live",
         locale: [language]
      },
      "force-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   // *** Latest Topic data fetch ***
   const { data: postData, error: postError } = await find(
      "posts",
      {
         populate: "deep",
         publicationState: "live",
         locale: [language]
      },
      "force-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   // *** if error, return error page ***
   if (error || postError) {
      throw error || postError;
   }

   const { title, description, featuredImage } = data?.data[0]?.attributes || {};

   const image = _.get(featuredImage, "data.attributes.formats.large.url", null);

   return (
      <Fragment>
         <section className='bg-success-content'>
            <div className='container mx-auto py-14 pb-28 px-5 sm:px-0'>
               <div className='grid grid-cols-10 justify-center gap-7'>
                  <div className='col-span-10 md:col-span-7'>
                     <div className='bg-white rounded-2xl p-7 shadow-sectionShadow'>
                        {title && <h1 className='text-3xl font-bold text-neutral truncate py-7'>{title}</h1>}

                        <ImageOpt
                           src={image ?? "/avatar.png"}
                           width={810}
                           height={540}
                           layout='responsive'
                           noPlaceholder={true}
                           alt={undefined}
                           className={undefined}
                        />

                        {description && (
                           <div className='pt-4 text-lg text-base-300'>{<Markdown>{description}</Markdown>}</div>
                        )}
                     </div>
                     {/* <Comments /> */}
                  </div>

                  <div className='col-span-8 md:col-span-3'>
                     <h2 className='text-2xl font-bold text-neutral mt-8 mb-3'>Latest Topic</h2>
                     {postData &&
                        postData?.data?.map((item: any, index: number) => <SidebarPostCard key={index} item={item} />)}
                  </div>
               </div>
            </div>
         </section>
         {/* JSON_LD for SEO */}
         {data?.data[0]?.attributes?.seo?.structuredData && (
            <Script
               id='json-ld-structured-data'
               type='application/ld+json'
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify(data?.data[0]?.attributes?.seo?.structuredData)
               }}
            />
         )}
      </Fragment>
   );
};

export default BlogDetails;
