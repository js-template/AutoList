import IconComponent from "@/components/icon/react.icon";
import { useGlobalContext } from "@/context/store";
import { SignOut } from "@/lib/user";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const MobileNav = ({
   loginMenu,
   menuList
}: {
   menuList: {
      id: number;
      label: string;
      link: string;
      type: string;
      icon?: string;
      target: string;
   }[];
   loginMenu: {
      id: number;
      label: string;
      link: string;
      icon?: string;
      type: string;
      target: string;
   }[];
}) => {
   const { mobileMenuShow, setMobileMenuShow } = useGlobalContext();
   const { data, status } = useSession();

   const userData = data?.user;
   const loggedIn = status === "authenticated";
   const avatarUrl =
      userData?.image ??
      `https://ui-avatars.com/api/?name=${userData?.name}&background=004D3F&color=fff&length=2&size=48&bold=true`;

   return (
      <div
         className={`block xl:hidden fixed w-full bg-primary top-0 bottom-0 z-[999] rounded h-auto overflow-y-auto right-0 ease-in-out duration-300  ${
            mobileMenuShow ? "translate-x-0" : `translate-x-full`
         }`}
      >
         <div className='flex justify-between py-5 px-7'>
            <h2 className='text-xl text-white font-bold '>Meta Ads</h2>
            <svg
               onClick={() => setMobileMenuShow(!mobileMenuShow)}
               className='cursor-pointer'
               width='20'
               height='20'
               viewBox='0 0 14 14'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path
                  d='M8.17499 7.00015L13.425 1.75849C13.5819 1.60157 13.6701 1.38874 13.6701 1.16682C13.6701 0.944903 13.5819 0.732074 13.425 0.575155C13.2681 0.418235 13.0552 0.330078 12.8333 0.330078C12.6114 0.330078 12.3986 0.418235 12.2417 0.575155L6.99999 5.82515L1.75832 0.575155C1.6014 0.418235 1.38857 0.330078 1.16666 0.330078C0.944739 0.330078 0.73191 0.418235 0.57499 0.575155C0.41807 0.732074 0.329914 0.944903 0.329914 1.16682C0.329914 1.38874 0.41807 1.60157 0.57499 1.75849L5.82499 7.00015L0.57499 12.2418C0.496883 12.3193 0.434888 12.4115 0.392581 12.513C0.350273 12.6146 0.328491 12.7235 0.328491 12.8335C0.328491 12.9435 0.350273 13.0524 0.392581 13.154C0.434888 13.2555 0.496883 13.3477 0.57499 13.4252C0.652459 13.5033 0.744626 13.5653 0.846176 13.6076C0.947725 13.6499 1.05665 13.6717 1.16666 13.6717C1.27667 13.6717 1.38559 13.6499 1.48714 13.6076C1.58869 13.5653 1.68085 13.5033 1.75832 13.4252L6.99999 8.17515L12.2417 13.4252C12.3191 13.5033 12.4113 13.5653 12.5128 13.6076C12.6144 13.6499 12.7233 13.6717 12.8333 13.6717C12.9433 13.6717 13.0523 13.6499 13.1538 13.6076C13.2554 13.5653 13.3475 13.5033 13.425 13.4252C13.5031 13.3477 13.5651 13.2555 13.6074 13.154C13.6497 13.0524 13.6715 12.9435 13.6715 12.8335C13.6715 12.7235 13.6497 12.6146 13.6074 12.513C13.5651 12.4115 13.5031 12.3193 13.425 12.2418L8.17499 7.00015Z'
                  fill='white'
               />
            </svg>
         </div>

         <hr className=' text-white opacity-20' />

         {/* User | login/registration  */}
         {loggedIn && userData ? (
            <div className='w-full px-7 bg-[#057671] '>
               <div className='flex  items-center justify-between w-full py-4'>
                  <div className='flex items-center gap-4'>
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img width={40} height={40} src={avatarUrl} alt='user-image' className='rounded-lg' />
                     <div>
                        <Link href={"/dashboard/ads"}>
                           <p className='text-base font-normal text-white whitespace-nowrap'>{userData?.name}</p>
                        </Link>
                        {/* FIXME: Package name should update */}
                        <p className='tex-sm font-normal text-white capitalize'>{"Package"} Seller</p>
                     </div>
                  </div>
                  <button>
                     <Link href={"/dashboard/ads"}>
                        <p>
                           <svg
                              width='20'
                              height='20'
                              viewBox='0 0 20 20'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 d='M16.5833 10.5505C16.4497 10.3984 16.3761 10.2029 16.3761 10.0005C16.3761 9.79806 16.4497 9.60256 16.5833 9.45048L17.65 8.25048C17.7675 8.11937 17.8405 7.9544 17.8585 7.77924C17.8765 7.60407 17.8385 7.42772 17.75 7.27548L16.0833 4.39215C15.9957 4.24008 15.8624 4.11955 15.7023 4.04772C15.5422 3.9759 15.3635 3.95645 15.1917 3.99215L13.625 4.30882C13.4256 4.35001 13.2181 4.31681 13.0416 4.21548C12.865 4.11416 12.7317 3.95172 12.6667 3.75882L12.1583 2.23382C12.1024 2.0683 11.9959 1.92454 11.8539 1.82285C11.7118 1.72116 11.5414 1.6667 11.3667 1.66715H8.03333C7.85161 1.65766 7.67177 1.70792 7.5213 1.81024C7.37082 1.91257 7.25798 2.06133 7.2 2.23382L6.73333 3.75882C6.66833 3.95172 6.53497 4.11416 6.35842 4.21548C6.18187 4.31681 5.97434 4.35001 5.77499 4.30882L4.16666 3.99215C4.00379 3.96913 3.83774 3.99483 3.68945 4.06602C3.54116 4.1372 3.41725 4.25067 3.33333 4.39215L1.66666 7.27548C1.57596 7.42602 1.53518 7.60139 1.55015 7.7765C1.56511 7.95162 1.63506 8.11752 1.74999 8.25048L2.80833 9.45048C2.94193 9.60256 3.01561 9.79806 3.01561 10.0005C3.01561 10.2029 2.94193 10.3984 2.80833 10.5505L1.74999 11.7505C1.63506 11.8834 1.56511 12.0493 1.55015 12.2245C1.53518 12.3996 1.57596 12.5749 1.66666 12.7255L3.33333 15.6088C3.42091 15.7609 3.55426 15.8814 3.71437 15.9532C3.87448 16.0251 4.05318 16.0445 4.225 16.0088L5.79166 15.6922C5.99101 15.651 6.19854 15.6842 6.37509 15.7855C6.55164 15.8868 6.685 16.0492 6.75 16.2422L7.25833 17.7672C7.31631 17.9396 7.42916 18.0884 7.57963 18.1907C7.73011 18.293 7.90994 18.3433 8.09166 18.3338H11.425C11.5997 18.3343 11.7701 18.2798 11.9122 18.1781C12.0542 18.0764 12.1608 17.9327 12.2167 17.7672L12.725 16.2422C12.79 16.0492 12.9234 15.8868 13.0999 15.7855C13.2765 15.6842 13.484 15.651 13.6833 15.6922L15.25 16.0088C15.4218 16.0445 15.6005 16.0251 15.7606 15.9532C15.9207 15.8814 16.0541 15.7609 16.1417 15.6088L17.8083 12.7255C17.8968 12.5732 17.9348 12.3969 17.9168 12.2217C17.8989 12.0466 17.8259 11.8816 17.7083 11.7505L16.5833 10.5505ZM15.3417 11.6672L16.0083 12.4171L14.9417 14.2672L13.9583 14.0672C13.3581 13.9445 12.7338 14.0464 12.2038 14.3537C11.6738 14.6609 11.2751 15.152 11.0833 15.7338L10.7667 16.6672H8.63333L8.33333 15.7172C8.14154 15.1354 7.74281 14.6442 7.21283 14.337C6.68285 14.0298 6.05851 13.9278 5.45833 14.0505L4.47499 14.2505L3.39166 12.4088L4.05833 11.6588C4.46829 11.2005 4.69494 10.6071 4.69494 9.99215C4.69494 9.37721 4.46829 8.78383 4.05833 8.32548L3.39166 7.57548L4.45833 5.74215L5.44166 5.94215C6.04185 6.06483 6.66618 5.96288 7.19617 5.65565C7.72615 5.34841 8.12487 4.85728 8.31666 4.27548L8.63333 3.33382H10.7667L11.0833 4.28382C11.2751 4.86561 11.6738 5.35675 12.2038 5.66398C12.7338 5.97122 13.3581 6.07317 13.9583 5.95048L14.9417 5.75048L16.0083 7.60048L15.3417 8.35048C14.9363 8.80778 14.7125 9.39772 14.7125 10.0088C14.7125 10.6199 14.9363 11.2099 15.3417 11.6672ZM9.7 6.66715C9.04072 6.66715 8.39626 6.86265 7.84809 7.22892C7.29993 7.59519 6.87269 8.11578 6.6204 8.72487C6.3681 9.33396 6.30209 10.0042 6.43071 10.6508C6.55933 11.2974 6.8768 11.8913 7.34297 12.3575C7.80915 12.8237 8.40309 13.1412 9.04969 13.2698C9.6963 13.3984 10.3665 13.3324 10.9756 13.0801C11.5847 12.8278 12.1053 12.4005 12.4716 11.8524C12.8378 11.3042 13.0333 10.6598 13.0333 10.0005C13.0333 9.11643 12.6821 8.26858 12.057 7.64346C11.4319 7.01834 10.5841 6.66715 9.7 6.66715ZM9.7 11.6672C9.37036 11.6672 9.04813 11.5694 8.77404 11.3863C8.49996 11.2031 8.28634 10.9428 8.1602 10.6383C8.03405 10.3337 8.00104 9.99863 8.06535 9.67533C8.12966 9.35203 8.2884 9.05506 8.52148 8.82197C8.75457 8.58888 9.05154 8.43015 9.37485 8.36584C9.69815 8.30153 10.0333 8.33454 10.3378 8.46068C10.6423 8.58683 10.9026 8.80045 11.0858 9.07453C11.2689 9.34861 11.3667 9.67085 11.3667 10.0005C11.3667 10.4425 11.1911 10.8664 10.8785 11.179C10.5659 11.4916 10.142 11.6672 9.7 11.6672Z'
                                 fill='white'
                              />
                           </svg>
                        </p>
                     </Link>
                  </button>
               </div>
            </div>
         ) : (
            <div className='w-full p-7'>
               <div className='gap-4 justify-between w-full grid grid-cols-2'>
                  <Link
                     href={"/signin"}
                     className='py-3 px-6 bg-white rounded-lg text-center'
                     onClick={() => {
                        setMobileMenuShow(!mobileMenuShow);
                     }}
                  >
                     <p className='text-base font-normal text-primary'>Sign In</p>
                  </Link>
                  <Link
                     href={"/signup"}
                     className='py-3 px-6 border border-white rounded-lg text-center'
                     onClick={() => {
                        setMobileMenuShow(!mobileMenuShow);
                     }}
                  >
                     <p className='text-base font-normal text-white'>Sign Up</p>
                  </Link>
               </div>
            </div>
         )}

         <hr className=' text-white opacity-20' />

         <div className='grid '>
            <ul className='space-y-5 px-7 py-5'>
               {menuList?.map((item, index) => (
                  <li key={index}>
                     <>
                        <Link href={item.link || "#"} onClick={() => setMobileMenuShow(!mobileMenuShow)}>
                           <span className='flex gap-5 items-center text-white'>
                              {item.icon && (
                                 <IconComponent icon={item.icon} size={20} className={`text-lg whitespace-nowrap`} />
                              )}
                              <span className='text-base text-white font-normal'>{item.label}</span>
                           </span>
                        </Link>
                     </>
                  </li>
               ))}
               <hr className='opacity-20' />

               {/* Login menu  */}
               {loggedIn &&
                  loginMenu.map((item, index) => {
                     return item.link !== "/logout" ? (
                        <li key={index}>
                           <Link href={item.link || "#"} onClick={() => setMobileMenuShow(!mobileMenuShow)}>
                              <span className='flex gap-5 items-center text-white'>
                                 {item.icon && (
                                    <IconComponent icon={item.icon} size={20} className={`text-lg whitespace-nowrap`} />
                                 )}
                                 <span className='text-base font-normal'>{item.label}</span>
                              </span>
                           </Link>
                        </li>
                     ) : (
                        loggedIn && userData && (
                           <li>
                              <button
                                 className='flex gap-5 items-center text-white'
                                 onClick={() => {
                                    setMobileMenuShow(!mobileMenuShow);
                                    signOut().then(() => {
                                       SignOut();
                                    });
                                 }}
                              >
                                 {item.icon && (
                                    <IconComponent icon={item.icon} size={20} className={`text-lg whitespace-nowrap`} />
                                 )}
                                 <span className='text-base text-white font-normal'>{item.label}</span>
                              </button>
                           </li>
                        )
                     );
                  })}

               {/* Post Your Ad */}
               <div className='pt-4 sm:hidden'>
                  <Link
                     href={"/dashboard/ads/create-ad"}
                     onClick={() => {
                        setMobileMenuShow(!mobileMenuShow);
                     }}
                  >
                     <p>
                        <button className='text-base md:font-normal text-white bg-secondary py-2 px-4 md:py-3 md:px-7 rounded w-full'>
                           Post Your Ad
                        </button>
                     </p>
                  </Link>
               </div>
            </ul>
         </div>
      </div>
   );
};

export default MobileNav;
