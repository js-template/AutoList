import PackageItem from "@/components/package-item";
import { auth } from "@/context/auth";
import { find } from "@/lib/strapi";
import { getLanguageFromCookie } from "@/utils/language";
import _ from "lodash";
import type { Metadata } from "next";
import { User } from "next-auth";

export const metadata: Metadata = {
   title: "Membership | AutoLister",
   description: "Membership page for the app"
};

const MembershipPage = async () => {
   const language = getLanguageFromCookie();
   const session = await auth();
   const { data: membershipData, error: membershipError } = await find(
      "packages",
      {
         populate: "deep",
         publicationState: "live",
         locale: [language]
      },
      "no-cache",
      session?.user?.jwtToken as string
   );

   // *** if error, return error page ***
   if (membershipError) {
      throw membershipError;
   }

   return (
      <section>
         <div className='pb-32'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 pt-12'>
               {/* Single package */}
               {_.map(membershipData?.data, (item, index) => (
                  <PackageItem key={index} item={item} user={session?.user as User} />
               ))}
            </div>
         </div>
      </section>
   );
};

export default MembershipPage;
