"use client";
import BasicInfo from "@/components/create-ads/basic-info";
import Gallery from "@/components/create-ads/gallery";
import { uploadImageAndSetId } from "@/lib/fetch.data";
import { find, updateOne } from "@/lib/strapi";
import { getUrls } from "@/utils/common";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const formItem = [
   {
      id: 1,
      name: "Basic Info"
   },

   {
      id: 2,
      name: "Gallery"
   }
];

const EditAds = ({ CategoriesData }: { CategoriesData: any }) => {
   const { data: user } = useSession();
   const searchParams = useSearchParams() as any;
   const [isLoading, setIsLoading] = React.useState(false);
   const [active, setActive] = React.useState(1);
   const [adData, setAdData] = React.useState({}) as any;
   const [adId, setAdId] = React.useState("") as any;
   const [coverName, setCoverName] = React.useState(null);
   const [galleryName, setGalleryName] = React.useState([]);
   const [videoName, setVideoName] = React.useState(null);

   const router = useRouter();
   const activeAd = searchParams.get("active_ad");

   // fetch blogs with search query and pagination
   useEffect(() => {
      if (activeAd) {
         setIsLoading(true);
         (async () => {
            const { data: adsDetailsData, error } = await find(
               "manage-ads",
               {
                  filters: {
                     slug: {
                        $eq: activeAd
                     }
                  },
                  populate: "deep",
                  publicationState: "live",
                  locale: "en"
               },
               "no-cache",
               user?.user?.jwtToken
            );
            // const { data: adsDetailsData } = await findOne("manage-ads", { search: SearchQuery, per_page: pageData });
            setAdData(adsDetailsData?.data?.[0]?.attributes);
            setAdId(adsDetailsData?.data?.[0]?.id);
            setCoverName(adsDetailsData?.data?.[0]?.attributes?.featuredImage?.data?.attributes?.url);
            setGalleryName(getUrls(adsDetailsData?.data?.[0]?.attributes?.gallery?.data));
            setIsLoading(false);
         })();
      }
   }, [activeAd, user]);

   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors, isSubmitting }
   } = useForm();

   // default value set
   React.useEffect(() => {
      if (adData) {
         setValue("category", adData?.category?.data?.id);
         setValue("location", adData?.location?.description);
         setValue("condition", adData?.condition);
         setValue("price", adData?.price);
         setValue("negotiable", adData?.negotiable);
         setValue("title", adData?.title);
         setValue("slug", adData?.slug);
         setValue("description", adData?.description);
      }
   }, [adData, setValue]);

   // update ads handler
   const onSubmit = async (data: any) => {
      if (active < formItem.length) {
         setActive(active + 1);
      } else {
         try {
            // upload feature image
            let imageResData = {} as any;
            if (data.photoCover?.length > 0) {
               const formData = new FormData();
               formData.append("files", data.photoCover?.[0]);
               imageResData = (await uploadImageAndSetId(formData, user?.user?.jwtToken as string)) as any;
               if (imageResData?.error) {
                  setIsLoading(false);
                  return toast.error(imageResData?.error || "Server Error");
               }
            }

            // upload gallery image
            let galleryIds = [] as any;
            if (data.photoGallery?.length > 0) {
               const galleryFormData = new FormData();
               for (let key in data.photoGallery) {
                  galleryFormData.append("files", data.photoGallery[key]);
               }
               const galleryResData = (await uploadImageAndSetId(
                  galleryFormData,
                  user?.user?.jwtToken as string
               )) as any;
               galleryIds = galleryResData?.data?.map((item: any) => item?.id);
               if (galleryResData?.error) {
                  setIsLoading(false);
                  return toast.error(galleryResData?.error || "Server Error");
               }
            }

            const newData = _.omit(data, ["photoCover", "photoGallery", "video"]);
            const updatedData = {
               data: {
                  ...newData,
                  featuredImage: imageResData?.data?.[0]?.id,
                  gallery: galleryIds,
                  location:
                     adData?.location?.description !== data?.location
                        ? {
                             lat: data?.location?.geometry?.location?.lat(),
                             lng: data?.location?.geometry?.location?.lng(),
                             description: data?.location?.formatted_address,
                             place_id: data?.location?.place_id
                          }
                        : adData?.location
               }
            };
            const postResData = await updateOne(
               "manage-ads",
               adId,
               updatedData,
               user?.user?.jwtToken as string,
               "/dashboard/ads",
               "page"
            );
            if (!postResData.error) {
               setIsLoading(false);
               toast.success("Ad Updated Successfully");
               router.push("/dashboard/ads");
            } else {
               setIsLoading(false);
               return toast.error("Server Error");
            }
         } catch (error: any) {
            setIsLoading(false);
            toast.error(error?.message || "Server Error");
         }
      }
   };

   return (
      <section className='bg-success-content relative'>
         <div className='container mx-auto w-full pb-44'>
            <h2 className='text-3xl font-bold text-base-content text-center pb-12'>Edit Ads</h2>
            <div className='flex flex-wrap xl:flex-nowrap gap-6 sm:gap-10 lg:justify-center'>
               {formItem.map((item, index) => (
                  <div key={index} className='flex gap-2 sm:gap-4 '>
                     <div className='relative mb-2'>
                        <div
                           className={`w-7 h-7 sm:w-9 sm:h-9 m-auto border rounded-full text-lg flex items-center justify-center ${
                              active >= item.id ? "border-primary text-primary" : "border-accent-content text-base-200"
                           } ${active > item.id ? "bg-primary" : "bg-white"}`}
                        >
                           <p
                              className={`text-sm sm:text-lg ${active > item.id ? "text-accent-content" : ""} ${
                                 active === item.id ? "text-primary" : ""
                              }}`}
                           >
                              {item.id}
                           </p>
                        </div>
                     </div>
                     <div
                        className={`text-sm sm:text-base font-semibold mt-1  ${
                           active >= item.id ? "text-primary" : "text-info-content"
                        }`}
                     >
                        {item.name}
                     </div>
                  </div>
               ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className='bg-white p-5 sm:p-10 mt-12 rounded-xl max-w-4xl mx-auto shadow-boxShadow'>
                  {isLoading && (
                     <div className='absolute top-0 left-0 w-full h-full bg-transparent backdrop-blur-sm z-10 flex items-center justify-center'>
                        <div className='w-10 h-10 border-b-2 border-t-2 border-primary rounded-full animate-spin'></div>
                     </div>
                  )}
                  {
                     (active === 1 && (
                        <BasicInfo
                           register={register}
                           errors={errors}
                           setValue={setValue}
                           adsCategoryData={CategoriesData}
                           adData={adData}
                        />
                     )) ||
                        (active === 2 && (
                           <Gallery
                              register={register}
                              errors={errors}
                              setValue={setValue}
                              coverName={coverName}
                              setCoverName={setCoverName}
                              galleryName={galleryName}
                              setGalleryName={setGalleryName}
                              videoName={videoName}
                              setVideoName={setVideoName}
                           />
                        ))
                     // || (active === 3 && <PersonalInfo register={register} errors={errors} />)
                  }
               </div>
               <div className='flex justify-between max-w-4xl mx-auto mt-12'>
                  <button
                     type='button'
                     className='bg-info-content py-3 px-8 rounded-md text-base font-semibold text-white'
                     disabled={active === 1}
                     onClick={() => setActive(active - 1)}
                  >
                     Prev
                  </button>
                  <button
                     type='submit'
                     className='flex gap-2 bg-primary py-3 px-8 rounded-md text-base font-semibold text-white cursor-pointer'
                     disabled={isSubmitting}
                  >
                     {active <= 1 && "Next"}
                     {active >= 2 && (isSubmitting ? "Please wait" : "Finish")}
                     {/* spinner */}
                     {isSubmitting && (
                        <div className='flex items-center justify-center '>
                           <div className='w-5 h-5 border-b-2 border-white rounded-full animate-spin'></div>
                        </div>
                     )}
                  </button>
               </div>
            </form>
         </div>
      </section>
   );
};
export default EditAds;
