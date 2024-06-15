import { auth } from "@/context/auth";
import { findOne, updateOne } from "@/lib/strapi";
import { retrievePaymentIntent } from "@/lib/stripe";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PageBody from "./PageBody";

export const metadata: Metadata = {
   title: "Thank You | AutoLister",
   description: "Thank You page for the app"
};

type Props = {
   searchParams: { [key: string]: string | string[] | undefined };
};

const ThankYouPage = async ({ searchParams }: Props) => {
   const cookieStore = cookies();
   const packageId = searchParams?.packageId;
   const paymentIntentId = searchParams?.payment_intent;
   const paymentIntentClientSecret = searchParams?.payment_intent_client_secret;
   const redirectStatus = searchParams?.redirect_status;

   const session = await auth();

   if (!session) {
      redirect("/signin");
   }

   let loading = true;
   let error = false;
   let success = false;
   let updateSession = false;

   if (redirectStatus !== "succeeded") {
      redirect("/dashboard/membership");
   }

   if (paymentIntentId && paymentIntentClientSecret && redirectStatus === "succeeded") {
      const { data, error } = await retrievePaymentIntent(paymentIntentId as string);

      const payAmount = data?.amount / 100;

      if (data) {
         // *** get package and check price
         const { data: packages } = await findOne(
            "packages",
            Number(packageId),
            {},
            "no-cache",
            session?.user?.jwtToken
         );

         if (data.status === "succeeded" && payAmount === packages?.data?.attributes?.price) {
            if (session?.user?.membership?.id !== packageId) {
               // *** update user package here ***
               const { data: userPackage, error } = await updateOne(
                  "users",
                  Number(session?.user?.id),
                  {
                     membership: Number(packageId)
                  },
                  process.env.STRAPI_AUTH_TOKEN
               );

               if (userPackage) {
                  loading = false;
                  success = true;
                  updateSession = true;
               }
            } else {
               console.error("User already have the same package");
               loading = false;
            }
         } else {
            console.error("User choose the wrong package or paid the wrong amount");
            redirect("/dashboard/membership");
         }
      }
   }

   return (
      <div>
         {loading && (
            <div className='fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center'>
               <div className='flex flex-col gap-4 items-center justify-center bg-white rounded-lg shadow-md p-10'>
                  <div className='w-20 h-20 border-b-4 border-t-4 border-primary rounded-full animate-spin'></div>
                  <h1 className='text-2xl font-bold text-primary'>Processing Payment...</h1>
                  <p className='text-base text-center text-base-300'>Please wait while we process your payment</p>
               </div>
            </div>
         )}

         {/* Thank You Page */}
         <PageBody error={error} success={success} loading={loading} updateSession={updateSession} />
      </div>
   );
};

export default ThankYouPage;
