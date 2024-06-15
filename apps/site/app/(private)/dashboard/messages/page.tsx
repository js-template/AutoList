import Messages from "@/components/messages";
import { auth } from "@/context/auth";
import { find } from "@/lib/strapi";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Messages | AutoLister",
   description: "Messages page for the app"
};

const MassagesPage = async () => {
   // *** get user session ***
   const session = await auth();
   // *** get messages ***
   const { data: messagesData, error } = await find(
      "messages",
      {
         filters: {
            buyer: {
               id: session?.user?.id
            }
         },
         populate: ["deep"]
      },
      "no-store",
      session?.user?.jwtToken
   );

   // *** if error, return error page ***
   if (error) {
      throw error;
   }

   return (
      <>
         <Messages MessagesData={messagesData?.data} />
      </>
   );
};

export default MassagesPage;
