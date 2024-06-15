"use client";
import IconComponent from "@/components/icon/react.icon";
import { SignOut } from "@/lib/user";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const UserAddPost = ({
   adminMenu
}: {
   adminMenu: {
      id: number;
      label: string;
      link: string;
      icon?: string;
      type: string;
      target: string;
   }[];
}) => {
   const [loading, setLoading] = useState(false);
   const path = usePathname();
   const [open, close] = useState(false);
   const { data, status } = useSession();
   const avatarUrl =
      data?.user?.image ??
      `https://ui-avatars.com/api/?name=${data?.user?.name}&background=004D3F&color=fff&length=2&size=48&bold=true`;

   const LogOutHandler = async () => {
      setLoading(true);
      await signOut().then(() => {
         SignOut().then(() => {
            toast.success("Logout successfully", {
               duration: 5000
            });
            setLoading(false);
         });
      });
   };

   return (
      <div className='hidden md:flex gap-3 xl:gap-7 items-center'>
         <div className='flex mt-auto'>
            {(status === "loading" || status === "unauthenticated") && (
               <div className='flex w-12 h-12 justify-center items-center rounded-lg bg-gray-200'>
                  <div className='w-5 h-5 border-b-2 border-gray-500 rounded-full animate-spin'></div>
               </div>
            )}
            {status === "authenticated" && (
               <button onClick={() => close(!open)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatarUrl} alt='user-image' width={48} height={48} className='rounded-lg' />
               </button>
            )}

            <div className={`absolute bottom-0 top-16  right-0 min-w-60 z-10`}>
               <div
                  className={`bg-white overflow-hidden shadow-xl w-full rounded-xl duration-500 ease-in-out  ${
                     !open ? "opacity-0 invisible" : "opacity-100 visible"
                  }`}
               >
                  <ul>
                     {adminMenu?.map((item, index: any) => {
                        return item.link !== "/logout" ? (
                           <li
                              key={index}
                              className={`py-3 px-6 border-b border-secondary-content last-of-type:border-b-0 transition-all duration-300 ease-in-out group hover:bg-primary ${
                                 path === item.link ? "bg-primary" : "bg-white"
                              }`}
                           >
                              <Link href={item.link ?? "#"} className={`flex gap-4 items-center w-full`}>
                                 {item.icon && (
                                    <IconComponent
                                       icon={item.icon}
                                       size={18}
                                       className={`text-lg whitespace-nowrap group-hover:text-white  ${
                                          path === item.link ? "text-white" : "text-base-300"
                                       }`}
                                    />
                                 )}
                                 <span
                                    className={`text-sm whitespace-nowrap group-hover:text-white  ${
                                       path === item.link ? "text-white" : "text-base-300"
                                    }`}
                                 >
                                    {item.label}
                                 </span>
                              </Link>
                           </li>
                        ) : (
                           <li
                              className={`transition-all duration-300 ease-in-out text-white group py-3 px-6 cursor-pointer flex justify-between gap-3 items-center w-full ${
                                 loading ? "bg-error" : "hover:bg-error bg-error/60"
                              }`}
                              onClick={LogOutHandler}
                           >
                              <a className='flex items-center gap-5 '>
                                 {item.icon && (
                                    <IconComponent icon={item.icon} size={18} className='group-hover:text-white' />
                                 )}
                                 <p className='text-sm font-semibold group-hover:text-white'>{item.label}</p>
                              </a>
                              {loading && (
                                 <div className='flex items-center justify-center '>
                                    <div className='w-5 h-5 border-b-2 border-white rounded-full animate-spin'></div>
                                 </div>
                              )}
                           </li>
                        );
                     })}
                  </ul>
               </div>
            </div>

            {/* overlay */}
            <div
               onClick={() => close(!open)}
               className={`fixed left-0 right-0 w-full h-full top-0 z-0 ${open ? "block" : "hidden"}`}
            ></div>
         </div>
      </div>
   );
};

export default UserAddPost;
