"use client";
import { IoReturnDownBackOutline } from "react-icons/io5";

const BackBtn = () => {
   return (
      <span
         className='flex items-center space-x-2 m-0 bg-primary hover:scale-105 text-primary-content px-4 py-2 rounded transition duration-150 cursor-pointer'
         title='Return Back'
         onClick={() => window.history.back()}
      >
         <IoReturnDownBackOutline className='w-6 h-6' />
         <span>Return Back</span>
      </span>
   );
};

export default BackBtn;
