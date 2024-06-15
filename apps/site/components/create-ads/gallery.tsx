"use client";
import _ from "lodash";
import Image from "next/image";
import React from "react";

const Gallery = ({
   register,
   errors,
   setValue,
   coverName,
   setCoverName,
   galleryName,
   setGalleryName,
   oldGalleryName,
   setOldGalleryName,
   videoName,
   setVideoName
}: any) => {
   const photoGallery = register("photoGallery");
   const photoCover = register("photoCover");
   const video = register("video");
   const [file, setFile] = React.useState(null);

   // photo image upload preview handler
   async function photoPreview(e: any) {
      const file = e.target.files;

      let newArray = [];
      for (let i = 0; i < file.length; i++) {
         const filePreview = URL.createObjectURL(file[i]);
         newArray.push(filePreview);
      }

      setGalleryName([...galleryName, ...newArray]);
   }

   async function coverPreview(event: any) {
      const file = event.target.files[0];

      setFile(file);
      const filePreview = URL.createObjectURL(file);

      setCoverName(filePreview);
   }

   const handleRemoveGalleryPreview = (item: any) => {
      const newData = _.filter(galleryName, (o) => o !== item);
      setGalleryName(newData);

      const oldData = _.filter(oldGalleryName, (o) => o.url !== item);
      setOldGalleryName(oldData);
   };

   // video upload preview handler
   function videoPreview(event: any) {
      const file = event.target.files[0];

      const filePreview = URL.createObjectURL(file);

      setVideoName(filePreview);
   }

   return (
      <div>
         <h2 className='text-xl font-bold text-base-content pb-10'>Gallery</h2>

         <div className='flex flex-wrap sm:flex-nowrap gap-6 w-full'>
            <div className='w-full'>
               <p className='text-sm font-semibold text-base-content uppercase pb-3'>Upload Feature Image</p>
               <label className='flex flex-col border border-dashed border-info-content w-full h-14 rounded-md cursor-pointer'>
                  <p className='text-sm font-normal text-base-200 text-center m-auto'>Choose or Drag and Drop</p>
                  <input
                     type='file'
                     accept='.png, .jpg, .jpeg'
                     className='hidden'
                     {...photoCover}
                     ref={photoCover.ref}
                     onBlur={photoCover.onBlur}
                     coverPreview={coverPreview}
                     onChange={(e) => {
                        photoCover.onChange(e);
                        coverPreview(e);
                     }}
                  />
               </label>

               {/* Cover image */}
               {coverName && (
                  <div className='relative block my-4 rounded-md group w-full h-40 sm:h-52 border border-secondary-content'>
                     <Image
                        src={coverName}
                        objectFit='cover'
                        layout='fill'
                        alt='cover_image'
                        className='object-cover rounded-md object-center'
                        placeholder='blur'
                        blurDataURL={coverName}
                     />
                     <div className='absolute -top-2 -right-2'>
                        <div
                           className='flex items-center justify-center w-6 h-6 -translate-y-5 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 rounded-full bg-error text-white cursor-pointer transition-all duration-300 ease-in-out'
                           onClick={() => {
                              setCoverName(null);
                              setValue("photoCover", "");
                           }}
                        >
                           <svg
                              width='18'
                              height='18'
                              viewBox='0 0 18 18'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 d='M13.5 4.5L4.5 13.5'
                                 stroke='currentColor'
                                 strokeWidth='1.5'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                              />
                              <path
                                 d='M4.5 4.5L13.5 13.5'
                                 stroke='currentColor'
                                 strokeWidth='1.5'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                              />
                           </svg>
                        </div>
                     </div>
                  </div>
               )}
            </div>
            <div className='w-full'>
               <p className='text-sm font-semibold text-base-content uppercase pb-3'>Upload Gallery Image</p>
               <label className='flex flex-col border border-dashed border-info-content w-full h-14 rounded-md cursor-pointer'>
                  <p className='text-sm font-normal text-base-200 text-center m-auto'>Choose or Drag and Drop</p>
                  <input
                     type='file'
                     accept='.png, .jpg, .jpeg'
                     className='hidden'
                     multiple
                     {...photoGallery}
                     ref={photoGallery.ref}
                     onBlur={photoGallery.onBlur}
                     onChange={(e) => {
                        photoGallery.onChange(e);
                        // galleryPreview(e);
                        photoPreview(e);
                     }}
                  />
               </label>
               <p className='text-xs font-normal text-base-content pt-3'>You can select multiple image at once</p>

               {/* Gallery images */}
               <div className='flex flex-wrap gap-3 pt-4'>
                  {galleryName &&
                     galleryName.length > 0 &&
                     galleryName.map((item: any, index: number) => (
                        <div
                           key={index}
                           className='relative inline-block rounded-md group w-16 h-16 sm:w-24 sm:h-24 border border-secondary-content'
                        >
                           <Image
                              src={item}
                              width={100}
                              height={100}
                              alt='gallery_image'
                              className='object-cover rounded-md object-center'
                              placeholder='blur'
                              blurDataURL={item}
                           />
                           <div className='absolute -top-2 -right-2'>
                              <div
                                 className='flex items-center justify-center w-6 h-6 -translate-y-5 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 rounded-full bg-error text-white cursor-pointer transition-all duration-300 ease-in-out'
                                 onClick={() => {
                                    handleRemoveGalleryPreview(item);
                                    // setValue("photoGallery", "");
                                 }}
                              >
                                 <svg
                                    width='18'
                                    height='18'
                                    viewBox='0 0 18 18'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <path
                                       d='M13.5 4.5L4.5 13.5'
                                       stroke='currentColor'
                                       strokeWidth='1.5'
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                    />
                                    <path
                                       d='M4.5 4.5L13.5 13.5'
                                       stroke='currentColor'
                                       strokeWidth='1.5'
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                    />
                                 </svg>
                              </div>
                           </div>
                        </div>
                     ))}
               </div>
            </div>
         </div>

         <div className='w-full sm:w-7/12 md:w-5/12'>
            <p className='text-sm font-semibold text-base-content pb-3'>Upload Video</p>
            <label className='flex flex-col border border-dashed border-info-content w-full h-14 rounded-md  cursor-pointer'>
               <p className='text-sm font-normal text-base-200 text-center m-auto px-2 md:px-0'>
                  Choose or Drag and Drop Your Vide
               </p>
               <input
                  type='file'
                  accept='video/*'
                  className='hidden'
                  {...video}
                  ref={video.ref}
                  onBlur={video.onBlur}
                  // file size max 10485760 = 10MB
                  onChange={(e: any) => {
                     if (e.target.files[0].size > 10485760) {
                        return;
                     }
                     video.onChange(e);
                     videoPreview(e);
                  }}
                  // file format validation
                  pattern='^.+\.(mp4|mov|ogg|webm)$'
               />
            </label>
         </div>

         <div className='pt-4'>
            {videoName && (
               <div className='relative inline-block group'>
                  <video width='320' height='240' controls src={videoName} />

                  <div className='absolute -top-2 -right-2'>
                     <div
                        className='flex items-center justify-center w-6 h-6 translate-y-5 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 rounded-full bg-error text-white cursor-pointer transition-all duration-300 ease-in-out'
                        onClick={() => {
                           setVideoName(null);
                           setValue("video", "");
                        }}
                     >
                        <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                           <path
                              d='M13.5 4.5L4.5 13.5'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                           />
                           <path
                              d='M4.5 4.5L13.5 13.5'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                           />
                        </svg>
                     </div>
                  </div>
               </div>
            )}

            {/* {dataTwo.map((item, index) => (
              <tr key={index}>
                <td className="py-4 pr-4 sm:pr-24">
                  <p className="text-sm font-semibold text-base-content">
                    video-name-here-lorem-ispum-dummy-text.mp4
                  </p>
                </td>
                <td className="py-4 flex items-end justify-end cursor-pointer">
                  <svg
                    className="hover:text-primary"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 4.5L4.5 13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.5 4.5L13.5 13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </td>
              </tr>
            ))} */}
         </div>
      </div>
   );
};

export default Gallery;
