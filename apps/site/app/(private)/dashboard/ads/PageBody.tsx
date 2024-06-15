"use client";
import SearchFilter from "@/components/ads-search-form";
import AdsTable from "@/components/table/ads";
import AdsTableSmall from "@/components/table/ads-small";
import { useGlobalContext } from "@/context/store";
import { find } from "@/lib/strapi";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

type Props = {
   data: any;
   metaTotal: any;
   jwtToken: string | undefined;
   userId: string | undefined;
};

const PageBody = ({ data, metaTotal, jwtToken, userId }: Props) => {
   const { direction } = useGlobalContext();

   const router = useRouter();
   const searchParams = useSearchParams();
   // *** collect selected ads ***
   const [selectedAds, setSelectedAds] = useState<number[]>([]);
   // *** search query ***
   const [searchQuery, setSearchQuery] = useState<string>("");
   // *** ads data ***
   const [adsData, setAdsData] = useState<any[]>(data);
   const [meta, setMeta] = useState<any>(metaTotal);
   // *** loading hook
   const [loading, setLoading] = useState(false);
   // *** sort hook
   const [sort, setSort] = useState<"asc" | "desc">("desc");

   // *** set data from server ***
   useEffect(() => {
      setAdsData(data);
   }, [data]);

   // *** search handler ***
   useEffect(() => {
      // search after typing stop
      const timeOutId = setTimeout(async () => {
         if (searchQuery !== "") {
            setLoading(true);
         }
         const language = getCookie("lang");
         const { data: searchFilter } = await find(
            "manage-ads",
            {
               filters: {
                  $or: [
                     {
                        title: {
                           $containsi: searchQuery
                        }
                     },
                     {
                        description: {
                           $containsi: searchQuery
                        }
                     },
                     {
                        location: {
                           $containsi: searchQuery
                        }
                     },
                     {
                        condition: {
                           $containsi: searchQuery
                        }
                     },
                     {
                        status: {
                           $eqi: searchQuery
                        }
                     }
                  ],
                  seller: userId
               },
               populate: "deep",
               publicationState: "live",
               pagination: {
                  page: 1,
                  pageSize: 10,
                  withCount: true
               },
               sort: {
                  createdAt: "desc"
               },
               locale: [language]
            },
            "no-store",
            jwtToken
         );
         // remove page query form params
         window.history.replaceState({}, "", window.location.pathname);
         setLoading(false);
         setAdsData(searchFilter?.data);
         setMeta(searchFilter?.meta);
      }, 400);

      // clear timeout
      return () => clearTimeout(timeOutId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [searchQuery]);

   // *** pagination handler ***
   const paginationHandler = async (page: number) => {
      const language = getCookie("lang");
      setLoading(true);
      const { data: paginationData } = await find(
         "manage-ads",
         {
            filters: {
               seller: userId
            },
            populate: "deep",
            publicationState: "live",
            pagination: {
               page: page,
               pageSize: 10,
               withCount: true
            },
            sort: {
               createdAt: "desc"
            },
            locale: [language]
         },
         "no-store",
         jwtToken
      );
      setLoading(false);
      setAdsData(paginationData?.data);
      setMeta(paginationData?.meta);
   };

   // *** delete all selected ads function handler ***
   const deleteSelectedAds = async () => {
      toast.error("Delete All Selected Ads Functionality is not implemented yet. We are working on it.", {
         duration: 5000,
         position: "top-center",
         style: {
            borderRadius: "6px"
         }
      });
   };

   useEffect(() => {
      // search after typing stop
      const timeOutId = setTimeout(async () => {
         if (sort !== "desc") {
            setLoading(true);
         }
         const language = getCookie("lang");
         const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;
         const { data: searchFilter } = await find(
            "manage-ads",
            {
               filters: {
                  title: {
                     $containsi: searchQuery
                  },
                  seller: userId
               },
               populate: "deep",
               publicationState: "live",
               pagination: {
                  page: page,
                  pageSize: 10,
                  withCount: true
               },
               sort: {
                  createdAt: sort
               },
               locale: [language]
            },
            "no-store",
            jwtToken
         );
         // remove page query form params
         window.history.replaceState({}, "", window.location.pathname);
         setLoading(false);
         setAdsData(searchFilter?.data);
         setMeta(searchFilter?.meta);
      }, 400);

      // clear timeout
      return () => clearTimeout(timeOutId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [sort]);

   return (
      <section className='bg-success-content'>
         <div className='pb-10'>
            {/* header search and filter */}
            <div className='flex flex-col md:flex-row gap-4 lg:gap-0 items-center justify-between pt-10'>
               <div className='flex flex-wrap sm:flex-nowrap md:gap-0 gap-6 items-center w-full'>
                  <div className='flex gap-2 flex-wrap sm:flex-nowrap'>
                     {/* <button className="bg-white p-3 rounded hover:bg-primary group">
                <BsEyeSlash className="text-base-300 text-xl group-hover:text-white" />
              </button> */}
                     {/* FIXME: Selected item delete hidden  */}
                     {/*<button*/}
                     {/*  className={`p-3 rounded ${*/}
                     {/*    selectedAds.length === 0 ? "cursor-not-allowed bg-gray-200" : "bg-white hover:bg-error"*/}
                     {/*  } group`}*/}
                     {/*  disabled={selectedAds.length === 0}*/}
                     {/*  onClick={deleteSelectedAds}*/}
                     {/*>*/}
                     {/*  <HiOutlineTrash*/}
                     {/*    className={`text-base-300 text-xl ${*/}
                     {/*      selectedAds.length === 0 ? "" : "group-hover:text-white"*/}
                     {/*    }`}*/}
                     {/*  />*/}
                     {/*</button>*/}
                     <Link
                        href={"/dashboard/ads/create-ad"}
                        className='text-base font-semibold text-white whitespace-nowrap bg-secondary rounded px-7 py-2.5 sm:w-auto block md:hidden'
                     >
                        Create a New Ad
                     </Link>
                  </div>
                  <div className='w-full md:w-4/12'>
                     <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  </div>
               </div>
               <Link
                  href={"/dashboard/ads/create-ad"}
                  className='text-base font-semibold text-white whitespace-nowrap bg-secondary rounded px-7 py-2.5 w-full sm:w-auto hidden md:block'
               >
                  Create a New Ad
               </Link>
            </div>

            {/* table for large device*/}
            <div className='hidden overflow-hidden lg:flex flex-col pt-6 relative'>
               {loading && (
                  <div className='absolute top-0 left-0 w-full h-full bg-transparent backdrop-blur-sm z-10 flex items-center justify-center'>
                     <div className='w-10 h-10 border-b-2 border-t-2 border-primary rounded-full animate-spin'></div>
                  </div>
               )}
               <AdsTable
                  adsData={adsData}
                  selectedAds={selectedAds}
                  setSelectedAds={setSelectedAds}
                  sort={sort}
                  setSort={setSort}
               />

               {/* Empty message */}
               {adsData?.length === 0 && (
                  <div className='flex items-center justify-center py-20'>
                     <p className='text-base-content text-lg font-semibold'>No Ads found</p>
                  </div>
               )}
            </div>

            {/* table for small device */}
            <div className='lg:hidden !pt-16 sm:pt-10 relative mb-5'>
               {loading && (
                  <div className='absolute top-0 left-0 w-full h-full bg-transparent backdrop-blur-sm z-10 flex items-center justify-center'>
                     <div className='w-10 h-10 border-b-2 border-t-2 border-primary rounded-full animate-spin'></div>
                  </div>
               )}
               <AdsTableSmall adsData={adsData} selectedAds={selectedAds} setSelectedAds={setSelectedAds} />
               {/* Empty message */}
               {adsData?.length === 0 && (
                  <div className='flex items-center justify-center py-20'>
                     <p className='text-base-content text-lg font-semibold'>No Ads found</p>
                  </div>
               )}
            </div>

            {/* pagination */}
            <div className='flex justify-end items-center gap-3'>
               <div>
                  <p className='text-sm font-normal text-base-content'>
                     Total {meta?.pagination?.total || 0} Ads Available
                  </p>
               </div>
               <button
                  className={`bg-transparent border border-primary p-1 rounded-full text-base-300 ${
                     meta?.pagination?.page === 1
                        ? "cursor-not-allowed opacity-30"
                        : "hover:bg-primary hover:text-white"
                  }`}
                  disabled={meta?.pagination?.page === 1}
                  onClick={() => {
                     // add page parameter to the query
                     const page = meta?.pagination?.page - 1;
                     paginationHandler(page);
                     router.push(`/dashboard/ads?page=${page}`);
                  }}
               >
                  <MdOutlineChevronLeft className={`${direction === "rtl" ? "rotate-180" : ""} text-xl`} />
               </button>
               <button
                  className={`bg-transparent border border-primary p-1 rounded-full text-base-300 ${
                     meta?.pagination?.page === meta?.pagination?.pageCount || !meta?.pagination?.pageCount
                        ? "cursor-not-allowed opacity-30"
                        : "hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => {
                     // add page parameter to the query
                     const page = meta?.pagination?.page + 1;
                     paginationHandler(page);
                     router.push(`/dashboard/ads?page=${page}`);
                  }}
                  disabled={meta?.pagination?.page === meta?.pagination?.pageCount}
               >
                  <MdOutlineChevronRight className={`${direction === "rtl" ? "rotate-180" : ""} text-xl`} />
               </button>
            </div>
            {/* <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-0 items-center justify-center sm:justify-between mt-3">
          <div></div>
          <p className="text-sm font-normal text-base-content">
            Total {meta?.pagination?.total || 0} Ads Available
          </p>
        </div> */}
         </div>
      </section>
   );
};

export default PageBody;
