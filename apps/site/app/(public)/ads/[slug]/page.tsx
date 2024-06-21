import _ from "lodash";

import { MdOutlineLocationOn } from "react-icons/md";

import { ImageGallery } from "@/components/gallery";
import { SidebarAdCard, SidebarInfoCard, SidebarMessageCard, SidebarProfileCard } from "@/components/widget/sidebar";
import { find } from "@/lib/strapi";
import { StrapiSeoFormate } from "@/lib/strapiSeo";
import { getLanguageFromCookie } from "@/utils/language";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Fragment } from "react";

// *** generate metadata type
type Props = {
   params: { slug: string };
   searchParams: { [key: string]: string | string[] | undefined };
};

// *** generate metadata for the page
export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const pageSlug = params?.slug;
   const language = getLanguageFromCookie();
   // fetch data
   const { data } = await find(
      "manage-ads",
      {
         filters: {
            slug: {
               $eq: pageSlug
            }
         },
         populate: "deep",
         publicationState: "live",
         locale: [language]
      },
      "no-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   // if data?.data?.attributes?.seo is not available, return default data
   if (!data?.data[0]?.attributes?.seo) {
      return {
         title: data?.data[0]?.attributes?.title || "Title not found",
         description: data?.data[0]?.attributes?.description || "Description not found"
      };
   }

   return StrapiSeoFormate(data?.data[0]?.attributes?.seo, `/ads/${pageSlug}`);
}

const SingleAds = async ({
   params,
   searchParams
}: {
   params: { slug: string };
   searchParams: { [key: string]: string | string[] | undefined };
}) => {
   const pageSlug = params?.slug;
   const language = getLanguageFromCookie();

   // *** get manage-ads data from strapi ***
   const { data: AdsDetailsData, error } = await find(
      "manage-ads",
      {
         filters: {
            slug: {
               $eq: pageSlug
            }
         },
         populate: "deep",
         publicationState: "live",
         locale: [language]
      },
      "force-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   // *** get sidebar data from strapi ***
   const { data: sidebarData } = await find(
      "sidebar",
      {
         populate: "deep",
         publicationState: "live",
         locale: [language]
      },
      "no-cache",
      process.env.STRAPI_AUTH_TOKEN
   );

   // *** if error, return error page ***
   if (error) {
      throw error;
   }

   const featuredImage = _.get(
      AdsDetailsData?.data[0]?.attributes?.featuredImage,
      "data.attributes.formats.thumbnail.url",
      null
   );

   const gallery = AdsDetailsData?.data[0]?.attributes?.gallery?.data;

   const { title, description, condition, price, location, negotiable } = AdsDetailsData?.data[0]?.attributes || {};

   const dateFormate = new Date(AdsDetailsData.data[0]?.attributes?.updatedAt);
   const date = dateFormate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
   });

   return (
      <Fragment>
         <section>
            {/* {!adsData && !adsError && <LoaderPage />} */}
            <div className='bg-primary bg-center bg-no-repeat bg-cover'>
               <div className='container mx-auto pt-24 pb-16 px-5 sm:px-0'>
                  <div className='grid'>
                     <div className='grid grid-cols-5 lg:grid-cols-9 gap-8 relative'>
                        <div className='col-span-5 lg:col-span-6 w-full'>
                           <div className='grid xl:flex items-center justify-between gap-8 xl:gap-10'>
                              <div>
                                 {condition && <p className='text-base font-normal text-white'>{condition}</p>}
                                 {title && <h1 className='text-4xl font-bold text-white pt-1'>{title}</h1>}
                                 {location && (
                                    <div className='flex gap-2 items-center pt-3'>
                                       <MdOutlineLocationOn className='text-2xl text-white' />
                                       <p className='text-xl font-normal text-white'>{location?.description}</p>
                                    </div>
                                 )}
                              </div>
                              <div className='flex-none'>
                                 <h1 className='text-4xl font-bold text-white'>${price}</h1>
                                 <button className='bg-secondary py-1 px-6 rounded text-white mt-3 uppercase'>
                                    {negotiable ? "Negotiable" : "Fixed"} PRICE
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className='bg-success-content'>
               <div className='container mx-auto pb-32'>
                  <div className='grid'>
                     <div className='grid grid-cols-5 lg:grid-cols-9 gap-8 pt-7  px-5 sm:px-0 sm:pb-16 xl:pb-0 relative'>
                        {/* left side */}
                        <div className='col-span-5 lg:col-span-6 w-full'>
                           {gallery && gallery.length > 0 ? (
                              <ImageGallery gallery={gallery} />
                           ) : (
                              <Image
                                 src={featuredImage || "/images/placeholder.png"}
                                 alt='Ads Image'
                                 width={1920}
                                 height={1080}
                                 className='object-cover w-full h-full rounded-2xl'
                                 layout='responsive'
                              />
                           )}
                           <div className='bg-white p-6 my-7 w-full rounded-2xl'>
                              <h1 className='text-2xl font-bold text-neutral'>Description</h1>
                              <p className='text-lg fxont-normal text-base-300 pt-3'>{description}</p>
                              <h1 className='text-2xl font-bold text-neutral pt-6'>Specification</h1>
                              <ul className='space-y-2 pt-5'>
                                 {/* {_.map(adsData?.specifications, (item, index) => (
                        <li key={index} className="flex gap-4 items-center">
                          <CgChevronRightO className="text-secondary text-xl" />
                          <p className="text-base font-normal text-neutral">
                            {item}
                          </p>
                        </li>
                      ))} */}
                              </ul>

                              <div className='pt-10'>
                                 <h2 className='text-2xl font-bold text-neutral'>Tags</h2>

                                 <div className='flex flex-wrap gap-3 pt-4'>
                                    {/* {_.map(adsData?.tags, (item, index) => (
                          <p
                            key={index}
                            className="text-sm font-normal text-base-300 border p-1 rounded"
                          >
                            {item}
                          </p>
                        ))} */}
                                 </div>
                              </div>

                              <div className='flex flex-wrap gap-3 pt-10'>
                                 {/* favourite  button */}
                                 {/* {false ? (
                        false ? (
                          <button
                            className="bg-primary hover:bg-secondary transition-all ease-in-out duration-300 py-2 px-4 flex gap-2 items-center rounded-md"
                          >
                            <RiHeartFill className="text-lg sm:text-xl text-white" />
                            {false && <p className="text-sm sm:text-base font-normal text-white">Saved</p>}
                            {false && (
                              <div className="flex items-center justify-center ">
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                              </div>
                            )}
                          </button>
                        ) : (
                          <button
                            className="bg-primary hover:bg-secondary transition-all ease-in-out duration-300 py-2 px-4 flex gap-2 items-center rounded-md"
                          >
                            <BiHeart className="text-lg sm:text-xl text-white" />
                            {true && <p className="text-sm sm:text-base font-normal text-white">Save</p>}
                            {false && (
                              <div className="flex items-center justify-center ">
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                              </div>
                            )}
                          </button>
                        )
                      ) : (
                        <button
                          className="bg-primary hover:bg-secondary transition-all ease-in-out duration-300 py-2 px-4 flex gap-2 items-center rounded-md"
                        >
                          <BiHeart className="text-lg sm:text-xl text-white" />
                          <p className="text-sm sm:text-base font-normal text-white">Save</p>
                        </button>
                      )} */}

                                 {/* share button */}
                                 <button
                                    className='bg-primary hover:bg-secondary transition-all ease-in-out duration-300 py-2 px-4 flex gap-2 items-center rounded-md'
                                    // onClick={() => {
                                    //   setShareUp(!shareUp);
                                    // }}
                                 >
                                    <svg
                                       width='20'
                                       height='20'
                                       viewBox='0 0 20 20'
                                       fill='none'
                                       xmlns='http://www.w3.org/2000/svg'
                                    >
                                       <path
                                          d='M10.5 2.48633C9.07031 2.48633 7.91146 3.62575 7.85417 5.03449C5.45052 6.04961 3.83333 8.4139 3.83333 11.1045C3.83333 11.2184 3.82813 11.3427 3.83333 11.4774C3.04427 11.9383 2.5 12.7851 2.5 13.7562C2.5 15.2142 3.70052 16.408 5.16667 16.408C5.54948 16.408 5.91927 16.3277 6.25 16.1801C7.40625 17.146 8.91146 17.7338 10.5 17.7338C12.0885 17.7338 13.5938 17.146 14.75 16.1801C15.0807 16.3277 15.4505 16.408 15.8333 16.408C17.2995 16.408 18.5 15.2142 18.5 13.7562C18.5 12.7748 17.9505 11.915 17.1458 11.4567C17.1563 11.3505 17.1667 11.2417 17.1667 11.1045C17.1667 8.4139 15.5495 6.04961 13.1458 5.03449C13.0885 3.62575 11.9297 2.48633 10.5 2.48633ZM10.5 3.8122C11.2448 3.8122 11.8333 4.39745 11.8333 5.13807C11.8333 5.87869 11.2448 6.46394 10.5 6.46394C9.75521 6.46394 9.16667 5.87869 9.16667 5.13807C9.16667 4.39745 9.75521 3.8122 10.5 3.8122ZM8.14583 6.36036C8.59375 7.20456 9.47917 7.78981 10.5 7.78981C11.5208 7.78981 12.4063 7.20456 12.8542 6.36036C14.6406 7.22269 15.8333 9.03541 15.8333 11.1045C14.3672 11.1045 13.1667 12.2983 13.1667 13.7562C13.1667 14.3492 13.3724 14.8879 13.7083 15.3307C12.8177 16.0014 11.6719 16.408 10.5 16.408C9.32813 16.408 8.18229 16.0014 7.29167 15.3307C7.6276 14.8879 7.83333 14.3492 7.83333 13.7562C7.83333 12.2983 6.63281 11.1045 5.16667 11.1045C5.16667 9.03541 6.35938 7.22269 8.14583 6.36036ZM5.16667 12.4304C5.91146 12.4304 6.5 13.0156 6.5 13.7562C6.5 14.4969 5.91146 15.0821 5.16667 15.0821C4.42188 15.0821 3.83333 14.4969 3.83333 13.7562C3.83333 13.0156 4.42188 12.4304 5.16667 12.4304ZM15.8333 12.4304C16.5781 12.4304 17.1667 13.0156 17.1667 13.7562C17.1667 14.4969 16.5781 15.0821 15.8333 15.0821C15.0885 15.0821 14.5 14.4969 14.5 13.7562C14.5 13.0156 15.0885 12.4304 15.8333 12.4304Z'
                                          fill='white'
                                       />
                                    </svg>

                                    <span className='text-sm sm:text-base font-normal text-white'>Share</span>
                                 </button>

                                 {/* report  button */}
                                 {/* <button
                        className="bg-primary hover:bg-secondary transition-all ease-in-out duration-300 py-2 px-4 flex gap-2 items-center rounded-md"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10 2.01172L9.45312 2.94922L1.95312 15.9375L1.42578 16.875H18.5742L18.0469 15.9375L10.5469 2.94922L10 2.01172ZM10 4.51172L16.4062 15.625H3.59375L10 4.51172ZM9.375 8.75V12.5H10.625V8.75H9.375ZM9.375 13.125V14.375H10.625V13.125H9.375Z"
                            fill="white"
                          />
                        </svg>
                        <span className="text-sm sm:text-base font-normal text-white">Report</span>
                      </button> */}
                              </div>
                           </div>
                        </div>

                        {/* right side  */}
                        <div className='col-span-5 lg:col-span-3 w-full lg:-mt-52 h-full sm:relative'>
                           <div className=''>
                              {/* <!-- posted by information --> */}
                              {/* <SidebarPostCard /> */}

                              {/* <!-- form section --> */}
                              <SidebarMessageCard
                                 sellerId={AdsDetailsData?.data[0]?.attributes?.seller?.data?.id}
                                 adsId={AdsDetailsData?.data[0]?.id}
                              />

                              <SidebarProfileCard
                                 avatar={
                                    AdsDetailsData?.data[0]?.attributes?.seller?.data?.attributes?.avatar?.data
                                       ?.attributes?.formats?.thumbnail?.url ?? `/avatar/avatar.png`
                                 }
                                 name={
                                    AdsDetailsData?.data[0]?.attributes?.seller?.data?.attributes?.name ??
                                    AdsDetailsData?.data[0]?.attributes?.seller?.data?.attributes?.username ??
                                    "N/A"
                                 }
                                 link={
                                    AdsDetailsData?.data[0]?.attributes?.seller?.data?.attributes?.username
                                       ? `/seller/${"testUser"}`
                                       : "#"
                                 }
                              />

                              {/* <!-- Location on Google Map 1 --> */}
                              {/* <SidebarMap /> */}
                              {/* <GoogleMap
                      location={AdsDetailsData?.data[0]?.attributes?.location}
                      zoom={15}
                      height="400px"
                    /> */}

                              {/* <!-- Safety  tips --> */}
                              <SidebarInfoCard data={sidebarData?.data} />

                              {/* <!-- Advertisement Banner --> */}
                              <SidebarAdCard data={sidebarData?.data} />
                           </div>
                        </div>
                     </div>

                     {/* <!-- Top Ads --> */}
                     {/* <div className="px-5 py-10">
                <div className="text-center">
                  <h2 className="font-bold text-4xl text-neutral">
                    Recommended <span className="text-secondary">Ads</span>
                  </h2>
                  <p className="text-lg text-neutral lg:w-[38%] w-full mx-auto mt-5">
                    Lorem ipsum the dit adipiscing Aenean adicinging kiliuy
                    scope mentin scope mentin. scope mentin aenan.
                  </p>
                </div>
                {relatedAdsData?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7 mt-12">
                    {_.map(_.slice(relatedAdsData, 0, 8), (item, index) => (
                      <AdsItem key={index} item={item} />
                    ))}
                  </div>
                )}

                {relatedAdsData?.length == 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-7 mt-12 text-center">
                    <h3 className="text-3xl font-semibold pt-10 pb-40">
                      No Data Found
                    </h3>
                  </div>
                )}
              </div> */}
                  </div>
               </div>
            </div>
         </section>

         {/* Message popup */}
         {/* <PopupModule
                PopupTitle="Message"
                Popup={messageUp}
                PopupHandler={() => {
                    setMessageUp(!messageUp);
                }}
            >
                {loggedIn && userData ? (
                    <form
                        className="grid grid-cols-1 gap-4"
                        onSubmit={handleSubmit(messageHandleSubmit)}
                    >
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-themeDarker font-normal"
                                htmlFor="note"
                            >
                                Message:
                            </label>
                            <textarea
                                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border "border-gray"
                                    placeholder:font-normal h-40 placeholder:text-xss1 rounded placeholder-themeDarkAlt focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                                id="note"
                                {...register('message', { required: true })}
                                placeholder="Write your message"
                            />
                            {messageErrors?.message && (
                                <span className="text-red-500 text-xss italic">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <button
                            className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 bg-primary rounded-md`}
                            type="submit"
                            disabled={messageIsSubmitting}
                        >
                            {messageIsSubmitting
                                ? 'Please wait...'
                                : 'Send Message'}
                            {messageIsSubmitting && (
                                <div className="flex items-center justify-center ">
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center grid justify-center items-center h-40">
                        <div>
                            <p className="text-xxs text-themeLighter !mb-4">
                                You must be logged in to send message.
                            </p>
                            <button
                                className="bg-primary text-white px-10 !py-3 hover:bg-secondary transition-all duration-300 ease-in-out rounded text-base font-normal"
                                onClick={() => {
                                    LoginPopupHandler();
                                    setMessageUp(!messageUp);
                                }}
                            >
                                Login Now
                            </button>
                        </div>
                    </div>
                )}
            </PopupModule> */}

         {/* Share popup */}
         {/* <PopupModule
        PopupTitle="Share"
        Popup={shareUp}
        PopupHandler={() => {
          setShareUp(!shareUp);
        }}
      >
        <div className="text-center grid justify-center items-center h-40">
          <div className="flex gap-3">
            <FacebookShareButton
              url={`http://localhost:3000//ads/${slug}`}
              // url={`${process.env.NEXT_PUBLIC_BASE_URL}/ads/${slug}`}
              quote={`${adsData?.adTitle}`}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition duration-300"
              >
                <FaFacebookF className="text-white" />
              </a>
            </FacebookShareButton>
            <TwitterShareButton
              url={`http://localhost:3000//ads/${slug}`}
              // url={`${process.env.NEXT_PUBLIC_BASE_URL}/ads/${slug}`}
              title={`${adsData?.adTitle}`}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition duration-300"
              >
                <FaTwitter className="text-white" />
              </a>
            </TwitterShareButton>
            <LinkedinShareButton
              url={`http://localhost:3000//ads/${slug}`}
              // url={`${process.env.NEXT_PUBLIC_BASE_URL}/ads/${slug}`}
              title={`${adsData?.adTitle}`}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition duration-300"
              >
                <FaLinkedinIn className="text-white" />
              </a>
            </LinkedinShareButton>
            <PinterestShareButton
              url={`http://localhost:3000//ads/${slug}`}
              // url={`${process.env.NEXT_PUBLIC_BASE_URL}/ads/${slug}`}
              media={socialShareImageUrl}
              description={`${adsData?.adTitle}`}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition duration-300"
              >
                <FaPinterest className="text-white" />
              </a>
            </PinterestShareButton>
          </div>
        </div>
      </PopupModule> */}

         {/* Report popup */}
         {/* <PopupModule
        PopupTitle="Report"
        Popup={reportUp}
        PopupHandler={() => {
          setReportUp(!reportUp);
        }}
      >
        {loggedIn && userData ? (
          <form
            className="grid grid-cols-1 gap-4"
            onSubmit={repportSubmit(reportHandleSubmit)}
          >
            <div className="mb-6">
              <label
                className="block mb-2 text-themeDarker font-normal"
                htmlFor="note"
              >
                Reason:
              </label>
              <textarea
                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border "border-gray"
                                    placeholder:font-normal h-40 placeholder:text-xss1 rounded placeholder-themeDarkAlt focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                id="note"
                {...reportRegister("reason", {
                  required: true,
                })}
                placeholder="Write your message"
              />
              {reportErrors?.reason && (
                <span className="text-red-500 text-xss italic">
                  This field is required
                </span>
              )}
            </div>
            <button
              className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 bg-primary rounded-md`}
              type="submit"
              disabled={reportIsSubmitting}
            >
              {reportIsSubmitting ? "Please wait..." : "Send Report"}
              {/* spinner */}

         {/* JSON_LD for SEO */}
         {AdsDetailsData?.data[0]?.attributes?.seo?.structuredData && (
            <Script
               id='json-ld-structured-data'
               type='application/ld+json'
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify(AdsDetailsData?.data[0]?.attributes?.seo?.structuredData)
               }}
            />
         )}
      </Fragment>
   );
};

export default SingleAds;
