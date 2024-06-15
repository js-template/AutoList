"use client";
import BasicInfo from "@/components/create-ads/basic-info";
import Gallery from "@/components/create-ads/gallery";
import { postAds, uploadImageAndSetId } from "@/lib/fetch.data";
import { createSlug } from "@/utils/common";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
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

const AddNewAds = ({ CategoriesData }: { CategoriesData: any }) => {
   // *** get user session ***
   const { data: userData } = useSession();
   const router = useRouter();

   const [active, setActive] = React.useState(1);
   const [coverName, setCoverName] = React.useState(null);
   const [galleryName, setGalleryName] = React.useState([]);
   const [videoName, setVideoName] = React.useState(null);
   const [isLoading, setIsLoading] = React.useState(false);

   const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors, isSubmitting }
   } = useForm({
      mode: "onChange"
   });

   // post ads handler
   const AdsForm = async (data: any) => {
      if (!userData?.user?.membership) {
         router.replace("/dashboard/membership");

         return;
      }
      if (active < formItem.length) {
         setActive(active + 1);
      } else {
         setIsLoading(true);
         try {
            // upload feature image
            let imageResData = {} as any;
            if (data.photoCover?.length > 0) {
               const formData = new FormData();
               formData.append("files", data.photoCover?.[0]);
               imageResData = (await uploadImageAndSetId(formData, userData?.user?.jwtToken as string)) as any;
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
                  userData?.user?.jwtToken as string
               )) as any;
               galleryIds = galleryResData?.data?.map((item: any) => item?.id);
               if (galleryResData?.error) {
                  setIsLoading(false);
                  return toast.error(galleryResData?.error || "Server Error");
               }
            }

            // post ads
            const slug = createSlug(data?.title);
            const newData = _.omit(data, ["photoCover", "photoGallery", "video"]);
            const postData = {
               ...newData,
               seller: userData?.user?.id,
               location: {
                  lat: data?.location?.geometry?.location?.lat(),
                  lng: data?.location?.geometry?.location?.lng(),
                  description: data?.location?.formatted_address,
                  place_id: data?.location?.place_id
               },
               slug,
               featuredImage: imageResData?.data?.[0]?.id,
               gallery: galleryIds
            };
            const postResData = await postAds(postData, userData?.user?.jwtToken as string, "/dashboard/ads", "page");
            if (!postResData.error) {
               setIsLoading(false);
               toast.success("Ad created Successfully");
               router.push("/dashboard/ads");
            } else {
               setIsLoading(false);
               if (postResData.error === "Forbidden")
                  return toast.error("You are not allowed to create ads. Please upgrade your package");
               toast.error("Server Error");
               return;
            }
         } catch (error: any) {
            setIsLoading(false);
            toast.error(error?.message || "Server Error");
         }
         setIsLoading(false);
      }
   };

   return (
      <section className='bg-success-content'>
         <div className='container mx-auto w-full pb-44'>
            <h2 className='text-3xl font-bold text-base-content text-center pb-12'>Add New Ads</h2>
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
            <form onSubmit={handleSubmit(AdsForm)}>
               <div className='bg-white p-5 sm:p-10 mt-12 rounded-xl max-w-4xl mx-auto shadow-boxShadow'>
                  {
                     (active === 1 && (
                        <BasicInfo
                           register={register}
                           errors={errors}
                           setValue={setValue}
                           adsCategoryData={CategoriesData}
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
                     // ||
                     // (active === 3 && <PersonalInfo register={register} errors={errors} />)
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
                     disabled={isLoading}
                  >
                     {active <= 1 && "Next"}
                     {active >= 2 && (isLoading ? "Please wait" : "Finish")}
                     {/* spinner */}
                     {isLoading && (
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
export default AddNewAds;
