import { find } from "@/lib/strapi";
import type { Metadata, ResolvingMetadata } from "next";
import PageBody from "./PageBody";

// *** generate metadata type
type Props = {
   params: { userName: string };
   searchParams: { [key: string]: string | string[] | undefined };
};

// *** generate metadata for the page
export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const pageSlug = params?.userName;

   // *** fetch seller data by username
   const { data: sellerData } = await find(
      "users",
      {
         filters: {
            username: {
               $containsi: pageSlug
            }
         },
         populate: "deep",
         publicationState: "live",
         locale: ["en"]
      },
      "no-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   // *** if seller data not found, return 404
   if (!sellerData?.[0]) {
      return {
         title: "Seller not found | Autolist",
         description: "Seller not found"
      };
   }

   return {
      title: `${sellerData?.[0]?.username} | Autolist`,
      description: `Ads by ${sellerData?.[0]?.username}`
   };
}

const SingleSeller = async ({ params }: { params: { userName: string } }) => {
   const userName = params?.userName;

   const userFilters = {} as {
      username?: { $containsi: string };
   };

   if (userName) {
      userFilters.username = {
         $containsi: userName
      };
   }
   // fetch seller data by username
   const { data: sellerData } = await find(
      "users",
      {
         filters: userFilters,
         populate: "deep",
         publicationState: "live",
         locale: ["en"]
      },
      "no-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   const filters = {} as {
      seller?: { id: number };
   };

   if (userName) {
      filters.seller = {
         id: sellerData?.[0]?.id
      };
   }
   // fetch seller ads data by seller id
   const { data, error } = await find(
      "manage-ads",
      {
         filters,
         populate: "deep",
         publicationState: "live",
         locale: ["en"]
      },
      "force-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   return <PageBody adsData={sellerData?.[0] ? data?.data : []} metaTotal={data?.meta} sellerData={sellerData?.[0]} />;
};

export default SingleSeller;
