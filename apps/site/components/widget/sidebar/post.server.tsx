"use Server";
import ImageOpt from "@/optimize/image";
import { cookies } from "next/headers";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";

const SidebarPostCard = async ({ item }: any) => {
   const cookieStore = cookies();
   const direction = cookieStore.get("direction")?.value || "ltr";

   const image = item?.attributes?.featuredImage?.data?.attributes?.formats.small?.url;
   return (
      <div className='flex flex-wrap xl:flex-nowrap items-center gap-5 bg-white rounded-2xl shadow-sectionShadow p-5 mb-5 group'>
         <div>
            <ImageOpt
               className='transition duration-300 ease-in-out group-hover:scale-110'
               src={image || `/avatar.png`}
               width={132}
               height={100}
               layout='fixed'
               noPlaceholder={true}
               alt={undefined}
            />
         </div>
         <div>
            <p className='text-sm text-base-content'>
               {/* 14 SEP, 2020 */}
               {/* <Moment format="DD MMM, YYYY">
                   {item.createdAt}
                 </Moment> */}
            </p>
            <h3 className='text-base font-bold text-neutral max-h-11 overflow-hidden'>{item?.attributes?.title}</h3>
            <Link
               href={item?.attributes?.slug ? `/blog/${item?.attributes?.slug}` : "#"}
               className='flex items-center gap-3 mt-2 transition duration-300 ease-in-out group-hover:opacity-70'
            >
               <button className='text-sm font-semibold text-primary'>Read More</button>
               <BsArrowRightShort className={`${direction === "rtl" ? "rotate-180" : ""} text-primary text-2xl`} />
            </Link>
         </div>
      </div>
   );
};

export default SidebarPostCard;
