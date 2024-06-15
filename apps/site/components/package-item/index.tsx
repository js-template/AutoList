"use client";

import { useGlobalContext } from "@/context/store";
import { createPaymentIntent } from "@/lib/stripe";
import _ from "lodash";
import { User } from "next-auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import PaymentModel from "../payment-model";

type PackageItemProps = {
   item: {
      id: string;
      attributes: {
         title: string;
         description: string;
         createdAt: string;
         updatedAt: string;
         publishedAt: string;
         price: number;
         frequency: string;
         create_ads_limit: number;
         ads_boost_limit: number;
         feature: {
            id: number;
            key: string;
            value: string;
         }[];
         button: {
            id: number;
            label: string;
            link: string;
            type: string;
            target: string;
            icon: string;
         };
      };
   };
   user: User;
};

const PackageItem = ({ item, user }: PackageItemProps) => {
   const { direction } = useGlobalContext();
   const { title, price, frequency, create_ads_limit, ads_boost_limit, feature, button } = item?.attributes;

   const [clientSecret, setClientSecret] = useState("");
   const [paymentIntentId, setPaymentIntentId] = useState("");
   const [modalOn, setModalOn] = useState(false);

   // =========================Start create payment intent and get client secret=====================
   const handlePaymentIntent = async (pricing: number) => {
      try {
         const { data } = await createPaymentIntent(pricing, user);
         setClientSecret(data?.clientSecret);
         setPaymentIntentId(data?.paymentIntentID);
         setModalOn(true);
      } catch (error: any) {
         toast.error(error?.message || "Server Error");
      }
   };

   return (
      <div>
         <div
            className={`bg-white p-4 xl:p-10 rounded-lg shadow-boxShadow ${
               item?.id === user?.membership?.id ? "border-2 border-primary" : ""
            }`}
         >
            <div className='text-center'>
               <h4 className={`text-3xl font-bold text-primary pt-2 uppercase`}>{title ?? "N/A"}</h4>
               <div className='flex items-end justify-center gap-1'>
                  <h2 className='text-4xl font-bold text-primary pt-3'>${price ?? "00"}</h2>
                  <span className='text-base font-normal text-base-200 pt-1 lowercase'>/ {frequency ?? "monthly"}</span>
               </div>
               <p className='text-base font-normal pt-2 text-base-content/70 line-clamp-3'>
                  {item?.attributes?.description ?? "N/A"}
               </p>
            </div>

            <ul className='space-y-5 pt-5'>
               {/* create_ads_limit */}
               <li className='flex items-center gap-6 relative'>
                  <FiCheckCircle className='text-lg sm:text-2xl text-primary' />

                  <span className='text-base sm:text-lg lg:text-base font-normal text-base-content'>
                     Create Ads Limit
                  </span>
                  <p
                     className={`${
                        direction === "rtl" ? "left-0" : "right-0"
                     } text-base sm:text-lg lg:text-base font-semibold text-base-content absolute `}
                  >
                     {create_ads_limit}
                  </p>
               </li>
               {/* ads_boost_limit */}
               <li className='flex items-center gap-6 relative'>
                  <FiCheckCircle className='text-lg sm:text-2xl text-primary' />

                  <span className='text-base sm:text-lg lg:text-base font-normal text-base-content'>
                     Ads Boost Limit
                  </span>
                  <p
                     className={`${
                        direction === "rtl" ? "left-0" : "right-0"
                     } text-base sm:text-lg lg:text-base font-semibold text-base-content absolute `}
                  >
                     {ads_boost_limit}
                  </p>
               </li>
               {_.map(feature, (key, index) => (
                  <li key={index} className='flex items-center gap-6 relative'>
                     <FiCheckCircle className='text-lg sm:text-2xl text-primary' />

                     <span className='text-base sm:text-lg lg:text-base font-normal text-base-content'>{key?.key}</span>
                     <p
                        className={`${
                           direction === "rtl" ? "left-0" : "right-0"
                        } text-base sm:text-lg lg:text-base font-semibold text-base-content absolute `}
                     >
                        {key?.value}
                     </p>
                  </li>
               ))}
            </ul>
            <div className='pt-10 text-center flex items-center justify-center '>
               {item?.id !== user?.membership?.id ? (
                  <button
                     onClick={() => {
                        handlePaymentIntent(price);
                     }}
                     className={`text-base font-semibold text-primary-content rounded bg-primary py-4 px-12 whitespace-nowrap hover:opacity-80 transition-all duration-300 ease-in-out`}
                  >
                     {button?.label ?? "Buy Now"}
                  </button>
               ) : (
                  <button
                     disabled
                     className={`text-base font-semibold text-white rounded bg-info-content py-4 px-12 whitespace-nowrap cursor-not-allowed`}
                  >
                     {"Current Plan"}
                  </button>
               )}
               {/* {item?.id !== user?.membership?.id ? (
                  <Link
                     href={button?.link ?? "/"}
                     passHref
                     target={button?.target ?? "_self"}
                     className={`text-base font-semibold text-primary-content rounded bg-primary py-4 px-12 whitespace-nowrap hover:opacity-80 transition-all duration-300 ease-in-out`}
                  >
                     {button?.label ?? "N/A"}
                  </Link>
                  
               ) : (
                  <button
                     disabled
                     className={`text-base font-semibold text-white rounded bg-info-content py-4 px-12 whitespace-nowrap cursor-not-allowed`}
                  >
                     {"Current Plan"}
                  </button>
               )} */}
            </div>
         </div>

         {/*  stripe-button popup  */}
         <PaymentModel packageId={item?.id} modalOn={modalOn} setModalOn={setModalOn} clientSecret={clientSecret} />
      </div>
   );
};

export default PackageItem;
