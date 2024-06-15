import { find } from "@/lib/strapi";
import type { Metadata } from "next";
import PageBody from "./PageBody";

export const metadata: Metadata = {
   title: "Single Seller | AutoLister",
   description: "Single Seller page for the app"
};

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
