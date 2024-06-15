"use client";
import { useEffect } from "react";
import { TbReload } from "react-icons/tb";

// Google Fonts
import { Inter } from "next/font/google";
// Global CSS
import "./globals.css";

// Inter font
const inter = Inter({
   subsets: ["latin"],
   display: "swap",
   variable: "--font-inter"
});

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
   useEffect(() => {
      // Log the error to an error reporting service
      console.error(error);
   }, [error]);
   return (
      <html lang='en' className={inter.variable}>
         <body>
            <div className='container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center'>
               <div className='bg-white border max-w-2xl w-full mx-auto border-error/50 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl'>
                  <p className='text-4xl md:text-6xl text-center font-bold tracking-wider text-error'>Error</p>
                  <p className='text-xl md:text-3xl text-center font-bold tracking-wider text-error mt-4'>
                     Something went wrong
                  </p>
                  <p className='text-themeDarkAlt mt-4 pb-4 border-b-2 border-gray text-center'>
                     Sorry, something went wrong. Please try again later.
                  </p>
                  <div className='flex flex-wrap mt-6 gap-5 md:gap-8 justify-center items-center'>
                     <button
                        className='flex items-center space-x-2 bg-primary hover:scale-105 text-primary-content px-4 py-2 rounded transition duration-150'
                        title='try again'
                        onClick={
                           // Attempt to recover by trying to re-render the segment
                           () => reset()
                        }
                     >
                        <TbReload className='w-5 h-5' />
                        <span>Try Again</span>
                     </button>
                  </div>
               </div>
            </div>
         </body>
      </html>
   );
}
