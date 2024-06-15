import { getCookie } from "cookies-next";
import Autocomplete from "react-google-autocomplete";

const BasicInfo = ({ register, errors, setValue, adsCategoryData, adData }: any) => {
   const direction = getCookie("direction");

   return (
      <div>
         <h3 className='text-lg font-bold text-base-content'>Ads Details</h3>

         <div className='flex flex-wrap sm:flex-nowrap gap-6 pt-10'>
            <div className='w-full'>
               <p className='text-sm font-semibold text-base-200 pb-2'>Category</p>
               <div
                  className={`flex items-center  border rounded w-full relative ${
                     errors?.category ? "border-error" : "border-accent-content"
                  }`}
               >
                  <select
                     name='category'
                     className={`${
                        direction === "rtl" ? "pr-3 selectDashboardRtl" : "pl-3 selectDashboard"
                     } py-3 rounded-lg text-base text-neutral focus:outline-none cursor-pointer bg-white appearance-none w-full `}
                     {...register("category", {
                        required: "Category is required"
                     })}
                  >
                     <option value=''>Select Category</option>
                     {adsCategoryData?.map((category: any, index: number) => (
                        <option key={index} value={category?.id}>
                           {category?.attributes?.title}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
            <div className='w-full'>
               <p className='text-sm font-semibold text-base-200 pb-2'>Location</p>

               <Autocomplete
                  className={`focus:outline-none p-3 border border-accent-content placeholder:text-info-content rounded-md w-full ${
                     errors?.place && "border-error"
                  }`}
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                  onPlaceSelected={(location: any) => {
                     setValue("location", location);
                  }}
                  {...register("location", {
                     required: "Location is required"
                  })}
                  defaultValue={adData?.location?.description ? adData?.location?.description : ""}
               />
            </div>
         </div>
         <div className='flex flex-wrap sm:flex-nowrap gap-6 pt-10'>
            <div className='w-full'>
               <p className='text-sm font-semibold text-base-200 pb-2'>Condition</p>
               <div
                  className={`flex items-center  border rounded w-full relative ${
                     errors?.condition ? "border-error" : "border-accent-content"
                  }`}
               >
                  <select
                     name='condition'
                     className={`${
                        direction === "rtl" ? "pr-3 selectDashboardRtl" : "pl-3 selectDashboard"
                     } py-3 rounded-lg text-base text-neutral focus:outline-none cursor-pointer bg-white appearance-none w-full`}
                     {...register("condition", {
                        required: "Condition is required"
                     })}
                  >
                     <option value=''>Select Condition</option>
                     <option value='New'>New</option>
                     <option value='Used'>Used</option>
                  </select>
               </div>
            </div>
            <div className='w-full'>
               <label className='w-full sm:w-9/12' htmlFor=''>
                  <p className='text-sm font-semibold text-base-200 pb-2'>Price</p>
                  <input
                     type='text'
                     className={`focus:outline-none p-3 border border-accent-content placeholder:text-info-content rounded-md w-full ${
                        errors?.price && "border-error"
                     }`}
                     placeholder='$200'
                     {...register("price", {
                        required: "Ads Price is required"
                     })}
                  />
               </label>
            </div>
            <div className='w-full'>
               <p className='text-sm font-semibold text-base-200 pb-2'>Negotiable</p>
               <div
                  className={`flex items-center  border rounded w-full relative ${
                     errors?.negotiable ? "border-error" : "border-accent-content"
                  }`}
               >
                  <select
                     name='negotiable'
                     className={`${
                        direction === "rtl" ? "pr-3 selectDashboardRtl" : "pl-3 selectDashboard"
                     } py-3 rounded-lg text-base text-neutral focus:outline-none cursor-pointer bg-white appearance-none w-full`}
                     {...register("negotiable", {
                        required: "Negotiable is required"
                     })}
                  >
                     <option value='true'>Negotiable</option>
                     <option value='false'>Non-negotiable</option>
                  </select>
               </div>
            </div>
         </div>

         <div className='pt-6'>
            <label className='w-full sm:w-9/12' htmlFor=''>
               <p className='text-sm font-semibold text-base-200 pb-2'>Ads Title</p>
               <input
                  type='text'
                  className={`focus:outline-none p-3 border border-accent-content placeholder:text-info-content rounded-md w-full ${
                     errors?.title && "border-error"
                  }`}
                  placeholder='Simple and Awesome ads title here'
                  {...register("title", {
                     required: "Ads title is required"
                  })}
               />
            </label>
         </div>

         <div className='pt-6'>
            <label className='w-full sm:w-9/12' htmlFor=''>
               <p className='text-sm font-semibold text-base-200 pb-2'>Description</p>
               <textarea
                  className={`w-full focus:outline-none p-3 h-40 sm:h-32 border border-accent-content rounded-md placeholder:text-info-content ${
                     errors.description && "border-error"
                  }`}
                  name=''
                  placeholder='Markdown supported'
                  {...register("description", {
                     required: "Description is required"
                  })}
               />
            </label>
         </div>
      </div>
   );
};

export default BasicInfo;
