"use client";
import { createMessage } from "@/lib/fetch.data";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type SidebarAdsCardProps = {
   avatar: string;
   name: string;
   link: string;
};

export const SidebarProfileCard = ({ avatar, name, link }: SidebarAdsCardProps) => {
   return (
      <>
         {" "}
         {/* seller profile */}
         <div className='bg-white p-4 sm:p-7 rounded-2xl mt-9'>
            <div className='flex gap-6'>
               <Image
                  src={avatar}
                  width={70}
                  height={70}
                  alt='Image'
                  className='rounded-full w-[70px] h-[70px] flex-none object-cover object-center bg-slate-100'
               />
               <div>
                  <p className='text-xl font-medium text-neutral'>{name}</p>
                  <div className='flex gap-1 pt-1'>
                     {/* <HiStar className="text-warning text-lg" />
                                                <HiStar className="text-warning text-lg" />
                                                <HiStar className="text-warning text-lg" />
                                                <HiStar className="text-warning text-lg" />
                                                <IoIosStarHalf className="text-warning text-lg" />
                                                <p className="text-sm font-normal text-neutral">
                                                    123
                                                </p> */}
                     <div>
                        {/* <Rating
                      initialRating={
                        userData?.ratingDetails?.averageRating
                      }
                      readonly
                      emptySymbol={
                        <HiStar className="text-accent-content text-base" />
                      }
                      fullSymbol={
                        <HiStar className="text-warning text-base" />
                      }
                    /> */}
                     </div>
                  </div>
                  <Link href={link} className='text-xs sm:text-sm font-semibold text-primary'>
                     <button className='bg-primary-content rounded-lg py-3 px-7 mt-4'>View Seller Profile</button>
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
};

type SidebarInfoCardProps = {
   data: {
      id: number;
      attributes: {
         createdAt: string;
         updatedAt: string;
         publishedAt: string;
         adsSidebar: [
            {
               id: number;
               __component: string;
               title: string;
               lists: [
                  {
                     id: number;
                     title: string;
                  },
                  {
                     id: number;
                     title: string;
                  },
                  {
                     id: number;
                     title: string;
                  }
               ];
            }
         ];
         blogSIdebar: [];
      };
   };
};

export const SidebarInfoCard = ({ data }: SidebarInfoCardProps) => {
   // find widget.safety-tips from adsSidebar from data
   const adsSidebar = data?.attributes?.adsSidebar?.find((item) => item.__component === "widget.safety-tips");

   return (
      <>
         {/* <!-- Safety  tips --> */}
         {adsSidebar ? (
            <div className='bg-white mt-9 rounded-2xl p-7'>
               <h1 className='text-2xl font-bold text-neutral'>{adsSidebar?.title}</h1>
               <div className='pt-6 w-full'>
                  {/* <!-- safety tips --> */}
                  {adsSidebar?.lists?.map((item, index) => (
                     <div className={`flex ${item?.id === adsSidebar?.lists?.length ? "" : ""}`} key={item?.id}>
                        <div className='flex flex-col items-center mr-4 mt-1'>
                           <div>
                              <div className='flex items-center justify-center  rounded-full bg-primary w-4 h-4'></div>
                           </div>
                           <div
                              className={`w-px h-full bg-primary ${
                                 item?.id === adsSidebar?.lists?.length ? "hidden" : ""
                              }`}
                           ></div>
                        </div>
                        <div className='pb-4'>
                           <p className='text-base font-normal text-neutral lg:whitespace-nowrap'>{item?.title}</p>
                        </div>
                     </div>
                  ))}

                  {/* <div className="flex">
            <div className="flex flex-col items-center mr-4 relative">
              <div>
                <div className="flex items-center justify-center  rounded-full bg-primary w-4 h-4"></div>
              </div>
              <div className="w-px h-14 sm:h-16 md:h-14 bg-primary absolute"></div>
            </div>
            <div className="pb-4">
              <p className="text-base font-normal text-neutral lg:whitespace-nowrap">Avoid cash transactions</p>
            </div>
          </div>

          <div className="flex lg:items-center">
            <div className="flex flex-col items-center mr-4">
              <div className="flex items-center justify-center rounded-full bg-primary w-4 h-4"></div>
            </div>
            <div>
              <p className="text-base font-normal text-neutral lg:whitespace-nowrap">
                Beware of unrealistic offers
              </p>
            </div>
          </div> */}
               </div>
            </div>
         ) : null}
      </>
   );
};

export const SidebarMessageCard = ({ sellerId, adsId }: { sellerId: number; adsId: number }) => {
   // *** get user session
   const { data: user, status } = useSession();
   const [loading, setLoading] = useState(false);
   const [, startTransition] = useTransition();
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset
   } = useForm({
      mode: "onBlur"
   });

   // *** message submit handler
   const messageHandleSubmit = async (data: any) => {
      const toastId = toast.loading("Sending message...");

      setLoading(true);

      if (!user?.user) {
         toast.error("You must be logged in to send message", { id: toastId });
         setLoading(false);
         return;
      }

      // *** if user id and sellerId is same then return
      if (Number(user?.user?.id) === sellerId) {
         toast.error("You can't send message to yourself. Please contact with another seller", { id: toastId });
         setLoading(false);
         return;
      }

      const messageBody = {
         seller: sellerId,
         buyer: Number(user?.user?.id),
         ads: adsId,
         messages: [
            {
               userId: user?.user?.id as string,
               message: data.message,
               timestamp: new Date().toISOString()
            }
         ]
      };

      startTransition(() => {
         createMessage(messageBody, user?.user?.jwtToken).then((res) => {
            const { data, error, message } = res;
            if (error) {
               toast.error(message, { id: toastId });
               setLoading(false);
               return;
            }
            toast.success(message, { id: toastId });
            reset();
            setLoading(false);
         });
      });
   };

   return (
      <>
         <div className='bg-white p-7 rounded-2xl mt-9 h-full'>
            <p className='text-2xl font-bold text-neutral pb-8'>Contact With Seller</p>
            <form className='w-full' onSubmit={handleSubmit(messageHandleSubmit)}>
               <textarea
                  className={`py-4 px-3 w-full border focus:outline-none rounded h-32 ${
                     errors.message ? "border-red-500" : "border-themeWhiteLight2"
                  }`}
                  id='message'
                  {...register("message", {
                     required: true
                  })}
                  onKeyDown={(e: any) => {
                     if (e.key === "Enter" && e.shiftKey) {
                        e.preventDefault();
                        e.target.value += "\n";
                     }
                     if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(messageHandleSubmit)();
                     }
                  }}
                  placeholder='Shift + Enter for new line and Enter for send message'
                  disabled={status === "loading"}
               />
               {errors.message && <span className='text-red-400 text-sm italic'>This field is required</span>}

               <button
                  type='submit'
                  className='text-base font-normal text-white bg-primary rounded py-4 w-full mt-2 flex justify-center items-center gap-4'
                  disabled={loading}
               >
                  {loading ? "Please wait..." : "Send Message"}
                  {/* spinner */}
                  {loading && (
                     <div className='flex items-center justify-center '>
                        <div className='w-5 h-5 border-b-2 border-white rounded-full animate-spin'></div>
                     </div>
                  )}
               </button>
            </form>
         </div>
      </>
   );
};

type SidebarAdCardProps = {
   data: {
      id: number;
      attributes: {
         createdAt: string;
         updatedAt: string;
         publishedAt: string;
         adsSidebar: [
            {
               id: number;
               __component: string;
               alt: string;
               link: string;
               image: {
                  data: {
                     id: number;
                     attributes: {
                        name: string;
                        alternativeText: null | string;
                        caption: null | string;
                        width: number;
                        height: number;
                        formats: {
                           small: {
                              ext: string;
                              url: string;
                              hash: string;
                              mime: string;
                              name: string;
                              path: null | string;
                              size: number;
                              width: number;
                              height: number;
                              provider_metadata: {
                                 public_id: string;
                                 resource_type: "image";
                              };
                           };
                           thumbnail: {
                              ext: string;
                              url: string;
                              hash: string;
                              mime: string;
                              name: string;
                              path: null | string;
                              size: number;
                              width: number;
                              height: number;
                              provider_metadata: {
                                 public_id: string;
                                 resource_type: "image";
                              };
                           };
                        };
                        hash: string;
                        ext: string;
                        mime: string;
                        size: number;
                        url: string;
                        previewUrl: null | string;
                        provider: string;
                        provider_metadata: {
                           public_id: string;
                           resource_type: "image";
                        };
                        createdAt: string;
                        updatedAt: string;
                     };
                  };
               };
            }
         ];
         blogSIdebar: [];
      };
   };
};

export const SidebarAdCard = ({ data }: SidebarAdCardProps) => {
   // find widget.ad-banner from adsSidebar from data
   const adsSidebar = data?.attributes?.adsSidebar?.find((item) => item.__component === "widget.ad-banner");

   return adsSidebar ? (
      <Link href={adsSidebar?.link} target='_blank' className='mt-9 flex flex-wrap items-center justify-center'>
         <Image
            src={adsSidebar?.image?.data?.attributes?.url}
            alt={adsSidebar?.alt}
            width={428}
            height={528}
            quality={100}
            placeholder='blur'
            blurDataURL={adsSidebar?.image?.data?.attributes?.url}
            priority
            className='rounded-2xl object-cover object-center'
         />
      </Link>
   ) : null;
};
