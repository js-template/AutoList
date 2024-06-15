import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import Moment from "react-moment";
import MobileAction from "./mobile-action";

const AdsTableSmall = ({
   adsData,
   selectedAds,
   setSelectedAds
}: {
   adsData: any;
   selectedAds: number[];
   setSelectedAds: (value: number[]) => void;
}) => {
   const [state, setState] = useState<boolean>(false);
   // *** select all ads ***
   const [selectAll, setSelectAll] = useState<boolean>(false);

   useEffect(() => {
      if (selectAll) {
         setSelectedAds(adsData.map((item: any) => item?.id));
      } else {
         setSelectedAds([]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectAll]);

   return (
      <div className='grid gap-y-6'>
         {/* FIXME: Mobile select input field  */}
         {/*<div className="w-fit">*/}
         {/*  <label htmlFor="select">*/}
         {/*    <p*/}
         {/*      className={`text-base font-bold border border-primary py-3 px-6 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${*/}
         {/*        selectAll && adsData.length === selectedAds.length*/}
         {/*          ? "bg-primary text-white"*/}
         {/*          : "bg-transparent text-primary"*/}
         {/*      }`}*/}
         {/*      onClick={() => setSelectAll(!selectAll)}*/}
         {/*    >*/}
         {/*      {selectAll && adsData.length === selectedAds.length ? "Deselect All" : "Select All"}*/}
         {/*    </p>*/}
         {/*    <input value="select" id="select" type="checkbox" className="hidden" />*/}
         {/*  </label>*/}
         {/*</div>*/}
         {_.map(adsData, (item, index) => (
            <div
               key={index}
               className={`rounded p-4 shadow-card ${
                  item?.attributes?.status !== "Active" ? "bg-red-100" : "bg-white"
               }`}
            >
               <div className='flex justify-between items-center '>
                  {/* FIXME: Mobile select input field  */}
                  {/*<input*/}
                  {/*  type="checkbox"*/}
                  {/*  className="accent-primary w-4 h-4"*/}
                  {/*  value={item?.id}*/}
                  {/*  name="adsIds"*/}
                  {/*  checked={selectedAds.find((id) => id === item?.id) ? true : false}*/}
                  {/*  onChange={(e) => {*/}
                  {/*    if (item?.id === selectedAds.find((id) => id === item?.id)) {*/}
                  {/*      setSelectedAds(selectedAds.filter((id) => id !== item?.id));*/}
                  {/*    } else {*/}
                  {/*      setSelectedAds([...selectedAds, item?.id]);*/}
                  {/*    }*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <div className='flex items-center gap-3 pt-1'>
                     <p className='text-lg font-bold text-primary'>${item?.attributes?.price}</p>
                     <span className='text-base font-normal text-secondary'>
                        {item?.attributes?.negotiable ? "Negotiable" : "Fixed Price"}
                     </span>
                  </div>

                  <div className='flex items-center gap-8'>
                     {item?.attributes?.featured ? (
                        <BsStarFill className='text-base text-primary' />
                     ) : (
                        <BiStar className='text-base text-neutral' />
                     )}
                     <MobileAction item={item} />
                  </div>
               </div>

               <div className='flex flex-wrap mx-auto gap-5 py-6'>
                  <Link href={item?.attributes?.slug ? `/ads/${item?.attributes?.slug}` : "#"} passHref target='_blank'>
                     <Image
                        src={
                           item?.attributes?.featuredImage?.data?.attributes?.formats?.thumbnail?.url ||
                           "https://via.placeholder.com/80x80"
                        }
                        alt='seller'
                        width={80}
                        height={80}
                        layout='fixed'
                     />
                  </Link>
                  <div className='space-y-2 '>
                     <p className='text-base font-normal text-base-content'>
                        <strong className='text-base-300'>Condition: </strong>
                        {item?.attributes?.condition}
                     </p>
                     <div className='pt-1'>
                        <strong className='text-base-300'>Status: </strong>
                        <span
                           className={`text-sm font-semibold ${
                              item?.attributes?.status === "Active"
                                 ? "text-primary bg-primary-content"
                                 : "text-secondary bg-orange-100"
                           } whitespace-nowrap uppercase py-px px-2 rounded`}
                        >
                           {item?.attributes?.status}
                        </span>
                     </div>
                  </div>
               </div>

               <p className='text-base font-semibold text-neutral 2xl:w-9/12 max-h-36 overflow-hidden hover:text-primary transition duration-300 ease-in-out'>
                  <Link href={item?.attributes?.slug ? `/ads/${item?.attributes?.slug}` : "#"} passHref target='_blank'>
                     {item?.attributes?.title}
                  </Link>
               </p>

               <div className='flex flex-wrap items-center gap-8 py-6'>
                  <p className='bg-secondary py-2 px-5 rounded-lg text-white text-sm'>
                     <Moment format='MMMM DD, YYYY'>{item?.attributes?.createdAt}</Moment>
                  </p>
                  {/* {!item?.status?.isPublished && (
              <p className="bg-warning py-2 px-5 rounded-lg text-base-content text-base">Drafted</p>
            )} */}
               </div>
            </div>
         ))}
      </div>
   );
};

export default AdsTableSmall;
