"use client";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";

type PaginationProps = {
   totalCount: number;
   showPerPage: number;
   handlePageChange: (data: any) => void;
};

const Pagination = ({ totalCount, showPerPage, handlePageChange }: PaginationProps) => {
   const pages = Math.ceil(totalCount / showPerPage);

   const numberOfPages = [];
   for (let i = 1; i <= pages; i++) {
      numberOfPages.push(i);
   }

   return (
      <div className='pt-16 pb-24 text-center flex gap-1 items-center justify-center'>
         <ReactPaginate
            pageCount={numberOfPages.length}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={(data) => {
               window.scrollTo(0, 250);
               handlePageChange(data);
            }}
            breakLabel={
               <button className='text-base font-normal text-base-300 hover:text-white bg-white shadow py-2 px-4 hover:bg-primary rounded-lg'>
                  ...
               </button>
            }
            previousLabel={
               <button className='text-base font-normal flex justify-center items-center text-base-300 hover:text-white bg-white shadow w-10 h-10 hover:bg-primary rounded-lg'>
                  <GrFormPrevious className='w-5 h-5' />
               </button>
            }
            nextLabel={
               <button className='text-base font-normal flex justify-center items-center text-base-300 hover:text-white bg-white shadow w-10 h-10 hover:bg-primary rounded-lg'>
                  <GrFormNext className='w-5 h-5' />
               </button>
            }
            onPageActive={(data) => {
               window.scrollTo(0, 250);
               handlePageChange(data);
            }}
            containerClassName={`flex flex-row flex-nowrap justify-between md:justify-center items-center`}
            pageLinkClassName={`flex w-10 h-10 mx-1 justify-center items-center text-base font-normal text-base-300 hover:text-white bg-white shadow py-2 px-4 hover:bg-primary rounded-lg`}
            breakLinkClassName={`flex w-10 h-10 mx-1 text-xs justify-center items-center rounded-md bg-white text-deep hover:!bg-primary hover:text-white`}
            activeLinkClassName={`flex w-10 h-10 mx-1 justify-center items-center text-base font-normal text-white !text-white !bg-primary shadow py-2 px-4 hover:bg-primary rounded-lg`}
         />
      </div>
   );
};

export default Pagination;
