"use client";
import Logo from "@/components/brands";
import { useGlobalContext } from "@/context/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { AiOutlineBars } from "react-icons/ai";

const MainNavBar = ({ LogoData, MenuData, ButtonData }: { MenuData: any; LogoData: any; ButtonData: any }) => {
   const { mobileMenuShow, setMobileMenuShow } = useGlobalContext();
   const { isBuyer } = {} as any;
   const { data, status } = useSession();
   const pathName = usePathname();

   const userData = data?.user;
   const loggedIn = status === "authenticated";

   const notify = () => toast.error("Please login to Post Your Ads");

   return (
      <div className='relative'>
         <section className={`fixed w-full py-5 bg-white shadow-boxShadow z-50  top-[45px]`}>
            {/* <section className={`fixed w-full py-7 bg-white shadow-boxShadow z-50 px-6 sm:px-0 ${isSuperAdmin ? 'top-0' : 'top-11 '}`}> */}
            <nav className='container mx-auto px-6 sm:px-0'>
               <div className='flex items-center justify-between relative gap-6'>
                  <div className='lg:w-auto lg:pr-0'>
                     <Logo />
                  </div>

                  {/* main nav  */}
                  <div className='hidden xl:block'>
                     <div className='flex items-center'>
                        <ul className='flex items-center gap-4'>
                           {MenuData?.map((item: any, index: number) => (
                              <li key={index}>
                                 <Link
                                    href={item.link || "#"}
                                    className={`text-base transition duration-300 ease-in-out hover:text-primary relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bg-secondary before:-bottom-2 before:left-1/2 before:transform before:-translate-x-1/2 before:transition-all before:duration-300 before:ease-in-out hover:before:w-1/2 ${
                                       pathName === item.link
                                          ? "font-bold text-primary before:absolute before:content[``] before:h-[2px] before:bg-secondary before:-bottom-2 before:left-1/2 before:transform before:-translate-x-1/2 before:transition-all before:duration-300 before:ease-in-out before:w-1/2"
                                          : "font-normal text-neutral "
                                    }`}
                                 >
                                    {item?.label}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  {/* notification  */}
                  <div className='flex items-center gap-3'>
                     {loggedIn && userData && <>{/* <Notification /> */}</>}

                     {loggedIn && userData ? (
                        isBuyer ? (
                           <div className='hidden sm:block'>
                              <Link href={"/dashboard/favourite-ads"}>
                                 <p>
                                    <button className='text-base md:font-semibold text-white bg-secondary py-2 px-4 md:py-3 md:px-7 rounded'>
                                       Favourite Ads
                                    </button>
                                 </p>
                              </Link>
                           </div>
                        ) : (
                           <div className='hidden sm:block'>
                              <Link href={"/dashboard/ads/create-ad"}>
                                 <p>
                                    <button className='text-base md:font-semibold text-white bg-secondary py-2 px-4 md:py-3 md:px-7 rounded'>
                                       {ButtonData?.label}
                                    </button>
                                 </p>
                              </Link>
                           </div>
                        )
                     ) : (
                        <div className='hidden sm:block'>
                           <button
                              className='text-base md:font-semibold text-white bg-secondary py-2 px-4 md:py-3 md:px-7 rounded'
                              onClick={notify}
                           >
                              {ButtonData?.label}
                           </button>
                        </div>
                     )}

                     {/* user image button  */}
                     {loggedIn && userData && <>{/* <UserAddPost /> */}</>}

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
      </div>
   );
};

export default MainNavBar;
