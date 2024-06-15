import { auth } from "@/context/auth";
import { find } from "@/lib/strapi";
import { getLanguageFromCookie } from "@/utils/language";
import type { Metadata } from "next";
import PageBody from "./PageBody";

export const metadata: Metadata = {
   title: "All Ads | AutoLister",
   description: "All Ads page for the app"
};

interface AdStatus {
   isApproved: boolean;
   isPublished: boolean;
   isFeatured: boolean;
   isActive: boolean;
}

const data: {
   ads: {
      status: {
         isApproved: boolean;
         isPublished: boolean;
         isFeatured: boolean;
         isActive: boolean;
      };
      priceDetails: {
         currency: string;
         priceType: string;
         price: number;
      };
      personalInfo: {
         fullName: string;
         email: string;
         phone: string;
         location: string;
      };
      _id: string;
      user: string;
      adTitle: string;
      slug: string;
      category: string;
      location: string;
      tags: string[];
      itemCondition: string;
      itemWarranty: string;
      adType: string;
      description: string;
      specifications: string[];
      adGallery: {
         url: string;
         public_id: string;
         _id: string;
      }[];
      specialNote: string;
      expireAt: string;
      adsReport: any[];
      createdAt: string;
      updatedAt: string;
      __v: number;
      adCoverImage?: string;
      adVideo?: string;
   }[];
   adsCount: number;
} = {
   ads: [
      {
         status: {
            isApproved: true,
            isPublished: true,
            isFeatured: false,
            isActive: true
         },
         priceDetails: {
            currency: "USD",
            priceType: "Fixed",
            price: 50000
         },
         personalInfo: {
            fullName: "Robert Joe",
            email: "robert56email@example.com",
            phone: "+12345678",
            location: "California"
         },
         _id: "655f13fbf1bde90ed1751c3d",
         user: "655275e93345e2a3f613e429",
         adTitle: "Used Furniture Pack",
         slug: "used-furniture-pack",
         category: "Furniture",
         location: "New York",
         tags: ["used", "home"],
         itemCondition: "Used",
         itemWarranty: "No",
         adType: "Sell",
         description: "Buy Used car",
         specifications: ["condition", "No warranty", "nice looking"],
         adGallery: [
            {
               url: "https://res.cloudinary.com/js-template/image/upload/v1700729851/jxvrfnhgsw6xqb8jblqo.jpg",
               public_id: "jxvrfnhgsw6xqb8jblqo",
               _id: "655f13fbf1bde90ed1751c3e"
            }
         ],
         specialNote: "Proactive Granite synthesize Gorgeous",
         expireAt: "2024-01-22T08:57:31.259Z",
         adsReport: [],
         createdAt: "2023-11-23T08:57:31.938Z",
         updatedAt: "2023-12-23T12:11:06.300Z",
         __v: 0
      }
      // ... (Other ad objects)
   ],
   adsCount: 8
};
// [FIXME]
const AdsPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
   const language = getLanguageFromCookie();
   const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
   const pageSize = 10;

   const session = await auth();

   const { data, error: AdsError } = await find(
      "manage-ads",
      {
         filters: {
            seller: session?.user?.id
         },
         populate: "deep",
         publicationState: "live",
         pagination: {
            page: page,
            pageSize: pageSize,
            withCount: true
         },
         sort: {
            createdAt: "desc"
         },
         locale: [language]
      },
      "no-store",
      session?.user?.jwtToken
   );

   if (AdsError) {
      throw AdsError;
   }

   return (
      <PageBody
         data={data?.data}
         metaTotal={data?.meta}
         userId={session?.user?.id}
         jwtToken={session?.user?.jwtToken}
      />
   );
};

export default AdsPage;
