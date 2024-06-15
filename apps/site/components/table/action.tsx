"use client";

import { deleteOne, updateOne } from "@/lib/strapi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
import { HiOutlineDotsVertical, HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";

const TableColAction = ({
   item,
   setLoading,
   index,
   adsData,
   lastItem
}: {
   item: any;
   setLoading: (value: boolean) => void;
   index: number;
   adsData: any;
   lastItem: boolean;
}) => {
   const [state, setState] = useState(false);
   const { data: user } = useSession();
   // *** delete ad handler
   const deleteAd = async (ID: number) => {
      try {
         Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this Ad?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#F27125",
            confirmButtonText: "Yes, delete it!"
         }).then((result) => {
            if (result.isConfirmed) {
               setLoading(true);
               deleteOne("manage-ads", ID, user?.user?.jwtToken as string, "/dashboard/ads", "page").then((res) => {
                  if (!res.error) {
                     setLoading(false);
                     toast.success("Ad deleted Successfully");
                  } else {
                     setLoading(false);
                     return toast.error(res.error || "Server Error");
                  }
               });
            }
         });
      } catch (error: any) {
         setLoading(false);
         toast.error(error?.message || "Server Error");
      }
   };

   // *** change ad status handler
   const adStatusChange = async (ID: number, type: string) => {
      try {
         setLoading(true);
         const updatedData = {
            data: {
               status: type === "activate" ? "Active" : "Inactive"
            }
         };
         const postResData = await updateOne(
            "manage-ads",
            ID,
            updatedData,
            user?.user?.jwtToken as string,
            "/dashboard/ads",
            "page"
         );
         if (!postResData.error) {
            setLoading(false);
            toast.success("Status Updated Successfully");
         } else {
            setLoading(false);
            return toast.error("Server Error");
         }
      } catch (error: any) {
         setLoading(false);
         toast.error(error?.message || "Server Error");
      }
   };

   // *** Ad Boost true/false handler
   const boostAd = async (id: number, adBoost: boolean) => {
      try {
         setLoading(true);
         const updatedData = {
            data: {
               adBoost: !adBoost
            }
         };
         const postResData = await updateOne(
            "manage-ads",
            id,
            updatedData,
            user?.user?.jwtToken as string,
            "/dashboard/ads",
            "page"
         );
         if (!postResData.error) {
            setLoading(false);
            toast.success("Ad Boosted Successfully");
            return;
         } else {
            setLoading(false);
            if (postResData.error === "Forbidden")
               return toast.error("You are not allowed to boost this ad. Please upgrade your package");
            toast.error("Server Error");
            return;
         }
      } catch (error: any) {
         setLoading(false);
         toast.error(error?.message || "Server Error");
      }
   };

   return (
      <>
         <td className='text-sm font-normal text-neutral px-6 py-4 whitespace-nowrap rounded-lg'>
            <div className='relative'>
               <button
                  className={`p-2 border border-themeWhiteLight2 rounded relative `}
                  onClick={() => setState(!state)}
               >
                  <HiOutlineDotsVertical className='text-xl text-base-200 hover:text-primary' />
               </button>

               <div
                  className={`${
                     // last 2 items in the list will be shown in the top
                     lastItem ? (adsData.length === 1 ? "bottom-0 right-7" : "bottom-10 right-7") : "right-7"
                  } ${
                     state ? " max-h-32 overflow-y-auto" : ""
                  } origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus: outline-none z-30 ${
                     state ? "block" : "hidden"
                  } `}
               >
                  <div className='py-1 z-20 px-2' role='none'>
                     {/* edit ads button  */}
                     <Link href={`/dashboard/ads/edit-ads?active_ad=${item?.attributes?.slug}`} passHref>
                        <button className='flex gap-2 pl-2 w-full py-2  hover:bg-success-content hover:rounded'>
                           <svg
                              width='22'
                              height='22'
                              viewBox='0 0 20 20'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 d='M10 12.5001L16.9875 5.48759C17.3157 5.15938 17.5001 4.71424 17.5001 4.25009C17.5001 3.78594 17.3157 3.34079 16.9875 3.01259C16.6593 2.68438 16.2142 2.5 15.75 2.5C15.2858 2.5 14.8407 2.68438 14.5125 3.01259L7.5 10.0001V12.5001H10Z'
                                 stroke='#1A2B3A'
                                 strokeWidth='1.5'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                              />
                              <path
                                 d='M13.334 4.16602L15.834 6.66602'
                                 stroke='#1A2B3A'
                                 strokeWidth='1.5'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                              />
                              <path
                                 d='M7.50074 5.89258C6.04328 6.10614 4.72052 6.86305 3.79794 8.01138C2.87536 9.15971 2.42123 10.6145 2.52671 12.0837C2.63218 13.553 3.28945 14.928 4.36659 15.9327C5.44374 16.9375 6.86105 17.4977 8.33408 17.5009C9.73669 17.5008 11.0923 16.9954 12.1527 16.0773C13.2131 15.1592 13.9073 13.8899 14.1082 12.5017'
                                 stroke='#1A2B3A'
                                 strokeWidth='1.5'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                              />
                           </svg>

                           <p className='text-sm font-normal text-neutral'>Edit</p>
                        </button>
                     </Link>

                     {/* publish-draft ads button */}
                     {item?.attributes?.status === "Active" ? (
                        <button
                           className='flex gap-2 pl-2 w-full py-2  hover:bg-success-content hover:rounded'
                           onClick={() => {
                              adStatusChange(item?.id, "disable");
                              setState(false);
                           }}
                        >
                           <BsEyeSlash className='text-xl text-base-300' />
                           <p className='text-sm font-normal text-base-300'>Disable</p>
                        </button>
                     ) : (
                        <button
                           className='flex gap-2 pl-2 w-full py-2  hover:bg-success-content hover:rounded'
                           onClick={() => {
                              adStatusChange(item?.id, "activate");
                              setState(false);
                           }}
                        >
                           <AiOutlineEye className='text-xl text-primary' />
                           <p className='text-sm font-normal text-primary'>Activate</p>
                        </button>
                     )}

                     {/* Boost ads button */}
                     <button
                        className='flex gap-2 pl-2 w-full py-2  hover:bg-success-content hover:rounded'
                        onClick={() => {
                           boostAd(item.id, item?.attributes?.adBoost);
                           setState(false);
                        }}
                     >
                        <BsEyeSlash className='text-xl text-base-300' />
                        <p className='text-sm font-normal text-base-300'>
                           {item?.attributes?.adBoost ? "Unboost" : "Boost Ad"}
                        </p>
                     </button>

                     {/* delete ads button */}
                     <button
                        className='flex gap-2 pl-2 w-full py-2  hover:bg-success-content hover:rounded'
                        onClick={() => {
                           deleteAd(item?.id);
                           setState(false);
                        }}
                     >
                        <HiOutlineTrash className='text-xl text-base-300' />
                        <p className='text-sm font-normal text-base-300'>Delete</p>
                     </button>
                  </div>
               </div>

               {/* overlay */}
               {state && (
                  <div
                     className='fixed inset-0 z-10 backdrop-blur-sm cursor-default'
                     onClick={() => setState(false)}
                  ></div>
               )}
            </div>
         </td>
      </>
   );
};

export default TableColAction;
