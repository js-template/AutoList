"use client";
// TODO : INCOMPLETE COMPONENT

import IconComponent from "@/components/icon/react.icon";
import { useGlobalContext } from "@/context/store";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ FooterOneData, FooterTwoData, FooterThreeData }: any) => {
   const { direction } = useGlobalContext();
   // dynamic full year
   const fullYear = new Date().getFullYear();

   const Logo = _.get(FooterOneData, "logo.data.attributes.url", null) as string;

   return (
      <footer className='bg-base-content'>
         {/* <div className="container mx-auto px-5 sm:px-0">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between pb-14">
          <h2 className="font-bold text-2xl sm:text-4xl text-white text-center pb-5 lg:pb-0">
            Subscribe Our Newsletter
          </h2>

          <div className="relative left-0 right-0">
            <form
            // onSubmit={handleSubmit(subscriptionSubmit)}
            >
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full sm:w-[580px] h-12 sm:h-16 rounded-xl pl-7 outline-none px-36 sm:px-6"
                {...register("subscriptionEmail", { required: true })}
              />

              <div className="absolute top-1 sm:top-2 right-2">
                <button
                  type="submit"
                  className="bg-secondary h-10 sm:h-12 px-2 sm:px-6 text-white rounded-md font-semibold text-sm sm:text-base"
                >
                  Subscribe Now
                </button>
              </div>
            </form>
            {errors.subscriptionEmail && (
              <span className="text-white text-sm italic">
                This field is required
              </span>
            )}
          </div>
        </div>
      </div> */}
         <div className='border-b border-error-content/10'></div>
         <div className='container mx-auto px-5 sm:px-0'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
               <div
                  className={` ${
                     direction === "rtl" ? "lg:border-l" : "lg:border-r"
                  }  border-error-content/10 pt-16 md:py-16`}
               >
                  {Logo && <Image src={Logo} alt='logo' width={180} height={45} className='mb-5' />}
                  <p className='text-lg text-base-300 mb-5'>{FooterOneData?.description}</p>
                  <ul className='flex items-center space-x-3'>
                     {FooterOneData?.socialLink?.map((item: any, index: number) => (
                        <li key={index}>
                           <Link
                              href={item.link || "#"}
                              className='text-white rounded-full transition duration-300 ease-in-out hover:bg-secondary'
                           >
                              <IconComponent size={30} icon={item?.icon} />
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
               <div
                  className={`${direction === "rtl" ? "lg:border-l" : "lg:border-r"}  border-error-content/10 md:pt-16`}
               >
                  <h4 className='text-2xl text-white font-bold mb-5'>{FooterTwoData?.title}</h4>
                  <div className='flex space-x-10'>
                     <ul>
                        {FooterTwoData?.FooterMenu?.map((item: any, index: number) => (
                           <li key={index}>
                              <Link href={item?.link || "#"}>
                                 <p className='text-accent-content block mb-4 transition duration-300 ease-in-out hover:text-primary'>
                                    {item?.label}
                                 </p>
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>

               <div className='pb-16 lg:py-16'>
                  <h4 className='text-2xl text-white font-bold mb-5'>{FooterThreeData?.title}</h4>
                  <ul>
                     {FooterThreeData?.FooterMenu?.map((item: any, index: number) => (
                        <li key={index}>
                           <Link href={item?.link || "#"}>
                              <p className='text-accent-content block mb-4 transition duration-300 ease-in-out hover:text-primary'>
                                 {item?.label}
                              </p>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
         <div className='border-b border-error-content/10'></div>
         <div className='text-center text-white mt-6 pb-6 px-5 sm:px-0'>
            <p>
               © {fullYear} - <span className='font-bold'>Brand Name</span>. All Right Reserved
            </p>
         </div>
      </footer>
   );
};

export default Footer;
