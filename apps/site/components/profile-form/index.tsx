import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ProfileForm = () => {
   const [photoImage, setPhotoImage] = useState<string | null>(null);

   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors, isSubmitting, isSubmitted, isDirty }
   } = useForm({
      mode: "onBlur"
   });

   // NOTE: This is just a sample onSubmit handler. You can use your own.
   const onSubmit = async (data: any) => {
      console.log(data);
      reset();
   };

   const ImageFile = register("profileImage");

   // photo image upload preview handler
   function photoPreview(e: any) {
      const file = e.target.files[0];
      const filePreview = URL.createObjectURL(file);
      setPhotoImage(filePreview);
   }

   const imageUrl = photoImage
      ? photoImage
      : `https://ui-avatars.com/api/?name=${"Testing"}&background=random&length=1&size=50`;

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='grid grid-cols-7 '>
            {/* profileImage  */}
            <div className='col-span-7 xl:col-span-2 2xl:border-r-2  text-center pb-12 xl:pb-0'>
               <div className='relative inline-block'>
                  <label htmlFor='image'>
                     <Image
                        src={imageUrl}
                        // src={"/photo.png"}
                        width={200}
                        height={200}
                        layout='fixed'
                        className='inline-block object-cover w-12 h-12 rounded-full'
                        alt='user'
                     />
                     <span className='absolute bottom-3 -right-4 inline-block w-9 h-9 rounded-full mr-6'>
                        <input
                           className='hidden'
                           id='image'
                           accept='image/*'
                           {...ImageFile}
                           // defaultValue={photoImage}
                           // ref={ImageFile.ref}
                           onBlur={ImageFile.onBlur}
                           onChange={(event) => {
                              ImageFile.onChange(event);
                              photoPreview(event);
                           }}
                           type='file'
                        />
                        <svg
                           className='inline-block text-primary object-cover rounded-full'
                           width='44'
                           height='44'
                           viewBox='0 0 44 44'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <circle cx='22' cy='22' r='20' fill='currentColor' stroke='white' strokeWidth='4' />
                           <path
                              d='M24.5 18.666H24.5083'
                              stroke='white'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                           />
                           <path
                              d='M26.1673 15.334H17.834C16.4533 15.334 15.334 16.4533 15.334 17.834V26.1673C15.334 27.548 16.4533 28.6673 17.834 28.6673H26.1673C27.548 28.6673 28.6673 27.548 28.6673 26.1673V17.834C28.6673 16.4533 27.548 15.334 26.1673 15.334Z'
                              stroke='white'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                           />
                           <path
                              d='M15.334 24.5009L18.6673 21.1676C19.0474 20.8019 19.4785 20.6094 19.9173 20.6094C20.3562 20.6094 20.7873 20.8019 21.1673 21.1676L25.334 25.3343'
                              stroke='white'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                           />
                           <path
                              d='M23.666 23.667L24.4993 22.8336C24.8794 22.4679 25.3105 22.2754 25.7493 22.2754C26.1882 22.2754 26.6193 22.4679 26.9993 22.8336L28.666 24.5003'
                              stroke='white'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                           />
                        </svg>
                     </span>
                  </label>
               </div>
               <div className='lg:mx-auto lg:w-9/12 mt-6'>
                  <p className='text-sm font-normal text-base-200'>
                     Allowed .jpeg, .jpg, .png, .gif max size of 3.1 MB
                  </p>
               </div>
            </div>

            <div className='col-span-7 xl:col-span-5 xl:ml-10'>
               <div>
                  {/* firstName, lastName  */}
                  <div className='flex flex-wrap sm:flex-nowrap gap-6'>
                     <label className='w-full' htmlFor=''>
                        <p className='text-sm font-semibold text-base-200 pb-2'>First Name</p>
                        <input
                           type='text'
                           className='focus:outline-none p-3 border border-accent-content rounded-md w-full placeholder:text-neutral'
                           placeholder='Jones'
                           {...register("firstName", {
                              required: true
                           })}
                        />
                        {errors.firstName && (
                           <span className='text-red-400 text-sm italic'>This field is required</span>
                        )}
                     </label>

                     <label className='w-full' htmlFor=''>
                        <p className='text-sm font-semibold text-base-200 pb-2'>Last Name</p>
                        <input
                           type='text'
                           className='focus:outline-none p-3 border border-accent-content rounded-md w-full placeholder:text-neutral'
                           placeholder='Ferdinand'
                           {...register("lastName", {
                              required: true
                           })}
                        />
                        {errors.lastName && <span className='text-red-400 text-sm italic'>This field is required</span>}
                     </label>
                  </div>

                  {/* email, phoneNumber  */}
                  <div className='flex flex-wrap sm:flex-nowrap gap-6 pt-6'>
                     <label className='w-full' htmlFor=''>
                        <p className='text-sm font-semibold text-base-200 pb-2'>Email</p>
                        <input
                           type='email'
                           readOnly
                           className='focus:outline-none p-3 cursor-not-allowed border border-accent-content rounded-md w-full placeholder:text-neutral'
                           disabled
                           // defaultValue={userData.email}
                           placeholder='example@mail.com'
                           // {...register('email', { required: true })}
                        />
                     </label>
                     <label className='w-full' htmlFor=''>
                        <p className='text-sm font-semibold text-base-200 pb-2'>Phone</p>
                        <input
                           type='text'
                           className='focus:outline-none p-3 border border-accent-content rounded-md w-full placeholder:text-neutral'
                           placeholder='603 555 0123'
                           {...register("phoneNumber")}
                        />
                        {errors.phoneNumber && (
                           <span className='text-red-400 text-sm italic'>This field is required</span>
                        )}
                     </label>
                  </div>

                  {/* sellerType */}
                  <div className='w-10/12 sm:w-6/12 pt-6'>
                     <p className='text-sm font-semibold text-base-200 pb-2'>I am</p>
                     <div className='flex items-center py-3  border border-accent-content rounded w-full relative'>
                        <select
                           className='rounded-lg text-base text-neutral focus:outline-none cursor-pointer bg-white appearance-none w-full selectDashboard pl-3'
                           {...register("sellerType", {
                              required: true
                           })}
                        >
                           <option value='Individual'>Individual</option>
                           <option value='Agency'>Agency</option>
                        </select>
                     </div>
                  </div>

                  {/* state, city  */}
                  <div className='pt-10'>
                     <p className='text-base font-semibold text-base-content pb-4'>Location</p>
                     <div className='flex flex-wrap sm:flex-nowrap gap-6'>
                        <label className='w-full' htmlFor=''>
                           <p className='text-sm font-semibold text-base-200 pb-2'>State</p>
                           <input
                              type='text'
                              className='focus:outline-none p-3 border border-accent-content rounded-md w-full placeholder:text-neutral'
                              placeholder='state'
                              {...register("state", {
                                 required: true
                              })}
                           />
                           {errors.state && <span className='text-red-400 text-sm italic'>This field is required</span>}
                        </label>

                        <label className='w-full' htmlFor=''>
                           <p className='text-sm font-semibold text-base-200 pb-2'>City</p>
                           <input
                              type='text'
                              className='focus:outline-none p-3 border border-accent-content rounded-md w-full placeholder:text-neutral'
                              placeholder='city'
                              {...register("city", {
                                 required: true
                              })}
                           />
                           {errors.city && <span className='text-red-400 text-sm italic'>This field is required</span>}
                        </label>
                     </div>
                  </div>

                  {/* street, zipCode  */}
                  <div className='flex flex-wrap sm:flex-nowrap gap-6 pt-6'>
                     <label className='w-full sm:w-9/12' htmlFor=''>
                        <p className='text-sm font-semibold text-base-200 pb-2'>Street</p>
                        <input
                           type='text'
                           className='focus:outline-none p-3 border border-accent-content rounded-md w-full placeholder:text-neutral'
                           placeholder='street'
                           {...register("street", {
                              required: true
                           })}
                        />
                        {errors.street && <span className='text-red-400 text-sm italic'>This field is required</span>}
                     </label>
                     <label className='w-8/12 sm:w-3/12' htmlFor=''>
                        <p className='text-sm font-semibold text-base-200 pb-2'>Zip Code</p>
                        <input
                           type='text'
                           className='focus:outline-none p-3 border border-accent-content rounded-md w-full placeholder:text-neutral'
                           placeholder='Zip'
                           {...register("zipCode", {
                              required: true
                           })}
                        />
                     </label>
                  </div>

                  {/* userName  */}
                  <div className='flex flex-wrap sm:flex-nowrap gap-6 pt-6'>
                     <label className='w-half' htmlFor=''>
                        <p className='text-sm font-semibold text-base-200 pb-2'>User Name</p>
                        <input
                           type='text'
                           readOnly
                           className='focus:outline-none cursor-not-allowed p-3 border border-accent-content rounded-md w-full placeholder:text-neutral'
                           // defaultValue={userData.userName}
                           disabled
                           placeholder='Jones'
                        />
                     </label>
                  </div>

                  <button
                     disabled={!isDirty || isSubmitting}
                     type='submit'
                     className={`flex bg-primary py-3 px-6 rounded-md text-white mt-12 mb-2 ${
                        isDirty ? "opacity-100" : "opacity-30"
                     }`}
                  >
                     {isSubmitting ? "Please wait..." : "Save Changes"}
                     {/* spinner */}
                     {isSubmitting && (
                        <div className='ml-2 flex items-center justify-center '>
                           <div className='w-5 h-5 border-b-2 border-white rounded-full animate-spin'></div>
                        </div>
                     )}
                  </button>
               </div>
            </div>
         </div>
      </form>
   );
};

export default ProfileForm;
