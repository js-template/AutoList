"use client";
import { Suspense, useEffect } from "react";

import LangOptions from "./LangOption";

import { useGlobalContext } from "@/context/store";
import { SignOut } from "@/lib/user";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

const TopNav = ({ TopBarData, error }: { TopBarData: any; error: any }) => {
   const { lang, changeLang, direction } = useGlobalContext();
   const { data, status } = useSession();

   const avatarUrl =
      data?.user?.image ??
      `https://ui-avatars.com/api/?name=${data?.user?.name}&background=004D3F&color=fff&length=2&size=48&bold=true`;

   const handleChange = (e: any) => {
      const selectedValue = e.target.value;

      changeLang(selectedValue);
   };

   // *** if layout data load failed show this warning
   useEffect(() => {
      const closeId = setTimeout(() => {
         if (error) {
            toast.error("Failed to load layout data");
         }
      }, 100);

      return () => clearTimeout(closeId);
   }, [error]);

   return (
      <div className='fixed z-40 bg-white border-b border-gray-200  w-full'>
         <div className='container mx-auto px-4 sm:px-0 '>
            <div className='flex justify-between text-center gap-4 sm:text-inherit items-center h-11'>
               <p className='text-sm text-neutral line-clamp-1 hidden md:block'>{TopBarData?.announcement}</p>
               {/* @ts-ignore */}
               <marquee
                  behavior='scroll'
                  direction={direction === "ltr" ? "left" : "right"}
                  className='block md:hidden'
               >
                  {TopBarData?.announcement}
                  {/* @ts-ignore */}
               </marquee>

               <div className='flex flex-none gap-4 items-center'>
                  {true ? (
                     <select
                        name='country'
                        id='countries'
                        className={`text-sm font-normal outline-none cursor-pointer uppercase border border-gray-300 rounded bg-gray-100 p-1`}
                        onChange={handleChange}
                     >
                        <Suspense fallback={<div className={"w-12 h-5 bg-gray-300/50 animate-pulse rounded-lg"} />}>
                           <LangOptions selectedLang={lang} />
                        </Suspense>
                     </select>
                  ) : (
                     <div className={"w-12 h-5 bg-gray-300/50 animate-pulse rounded-lg"} />
                  )}
                  {data && status === "authenticated" ? (
                     <div className='flex items-center gap-4'>
                        <Link href='/dashboard/ads'>
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img src={avatarUrl} alt='user-image' width={30} height={30} className='rounded-lg' />
                        </Link>
                        <button
                           className='text-error font-bold text-sm px-2 py-1 rounded bg-error/10 border border-error/20 hover:bg-error/30 transition-all duration-300 ease-in-out'
                           onClick={() => {
                              signOut().then(() => {
                                 SignOut();
                              });
                           }}
                        >
                           Logout
                        </button>
                     </div>
                  ) : (
                     <ul className='flex items-center justify-center text-center gap-4'>
                        {TopBarData?.menu?.map((item: any, index: number) => {
                           return (
                              <li
                                 key={index}
                                 className={
                                    direction === "ltr"
                                       ? "border-r border-gray-300 pr-4 last-of-type:border-none"
                                       : "border-l border-gray-300 pl-4 last-of-type:border-none"
                                 }
                              >
                                 <Link href={item.link} className='text-sm text-neutral'>
                                    {item?.label}
                                 </Link>
                              </li>
                           );
                        })}
                     </ul>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default TopNav;
