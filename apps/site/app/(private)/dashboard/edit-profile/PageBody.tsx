"use client";
import PasswordChangeForm from "@/components/password-change-form";
import ProfileForm from "@/components/profile-form";
import SocialLink from "@/components/social-link";
import UserAbout from "@/components/user-about";
import React from "react";

const PageBody = () => {
   const [active, setActive] = React.useState(1);

   return (
      <section className='pt-10 pb-32 min-h-screen'>
         <div className={`container mx-auto`}>
            <div className='grid grid-cols-4 gap-8'>
               <div className='col-span-4 xl:col-span-1'>
                  <div className='block space-y-3 bg-white rounded-md p-6'>
                     <button
                        onClick={() => setActive(1)}
                        className={`w-full py-3 rounded-md text-left px-5 ${
                           active === 1 ? "bg-primary text-white " : "bg-white text-base-content"
                        }`}
                     >
                        Basic Info
                     </button>
                     <button
                        onClick={() => setActive(2)}
                        className={`w-full py-3 rounded-md text-left px-5 ${
                           active === 2 ? "bg-primary text-white " : "bg-white text-base-content"
                        }`}
                     >
                        Social Media
                     </button>
                     <button
                        onClick={() => setActive(3)}
                        className={`w-full py-3 rounded-md text-left px-5 ${
                           active === 3 ? "bg-primary text-white " : "bg-white text-base-content"
                        }`}
                     >
                        About Me
                     </button>
                     <button
                        onClick={() => setActive(4)}
                        className={`w-full py-3 rounded-md text-left px-5 ${
                           active === 4 ? "bg-primary text-white " : "bg-white text-base-content"
                        }`}
                     >
                        Change Password
                     </button>
                  </div>
               </div>
               <div className='col-span-4 xl:col-span-3 bg-white rounded-lg p-6 sm:p-10 '>
                  {(active === 1 && <ProfileForm />) ||
                     (active === 2 && (
                        <div>
                           <h3 className='text-sm font-semibold text-base-content pb-8 uppercase '>Social media</h3>
                           <SocialLink />
                        </div>
                     )) ||
                     (active === 3 && (
                        <div>
                           <p className='text-sm font-semibold text-base-content pb-6'>About Me</p>
                           <UserAbout />
                        </div>
                     )) ||
                     (active === 4 && (
                        <div>
                           <h3 className='text-sm font-semibold text-base-content pb-8 uppercase '>Change Password</h3>
                           <PasswordChangeForm />
                        </div>
                     ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default PageBody;
