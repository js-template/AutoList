"use client";
import ImageOpt from "@/optimize/image";
import { useEffect, useState } from "react";

export const ImageGallery = ({ gallery }: any) => {
   const [galleryPreview, setGalleryPreview] = useState(`/avatar.png`);

   useEffect(() => {
      // Check if the gallery has images
      if (gallery && gallery.length > 0) {
         // Set the first image in the gallery as the initial preview
         setGalleryPreview(gallery[0]?.attributes?.formats?.thumbnail?.url);
      }
   }, [gallery]);

   const handleImageClick = (image: any) => {
      // Set the clicked image as the preview
      setGalleryPreview(image.attributes.formats.thumbnail.url);
   };

   return (
      <>
         <div className='grid gap-7 bg-white p-6 w-full rounded-2xl'>
            <div className='w-full'>
               <ImageOpt
                  className='rounded'
                  src={galleryPreview}
                  width={1000}
                  height={640}
                  alt='gallery'
                  layout={undefined}
                  noPlaceholder={true}
               />
            </div>
            <div className='flex flex-wrap gap-4'>
               {gallery?.map((image: any, index: any) => (
                  <span
                     key={index}
                     onClick={() => {
                        handleImageClick(image);
                     }}
                  >
                     <ImageOpt
                        className='rounded cursor-pointer'
                        src={image?.attributes?.formats?.thumbnail?.url || `/avatar.png`}
                        width={100}
                        height={100}
                        alt='gallery'
                        layout={undefined}
                        noPlaceholder={true}
                     />
                  </span>
               ))}
            </div>
         </div>
      </>
   );
};
