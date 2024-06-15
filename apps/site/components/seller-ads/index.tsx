import Image from "next/image";
import Link from "next/link";
import { MdOutlineLocationOn } from "react-icons/md";

const SellerAds = ({ item }: any) => {
   return (
      <div className='sm:grid grid-cols-3 gap-7 shadow bg-white p-5 rounded-2xl hover:shadow-card transition ease-in-out duration-300'>
         <div className='relative rounded-lg col-span-1 my-auto grid justify-center'>
            <Link href={item?.attributes?.slug ? `/ads/${item?.attributes?.slug}` : "#"} target='_blank'>
               <Image
                  src={item?.attributes?.featuredImage?.data?.attributes?.url || "https://via.placeholder.com/275x220"}
                  width={275}
                  height={220}
                  alt='image'
                  className='rounded-lg w-fit h-full object-center object-cover transition duration-300 ease-in-out'
               />
            </Link>

            {/* <div className="absolute top-3 right-3 bg-primary py-1 px-2 text-white text-sm rounded">Featured</div> */}
         </div>

         <div className='col-span-2'>
            <p className='text-xs font-normal text-base-300 pt-4 sm:pt-0 pb-4'>
               {item?.attributes?.category?.data?.attributes?.title}
            </p>
            <span className='border-b border-secondary-content block mb-3'></span>
            <h4 className='text-lg font-semibold text-neutral h-8 overflow-hidden text-clip transition duration-300 ease-in-out hover:text-primary'>
               <Link href={item?.attributes?.slug ? `/ads/${item?.attributes?.slug}` : "#"} target='_blank'>
                  {item?.attributes?.title}
               </Link>
            </h4>
            <p className='flex items-center text-base-300 text-sm  pb-3'>
               <span className='mr-1.5'>
                  <MdOutlineLocationOn className='text-lg text-info-content' />
               </span>
               {item?.attributes?.location}
            </p>
            <p className='text-sm font-normal text-neutral text-clip overflow-hidden h-10'>
               {item?.attributes?.description}
            </p>
            <span className='border-b border-secondary-content block mb-3 pt-4'></span>
            <div className='flex justify-between items-center'>
               <h5 className='text-primary text-xl font-bold'>
                  <span>$</span>
                  {item?.attributes?.price}
               </h5>

               {/* bookmark  */}
               {/* <button>
            <RiHeartFill className="text-primary text-2xl" />
          </button>
          <button>
            <FiHeart className="text-info-content text-2xl" />
          </button> */}
            </div>
         </div>
      </div>
   );
};

export default SellerAds;
