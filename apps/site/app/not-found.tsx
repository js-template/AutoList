import BackBtn from "@/components/back-btn";
import { Metadata } from "next";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export const metadata: Metadata = {
   title: "Page Not Found | AutoLister",
   description: "Page Not Found for AutoLister"
};

const NotFound = () => {
   return (
      <div className='container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center'>
         <div className='bg-white border max-w-2xl w-full mx-auto border-gray flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl'>
            <p className='text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-themeDark'>404</p>
            <p className='text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-themeDark mt-4'>
               Page Not Found
            </p>
            <p className='text-themeDarkAlt mt-4 pb-4 border-b-2 border-gray text-center'>
               Sorry, the page you are looking for could not be found.
            </p>
            <div className='flex flex-wrap mt-6 gap-5 md:gap-8 justify-center items-center'>
               <Link
                  href='/'
                  className='flex items-center space-x-2 bg-primary hover:scale-105 text-primary-content px-4 py-2 rounded transition duration-150'
                  title='Return Home'
               >
                  <FaHome className='w-5 h-5' />
                  <span>Return Home</span>
               </Link>
               <BackBtn />
            </div>
         </div>
      </div>
   );
};

export default NotFound;
