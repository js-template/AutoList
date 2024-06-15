"use client";
import { useGlobalContext } from "@/context/store";
import { SignOut } from "@/lib/user";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import IconComponent from "../icon/react.icon";

const SideNavBar = ({
   sidebarMenu
}: {
   sidebarMenu: {
      id: number;
      label: string;
      link: string;
      type: string;
      icon?: string;
      target: string;
   }[];
}) => {
   const { direction, sidebarShow, setSidebarShow } = useGlobalContext();
   const pathname = usePathname();
   const [loading, setLoading] = useState(false);

   return (
      <>
         <div className={` relative z-50 `}>
            <nav
               className={`fixed top-20 ${
                  direction === "ltr" ? "left-0" : "right-0"
               } bottom-0 flex flex-col w-60 lg:w-72 pt-10 pb-3 bg-white shadow overflow-y-auto z-20 ${
                  sidebarShow ? "block" : "hidden lg:block"
               }`}
            >
               <div className='px-6 pb-12'>
                  <ul>
                     {sidebarMenu &&
                        sidebarMenu.map((item, index: number) => {
                           return item.link !== "/logout" ? (
                              <li
                                 key={index}
                                 className={`transition-all duration-300 ease-in-out group rounded-md hover:bg-primary ${
                                    pathname === item.link ? "bg-primary" : "bg-white"
                                 }`}
                              >
                                 <Link href={item.link ?? "#"} className='flex items-center gap-4 px-4 py-4'>
                                    {item.icon && (
                                       <IconComponent
                                          icon={item.icon}
                                          size={18}
                                          className={`text-xl transition-all duration-300 ease-in-out group-hover:text-white ${
                                             pathname === item.link ? "text-white" : "text-base-content"
                                          }`}
                                       />
                                    )}

                                    <p
                                       className={`text-sm font-normal transition-all duration-300 ease-in-out group-hover:text-white translate-y-px ${
                                          pathname === item.link ? "text-white" : "text-base-content"
                                       }`}
                                    >
                                       {item.label}
                                    </p>
                                 </Link>
                              </li>
                           ) : (
                              <li className='absolute bottom-3 left-0 w-full'>
                                 <button
                                    className={`py-3 px-4 rounded-md group flex items-center mx-auto gap-4 w-[calc(100%-3rem)] relative ${
                                       loading ? "bg-error" : "bg-success-content hover:bg-error"
                                    }`}
                                    onClick={() => {
                                       setLoading(true);
                                       signOut().then(() => {
                                          SignOut().then(() => {
                                             toast.success("Logout Successfully");
                                             setLoading(false);
                                          });
                                       });
                                    }}
                                    disabled={loading}
                                 >
                                    {item.icon && (
                                       <IconComponent
                                          icon={item.icon}
                                          size={18}
                                          className={`${
                                             loading ? "text-white" : "text-base-content group-hover:text-white"
                                          }`}
                                       />
                                    )}
                                    <p
                                       className={`text-sm font-semibold mt-0.5 ${
                                          loading ? "text-white" : "text-base-content group-hover:text-white"
                                       }`}
                                    >
                                       Logout
                                    </p>
                                    {loading && (
                                       <div className='flex items-center justify-center absolute right-4 top-1/2 transform -translate-y-1/2'>
                                          <div className='w-5 h-5 border-b-2 border-white rounded-full animate-spin'></div>
                                       </div>
                                    )}
                                 </button>
                              </li>
                           );
                        })}
                  </ul>
               </div>
            </nav>

            {/* overlay */}
            <div
               onClick={() => setSidebarShow(!sidebarShow)}
               className={`fixed left-0 right-0 top-0  h-screen z-0 ${sidebarShow ? "block " : "hidden"}`}
            ></div>
         </div>
      </>
   );
};

export default SideNavBar;
