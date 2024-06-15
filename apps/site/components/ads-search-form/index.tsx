"use client";
import { getCookie } from "cookies-next";
import { FiSearch } from "react-icons/fi";

const SearchFilter = ({
   searchQuery,
   setSearchQuery
}: {
   searchQuery: string;
   setSearchQuery: (value: string) => void;
}) => {
   const direction = getCookie("direction");

   return (
      <>
         <div className='flex flex-wrap sm:flex-nowrap items-center gap-3 w-full'>
            <div className='flex items-center relative mx-auto w-full'>
               <input
                  className={`bg-white h-11 px-5 rounded text-sm focus:outline-none w-full ${
                     direction === "rtl" ? " pr-12" : " pl-12"
                  }`}
                  type='text'
                  id='adSearch'
                  placeholder='Search Ads'
                  onChange={(e) => {
                     setSearchQuery(e.target.value);
                  }}
               />
               <label htmlFor='adSearch' className={`absolute ${direction === "rtl" ? "right-0 mr-4" : "left-0 ml-4"}`}>
                  <FiSearch className='text-base-100 h-4 w-4' />
               </label>
            </div>

            {/* <div className="flex items-center bg-white rounded w-full relative pr-1 ">
            <select
              className="h-11 pl-3 rounded-lg text-base text-base-300 focus:outline-none cursor-pointer bg-white appearance-none w-full selectDashboard"
              {...register("category")}
            >
              <option value="">Select a Category</option>

              <option>Category One</option>
              <option>Category Two</option>
              <option>Category Three</option>
            </select>
          </div> */}

            {/* <div className="w-full sm:w-auto">
            <button className="bg-primary py-3 px-5 rounded text-sm font-semibold text-white  w-full sm:w-auto">
              Apply
            </button>
          </div> */}
         </div>
      </>
   );
};

export default SearchFilter;
