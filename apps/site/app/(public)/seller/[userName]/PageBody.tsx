"use client";
import SellerAds from "@/components/seller-ads";
import { formatDate } from "@/utils/common";
import _ from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsShield } from "react-icons/bs";
import { VscCalendar } from "react-icons/vsc";

type Props = {
   adsData: any;
   metaTotal: any;
   sellerData: any;
};

const PageBody = ({ adsData, metaTotal, sellerData }: Props) => {
   const router = useRouter();
   if (!sellerData) {
      router.push("/not-found");
   }

   return (
      <>
         <section className='bg-success-content'>
            <div className='container mx-auto pt-16 pb-20 px-5 sm:px-0'>
               {/* Loader can be added here  */}
               {sellerData && (
                  <div className='grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-8 xl:gap-14'>
                     <div className='col-span-3 sm:col-span-5 lg:col-span-1 '>
                        <div className='bg-white relative shadow-sectionShadow text-info-content-800 rounded-2xl pb-10 sm:w-10/12 lg:w-full sm:mx-auto lg:mx-0'>
                           {/* <div className="right-0 mt-4 mr-4 rounded-[3px] absolute text-center font-bold text-xs text-white px-5 py-2 bg-orange-500 z-20 uppercase">
                  Individual
                </div> */}
                           <Image
                              src={"/banner.png"}
                              width={475}
                              height={200}
                              alt='Image'
                              className='rounded-lg w-full object-cover'
                              layout='responsive'
                           />
                           <div className='flex absolute -mt-16 left-0 right-0 justify-center'>
                              <Image
                                 src={sellerData?.avatar?.url || `/avatar/avatar.png`}
                                 width={130}
                                 height={130}
                                 alt={sellerData?.avatar?.alternativeText || "seller"}
                                 className='rounded-full object-center object-cover border-white mr-2 bg-slate-100'
                              />
                           </div>
                           <div className='py-7 px-2 pt-24'>
                              <p className='font-bold text-2xl text-center text-neutral pt-3'>{sellerData?.name}</p>
                              {/* <div className="flex gap-1 justify-center pt-3">
                    <HiStar className="text-warning text-base" />
                    <HiStar className="text-warning text-base" />
                    <HiStar className="text-warning text-base" />
                    <HiStar className="text-warning text-base" />
                    <IoIosStarHalf className="text-warning text-base" />
                    <p className="text-xs font-normal text-neutral">
                      (3 Reviews)
                    </p>
                  </div> */}
                           </div>

                           <div className='px-5 sm:px-10 md:px-6 lg:px-10'>
                              <div className='bg-primary-content w-full py-5 text-center rounded-lg'>
                                 <h3 className='text-2xl font-bold text-primary'>
                                    {adsData?.length < 10 && <span>0</span>}
                                    {adsData?.length}
                                 </h3>
                                 <p className='text-base font-semibold text-neutral'>
                                    Ad{adsData?.length > 1 && <span>s</span>}
                                 </p>
                              </div>

                              <div className='space-y-6 py-8'>
                                 {/* location  */}
                                 {/* <div className="flex items-center gap-6 md:gap-2 lg:gap-6">
                        <div className="bg-primary-content text-primary p-4 my-auto rounded-lg">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 3C11.043 3 7 7.04297 7 12C7 13.4062 7.57031 15.0195 8.34375 16.7812C9.11719 18.543 10.1133 20.4141 11.125 22.1562C13.1484 25.6445 15.1875 28.5625 15.1875 28.5625L16 29.75L16.8125 28.5625C16.8125 28.5625 18.8516 25.6445 20.875 22.1562C21.8867 20.4141 22.8828 18.543 23.6562 16.7812C24.4297 15.0195 25 13.4062 25 12C25 7.04297 20.957 3 16 3ZM16 5C19.8789 5 23 8.12109 23 12C23 12.8008 22.5703 14.3164 21.8438 15.9688C21.1172 17.6211 20.1133 19.4531 19.125 21.1562C17.5547 23.8672 16.5781 25.3008 16 26.1562C15.4219 25.3008 14.4453 23.8672 12.875 21.1562C11.8867 19.4531 10.8828 17.6211 10.1562 15.9688C9.42969 14.3164 9 12.8008 9 12C9 8.12109 12.1211 5 16 5ZM16 10C14.8945 10 14 10.8945 14 12C14 13.1055 14.8945 14 16 14C17.1055 14 18 13.1055 18 12C18 10.8945 17.1055 10 16 10Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="w-9/12">
                          <p className="text-base font-bold text-neutral">LOCATION</p>
                          <p className="text-lg font-normal text-neutral">128/A Lunetta Street, California</p>
                        </div>
                      </div> */}
                                 {/* account type  */}
                                 {/* <div className="flex items-center gap-6 md:gap-2 lg:gap-6">
                      <div className="bg-primary-content p-4 my-auto rounded-lg">
                        <RiBriefcaseLine className="h-8 w-8 text-primary" />
                      </div>
                      <div className="w-9/12">
                        <p className="text-base font-bold text-neutral">ACCOUNT</p>
                        <p className="text-lg font-normal text-neutral truncate">BUSINESS User</p>
                      </div>
                    </div> */}
                                 {/* user type  */}
                                 <div className='flex items-center gap-6 md:gap-2 lg:gap-6'>
                                    <div className='bg-primary-content p-4 my-auto rounded-lg'>
                                       <BsShield className='h-8 w-8 text-primary' />
                                    </div>
                                    <div className='w-9/12'>
                                       <p className='text-base font-bold text-neutral'>USER TYPE</p>
                                       <p className='text-lg font-normal text-neutral truncate'>
                                          {sellerData?.confirmed ? "VERIFIED" : "NON-VERIFIED"}
                                       </p>
                                    </div>
                                 </div>

                                 <div className='flex items-center gap-6 md:gap-2 lg:gap-6'>
                                    <div className='bg-primary-content p-4 my-auto rounded-lg'>
                                       <VscCalendar className='h-8 w-8 text-primary' />
                                    </div>
                                    <div className='w-9/12'>
                                       <p className='text-base font-bold text-neutral'>MEMBER SINCE</p>
                                       <p className='text-lg font-normal text-neutral truncate'>
                                          {/* {date} */}
                                          {formatDate(sellerData?.createdAt)}
                                       </p>
                                    </div>
                                 </div>
                              </div>

                              {/* phone  */}
                              {/* <div>
                    <button className="bg-secondary rounded-lg w-full mt-3 py-4">
                      <Link href="#">
                        <p className="text-2xl text-bold text-white">+12345678</p>
                        <p className="text-sm text-bold text-white mt-2">CLICK TO CALL NOW</p>
                      </Link>
                    </button>
                  </div> */}
                              {/* review  */}
                              {/* <div>
                    <button className="bg-primary rounded-lg w-full mt-3 py-4">
                      <p className="text-xl text-bold text-white my-2">Review Seller</p>
                    </button>
                  </div> */}
                           </div>
                        </div>
                     </div>

                     <div className='col-span-3 sm:col-span-5 lg:col-span-2 mt-12 md:mt-0'>
                        <p className='text-3xl text-neutral font-bold'>Active Ads</p>

                        {/* <!-- active ads card items --> */}
                        <div className='space-y-7 pt-10 pb-10'>
                           {_.map(adsData, (item, index) => (
                              <SellerAds key={index} item={item} />
                           ))}
                        </div>

                        {adsData?.length == 0 && (
                           <div className='space-y-7 pt-10 text-center '>
                              <h3 className='text-2xl font-semibold'>No Data Found</h3>
                           </div>
                        )}

                        {/* <div>
                <Pagination />
                </div> */}

                        {/* <!-- review and feedBack --> */}
                        {/* <div>
                <div className="flex justify-between">
                  <h1 className="text-xl sm:text-3xl text-neutral font-bold">Review &amp; Feedback</h1>
                  <div className="flex gap-2">
                    <HiStar className="text-warning text-2xl" />
                    <p className="text-base text-neutral font-normal">
                      <strong>0.0 </strong>
                      Review
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap sm:grid grid-cols-2 gap-7 pt-9 ">
                  {_.map([1, 2, 3], (item, index) => (
                    <div className="bg-white p-10 rounded-2xl shadow-owlCard" key={index}>
                      <p className="text-base sm:text-lg font-normal text-base-300 overflow-hidden text-clip max-h-24 sm:max-h-28">
                        Useful
                      </p>
                      <div className="flex gap-4 pt-5">
                        <div>
                          <Image
                            className="m-auto rounded-full"
                            src={`/userPlaceholder.png`}
                            width={50}
                            height={50}
                            alt="seller"
                          />
                        </div>
                        <div>
                          <p className="text-base sm:text-lg font-semibold text-primary">John Doe</p>
                          <div className="flex gap-1">
                            <HiStar className="text-warning text-base" />
                            <HiStar className="text-warning text-base" />
                            <HiStar className="text-warning text-base" />
                            <HiStar className="text-warning text-base" />
                            <IoIosStarHalf className="text-warning text-base" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

                        {/* <button className="text-base font-semibold text-white bg-secondary rounded py-3 px-7 mt-14 grid m-auto">
                Load More
              </button> */}

                        {/* <div className="space-y-7 pt-10 text-center ">
                <h3 className="text-2xl font-semibold">No Data Found</h3>
              </div> */}
                     </div>
                  </div>
               )}
            </div>
         </section>
      </>
   );
};

export default PageBody;
