"use client";
import LangOptions from "@/components/top-nav/LangOption";
import { useGlobalContext } from "@/context/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense } from "react";
import { AiOutlineBars } from "react-icons/ai";
import UserAddPost from "../header/avatar";

const SuperAdminNavbar = ({
   mainMenu,
   adminMenu
}: {
   mainMenu: {
      id: number;
      label: string;
      link: string;
      type: string;
      icon?: string;
      target: string;
   }[];
   adminMenu: {
      id: number;
      label: string;
      link: string;
      type: string;
      icon?: string;
      target: string;
   }[];
}) => {
   const { lang, changeLang, direction, sidebarShow, setSidebarShow, mobileMenuShow, setMobileMenuShow } =
      useGlobalContext();
   const { data } = useSession();

   const handleChange = (e: any) => {
      const selectedValue = e.target.value;

      changeLang(selectedValue);
   };

   return (
      <section className='fixed top-0 w-full py-5 px-6 bg-white shadow-boxShadow z-50'>
         <nav className='relative'>
            <div className='flex items-center justify-between relative'>
               <div className='flex items-center'>
                  <div
                     className={
                        direction === "ltr" ? "xl:pl-4 lg:w-auto lg:pr-0 xl:w-72" : "xl:pr-4 lg:w-auto lg:pl-0 xl:w-72"
                     }
                  >
                     <Link href='/'>
                        <p className='text-themeBlackLight font-bold text-2xl'>
                           <span className='text-primary'>Meta</span> Ads
                        </p>
                     </Link>
                  </div>

                  <div className='block lg:hidden ml-3 mt-1'>
                     <div
                        onClick={() => setSidebarShow(!sidebarShow)}
                        className='bg-primary cursor-pointer rounded xl:hidden w-8 h-8 flex items-center justify-center'
                     >
                        <AiOutlineBars className='text-2xl sm:text-2xl text-white' />
                     </div>
                  </div>
                  <div className='hidden xl:block ml-10'>
                     <div className='flex items-center'>
                        <ul className='flex items-center gap-4'>
                           {mainMenu?.map((item, index) => (
                              <li key={index}>
                                 <Link href={item.link ?? "#"}>
                                    <p
                                       className={`text-base transition duration-300 ease-in-out hover:text-primary relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bg-secondary before:-bottom-2 before:left-1/2 before:transform before:-translate-x-1/2 before:transition-all before:duration-300 before:ease-in-out hover:before:w-1/2 ${
                                          false
                                             ? "font-bold text-primary before:absolute before:content[``] before:h-[2px] before:bg-secondary before:-bottom-2 before:left-1/2 before:transform before:-translate-x-1/2 before:transition-all before:duration-300 before:ease-in-out before:w-1/2"
                                             : "font-normal text-neutral "
                                       }`}
                                    >
                                       {item.label}
                                    </p>
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>

               <div className={`flex items-center gap-3 xl:gap-6`}>
                  <div>
                     {true ? (
                        <select
                           name='country'
                           id='countries'
                           className='text-sm font-normal outline-none cursor-pointer uppercase border border-gray-300 rounded bg-gray-100 p-1'
                           onChange={handleChange}
                        >
                           <Suspense fallback={<div className={"w-12 h-5 bg-gray-300/50 animate-pulse rounded-lg"} />}>
                              <LangOptions selectedLang={lang} />
                           </Suspense>
                        </select>
                     ) : (
                        <div className={"w-12 h-5 bg-gray-300/50 animate-pulse rounded-lg"} />
                     )}
                  </div>
                  {/* <Notification /> */}
                  <div className='hidden sm:block'>
                     <Link href={"/dashboard/ads/create-ad"}>
                        <button>
                           <button className='text-base md:font-semibold text-white bg-secondary py-2 px-4 md:py-3 md:px-7 rounded'>
                              Post Your Ad
                           </button>
                        </button>
                     </Link>
                  </div>

                  <>
                     <UserAddPost adminMenu={adminMenu} />
                  </>

                  <div
                     onClick={() => setMobileMenuShow(!mobileMenuShow)}
                     className='bg-primary cursor-pointer rounded xl:hidden w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center'
                  >
                     <AiOutlineBars className='text-2xl sm:text-2xl text-white' />
                  </div>
               </div>
            </div>
         </nav>
      </section>
   );
};

export default SuperAdminNavbar;
