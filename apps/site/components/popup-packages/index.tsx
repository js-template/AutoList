"use client";
import { find } from "@/lib/strapi";
import { createPaymentIntent } from "@/lib/stripe";
import _ from "lodash";
import { User } from "next-auth";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import PaymentModel from "../payment-model";

const PopupPackages = ({
   user,
   language,
   direction,
   force
}: {
   user: User | undefined;
   language: string;
   direction: string;
   force?: boolean;
}) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [packages, setPackages] = useState<any[] | null>(null);
   const [selectedId, setSelectedId] = useState<string>("");
   // *** payment getaway stripe
   const [clientSecret, setClientSecret] = useState("");
   const [paymentIntentId, setPaymentIntentId] = useState("");
   const [modalOn, setModalOn] = useState(false);

   // =========================Start create payment intent and get client secret=====================
   const handlePaymentIntent = async (pricing: number) => {
      if (!user) return;

      try {
         const { data } = await createPaymentIntent(pricing, user);
         setClientSecret(data?.clientSecret);
         setPaymentIntentId(data?.paymentIntentID);
         setModalOn(true);
      } catch (error: any) {
         toast.error(error?.message || "Server Error");
      }
   };

   const pathName = usePathname();

   // *** check if user have membership
   useEffect(() => {
      const closeId = setTimeout(async () => {
         if (!user?.membership) {
            if (!packages) {
               const { data: membershipData, error: membershipError } = await find(
                  "packages",
                  {
                     populate: "deep",
                     publicationState: "live",
                     locale: [language]
                  },
                  "no-cache",
                  user?.jwtToken as string
               );
               if (!membershipError) {
                  setPackages(membershipData?.data);
               }
            }
            if (pathName !== "/dashboard/ads/create-ad" && pathName !== "/dashboard/membership") {
               setIsModalOpen(true);
            }
         }
      }, 4000);

      return () => clearTimeout(closeId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user]);

   return (
      <Fragment>
         <div
            className={`fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-50 trasform ${
               isModalOpen || force ? "translate-y-0" : "-translate-y-full"
            }`}
         >
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg w-full max-w-5xl overflow-y-auto max-h-[calc(100vh-4rem)] z-50'>
               {/* Close Button */}
               {!force && (
                  <button
                     onClick={() => setIsModalOpen(false)}
                     className='absolute top-2 right-2 text-lg text-primary-500 w-8 h-8 flex justify-center items-center rounded border border-base-content/10 hover:bg-error hover:text-error-content hover:border-error transition-all duration-300 ease-in-out'
                  >
                     <IoClose />
                  </button>
               )}

               <div className='text-center'>
                  <h3 className='text-2xl font-semibold'>Upgrade your membership</h3>
                  <p className='text-base text-base-content/60'>
                     Upgrade your membership to get access to more features
                  </p>
               </div>

               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-3 xl:gap-8 pt-10'>
                  {/* Loader */}
                  {!packages && (
                     <div className='col-span-3'>
                        <div className='flex items-center justify-center '>
                           <div className='w-10 h-10 border-b-2 border-t-2 border-primary rounded-full animate-spin'></div>
                        </div>
                     </div>
                  )}
                  {_.map(packages, (item, index) => (
                     <div className={`bg-white border-2 border-base-content/10 p-4 xl:p-10 rounded-lg shadow-md`}>
                        <div className='text-center'>
                           <h4 className={`text-3xl font-bold text-primary pt-2 uppercase`}>
                              {item?.attributes?.title ?? "N/A"}
                           </h4>
                           <div className='flex items-end justify-center gap-1'>
                              <h2 className='text-4xl font-bold text-primary pt-3'>
                                 ${item?.attributes?.price ?? "00"}
                              </h2>
                              <span className='text-base font-normal text-base-200 pt-1 lowercase'>
                                 / {item?.attributes?.frequency ?? "monthly"}
                              </span>
                           </div>
                           <p className='text-base font-normal pt-2 text-base-content/70 line-clamp-3'>
                              {item?.attributes?.description ?? "N/A"}
                           </p>
                        </div>

                        <ul className='space-y-5 pt-5'>
                           {/* create_ads_limit */}
                           <li className='flex items-center gap-6 relative'>
                              <FiCheckCircle className='text-lg sm:text-2xl text-primary' />

                              <span className='text-base sm:text-lg lg:text-base xl:text-lg font-normal text-base-content'>
                                 Create Ads Limit
                              </span>
                              <p
                                 className={`${
                                    direction === "rtl" ? "left-0" : "right-0"
                                 } text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-base-content absolute `}
                              >
                                 {item?.attributes?.create_ads_limit}
                              </p>
                           </li>
                           {/* ads_boost_limit */}
                           <li className='flex items-center gap-6 relative'>
                              <FiCheckCircle className='text-lg sm:text-2xl text-primary' />

                              <span className='text-base sm:text-lg lg:text-base xl:text-lg font-normal text-base-content'>
                                 Ads Boost Limit
                              </span>
                              <p
                                 className={`${
                                    direction === "rtl" ? "left-0" : "right-0"
                                 } text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-base-content absolute `}
                              >
                                 {item?.attributes?.ads_boost_limit}
                              </p>
                           </li>
                           {_.map(item?.attributes?.feature, (key, index) => (
                              <li key={index} className='flex items-center gap-6 relative'>
                                 <FiCheckCircle className='text-lg sm:text-2xl text-primary' />

                                 <span className='text-base sm:text-lg lg:text-base xl:text-lg font-normal text-base-content'>
                                    {key?.key}
                                 </span>
                                 <p
                                    className={`${
                                       direction === "rtl" ? "left-0" : "right-0"
                                    } text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-base-content absolute `}
                                 >
                                    {key?.value}
                                 </p>
                              </li>
                           ))}
                        </ul>
                        <div className='pt-10 text-center flex items-center justify-center '>
                           {item?.id !== user?.membership?.id ? (
                              <button
                                 className={`text-base font-semibold text-primary-content rounded bg-primary py-4 px-12 whitespace-nowrap hover:opacity-80 transition-all duration-300 ease-in-out`}
                                 onClick={() => {
                                    handlePaymentIntent(item?.attributes?.price);
                                    setSelectedId(item?.id);
                                 }}
                              >
                                 {item?.attributes?.button?.label ?? "N/A"}
                              </button>
                           ) : (
                              <button
                                 disabled
                                 className={`text-base font-semibold text-white rounded bg-info-content py-4 px-12 whitespace-nowrap cursor-not-allowed`}
                              >
                                 {"Current Plan"}
                              </button>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            {/* Overlay */}
            <div
               className={`fixed top-0 left-0 w-full h-full z-40 trasform ${
                  isModalOpen || force ? "translate-y-0" : "-translate-y-full"
               }`}
            ></div>
         </div>

         {/* Payment Getaway model */}
         <PaymentModel modalOn={modalOn} clientSecret={clientSecret} packageId={selectedId} setModalOn={setModalOn} />
      </Fragment>
   );
};

export default PopupPackages;
