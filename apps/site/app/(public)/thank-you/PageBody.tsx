"use client";

import { findOne } from "@/lib/strapi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PageBody = ({
   error,
   success,
   loading,
   updateSession
}: {
   error: boolean;
   success: boolean;
   loading: boolean;
   updateSession: boolean;
}) => {
   const { data, update } = useSession();
   const router = useRouter();
   const [updateUserSession, setUpdateUserSession] = useState(updateSession);

   // *** update session
   useEffect(() => {
      const closeId = setTimeout(async () => {
         if (updateUserSession && data?.user?.id) {
            // get updated user info and update the session
            const { data: user } = await findOne(
               "users",
               Number(data?.user?.id),
               {
                  populate: "deep"
               },
               "no-cache",
               data?.user?.jwtToken
            );

            if (user) {
               await update({ ...data, user });
               setUpdateUserSession(false);
               router.push("/dashboard/ads");
            }
         }
      }, 100);

      return () => clearTimeout(closeId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, updateUserSession]);

   // *** toast message ***
   useEffect(() => {
      if (success) {
         toast.success("Your payment was successful");
      }
      if (error) {
         toast.error("An error occurred, please try again");
      }
   }, [success, error, loading]);

   return (
      <div className='flex flex-col items-center justify-center gap-5 py-36'>
         <div className='flex flex-col gap-4 items-center justify-center bg-white rounded-lg shadow-xl p-7 max-w-xl w-full mx-auto border border-base-content/10'>
            <h1 className='text-3xl font-bold text-success'>Thank You</h1>
            <div>
               <p className='text-lg text-center text-primary mb-2'>Your payment was successful</p>
               <p className='text-base text-center text-base-300'>
                  You will be redirected to the dashboard shortly. If you are not redirected, click the button below
               </p>
            </div>
            <Link className='bg-primary text-white px-4 py-2 rounded-md' href='/dashboard/ads'>
               Go to Dashboard
            </Link>
         </div>
      </div>
   );
};

export default PageBody;
