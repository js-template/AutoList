import ImageOpt from "@/optimize/image";
import _ from "lodash";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi";
import Moment from "react-moment";
import TableColAction from "./action";

const AdsTable = ({
   adsData,
   selectedAds,
   setSelectedAds,
   sort,
   setSort
}: {
   adsData: any;
   selectedAds: number[];
   setSelectedAds: (value: number[]) => void;
   sort: "asc" | "desc";
   setSort: (value: "asc" | "desc") => void;
}) => {
   const [loading, setLoading] = useState(false);
   // *** select all input ref ***
   const selectAllRef = useRef<HTMLInputElement>(null);
   // *** select all ads ***
   const [selectAll, setSelectAll] = useState(false);

   useEffect(() => {
      if (selectAll) {
         setSelectedAds(adsData.map((item: any) => item?.id));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectAll]);

   return (
      <div className='py-2 inline-block overflow-x-auto'>
         <table className='w-full'>
            <thead>
               <tr className='bg-white border-b-8 border-success-content '>
                  {/* FIXME: Select all input field  */}
                  {/*<th scope="col" className="text-sm font-semibold px-6 py-4 text-left rounded-lg ">*/}
                  {/*  <input*/}
                  {/*    ref={selectAllRef}*/}
                  {/*    type="checkbox"*/}
                  {/*    name="selectAll"*/}
                  {/*    className="accent-primary w-4 h-4"*/}
                  {/*    checked={selectAll && adsData.length === selectedAds.length}*/}
                  {/*    onChange={(e) => {*/}
                  {/*      if (e.target.checked) {*/}
                  {/*        setSelectAll(true);*/}
                  {/*      } else {*/}
                  {/*        setSelectAll(false);*/}
                  {/*        setSelectedAds([]);*/}
                  {/*      }*/}
                  {/*    }}*/}
                  {/*  />*/}
                  {/*</th>*/}
                  <th scope='col' className='px-6 py-4 text-left'>
                     <div
                        className='flex items-center gap-3'
                        // onClick={titleSortHandler}
                     >
                        <span className='text-base font-semibold text-neutral '>Ads Title</span>
                        <div
                           className='flex relative cursor-pointer'
                           onClick={() => {
                              setSort(sort === "asc" ? "desc" : "asc");
                           }}
                        >
                           <HiOutlineArrowNarrowDown className='text-primary' />
                           <HiOutlineArrowNarrowUp className='text-primary left-2 absolute' />
                        </div>
                     </div>
                  </th>
                  <th scope='col' className='text-base font-semibold text-neutral px-6 py-4 text-left'>
                     <div className='flex items-center gap-3'>
                        <span className='text-base font-semibold text-neutral'>Condition</span>
                        <div
                           className='flex relative cursor-pointer'
                           onClick={() => {
                              setSort(sort === "asc" ? "desc" : "asc");
                           }}
                        >
                           <HiOutlineArrowNarrowDown className='text-primary' />
                           <HiOutlineArrowNarrowUp className='text-primary  left-2 absolute' />
                        </div>
                     </div>
                  </th>
                  <th scope='col' className='text-base font-semibold text-neutral px-6 py-4 text-left'>
                     <div className='flex items-center gap-3'>
                        <span className='text-base font-semibold text-neutral'>Status</span>
                        <div
                           className='flex relative cursor-pointer'
                           onClick={() => {
                              setSort(sort === "asc" ? "desc" : "asc");
                           }}
                        >
                           <HiOutlineArrowNarrowDown className='text-primary' />
                           <HiOutlineArrowNarrowUp className='text-primary left-2 absolute' />
                        </div>
                     </div>
                  </th>

                  <th scope='col' className='text-base font-semibold text-neutral py-2 text-center cursor-pointer'>
                     <div className='flex items-center justify-center gap-3'>
                        <span className='text-base font-semibold text-neutral'>Boosted</span>
                        <div
                           className='flex relative cursor-pointer'
                           onClick={() => {
                              setSort(sort === "asc" ? "desc" : "asc");
                           }}
                        >
                           <HiOutlineArrowNarrowDown className='text-primary' />
                           <HiOutlineArrowNarrowUp className='text-primary left-2 absolute' />
                        </div>
                     </div>
                  </th>
                  <th scope='col' className='text-base font-semibold text-neutral px-6 py-4 text-left'>
                     <div className='flex items-center gap-3'>
                        <span className='text-base font-semibold text-neutral'>Date Posted</span>
                        <div
                           className='flex relative cursor-pointer'
                           onClick={() => {
                              setSort(sort === "asc" ? "desc" : "asc");
                           }}
                        >
                           <HiOutlineArrowNarrowDown className='text-primary' />
                           <HiOutlineArrowNarrowUp className='text-primary left-2 absolute' />
                        </div>
                     </div>
                  </th>
                  <th scope='col' className='text-base font-semibold text-neutral px-6 py-4 text-left rounded-lg'>
                     Action
                  </th>
               </tr>
            </thead>
            <tbody className={` ${true && "relative"} `}>
               {loading && (
                  <div className='absolute top-0 left-0 w-full h-full bg-transparent backdrop-blur-sm z-10 flex items-center justify-center'>
                     <div className='w-10 h-10 border-b-2 border-t-2 border-primary rounded-full animate-spin'></div>
                  </div>
               )}
               {adsData &&
                  _.map(adsData, (item, index: number) => (
                     <tr key={index} className='mb-3 border-b-8 border-success-content bg-white '>
                        {/* FIXME: Select input field  */}
                        {/*<td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-neutral rounded-lg align-top xl:align-middle ">*/}
                        {/*  <input*/}
                        {/*    type="checkbox"*/}
                        {/*    className="accent-primary w-4 h-4"*/}
                        {/*    value={item?.id}*/}
                        {/*    name="adsIds"*/}
                        {/*    checked={selectedAds.find((id) => id === item?.id) ? true : false}*/}
                        {/*    onChange={(e) => {*/}
                        {/*      if (item?.id === selectedAds.find((id) => id === item?.id)) {*/}
                        {/*        setSelectedAds(selectedAds.filter((id) => id !== item?.id));*/}
                        {/*        setSelectAll(false);*/}
                        {/*      } else {*/}
                        {/*        setSelectedAds([...selectedAds, item?.id]);*/}
                        {/*      }*/}
                        {/*    }}*/}
                        {/*  />*/}
                        {/*</td>*/}
                        <td className=' px-6 py-4  w-4/12 '>
                           <div className='flex gap-5'>
                              <Link
                                 href={item?.attributes?.slug ? `/ads/${item?.attributes?.slug}` : "#"}
                                 passHref
                                 target='_blank'
                              >
                                 <ImageOpt
                                    src={
                                       item?.attributes?.featuredImage?.data?.attributes?.formats?.thumbnail?.url ||
                                       "https://via.placeholder.com/60x60"
                                    }
                                    alt='product image'
                                    width={60}
                                    height={60}
                                    layout='fixed'
                                    className={undefined}
                                    noPlaceholder={true}
                                 />
                              </Link>
                              <div>
                                 <p className='text-base font-semibold text-neutral 2xl:w-9/12 max-h-7 overflow-hidden hover:text-primary transition duration-300 ease-in-out'>
                                    <Link
                                       href={item?.attributes?.slug ? `/ads/${item?.attributes?.slug}` : "#"}
                                       passHref
                                       target='_blank'
                                    >
                                       {item?.attributes?.title}
                                    </Link>
                                 </p>
                                 <div className='flex items-center gap-3 pt-1'>
                                    <p className='text-xl font-bold text-primary'>${item?.attributes?.price}</p>
                                    <span className='text-sm font-normal text-secondary mt-1'>
                                       {item?.attributes?.negotiable ? "Negotiable" : "Fixed Price"}
                                    </span>
                                    {/* {item?.adsReport && item?.adsReport?.length > 0 && (
                          <Link href="#" passHref>
                            <span className="text-sm text-white font-bold bg-red-500 px-2 py-1 rounded">
                              Reported
                            </span>
                          </Link>
                        )} */}
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className='text-base font-normal text-base-content px-6 py-4 whitespace-nowrap'>
                           {item?.attributes?.condition}
                        </td>
                        <td className='px-6 py-4 '>
                           <span
                              className={`text-sm font-semibold ${
                                 item?.attributes?.status === "Active"
                                    ? "text-primary bg-primary-content"
                                    : "text-secondary bg-orange-100"
                              } whitespace-nowrap py-px px-2 rounded`}
                           >
                              {item?.attributes?.status}
                           </span>
                        </td>
                        <td className='text-sm font-normal text-neutral p-2 whitespace-nowrap text-center'>
                           {/* <BiStar className='text-base text-neutral mx-auto' /> */}
                           {item?.attributes?.adBoost ? (
                              <BsStarFill className='text-lg text-primary mx-auto' />
                           ) : (
                              <BsStar className='text-lg text-neutral mx-auto' />
                           )}
                        </td>
                        <td className='text-base text-base-content font-normal px-6 py-4 whitespace-nowrap'>
                           <Moment format='MMMM DD, YYYY'>
                              {item?.attributes?.publishedAt || item?.attributes?.createdAt}
                           </Moment>
                        </td>
                        <TableColAction
                           item={item}
                           setLoading={setLoading}
                           index={index}
                           adsData={adsData}
                           lastItem={adsData.length - 1 === index ? true : false}
                        />
                     </tr>
                  ))}
            </tbody>
         </table>
      </div>
   );
};

export default AdsTable;
