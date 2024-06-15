"use client";
import { create } from "@/lib/strapi";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ForgotPassForm = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
   } = useForm();

   const forgotPassHandler = async (data: any) => {
      setIsLoading(true);
      try {
         const { data: forgotPassData, error } = await create(
            "auth/forgot-password",
            data,
            process.env.STRAPI_AUTH_TOKEN
         );

         if (error) {
            toast.error("Email is not correct, please try again");
            setIsLoading(false);
            return;
         }

         toast.success("Please check your email to reset password", {
            duration: 8000
         });
         setIsLoading(false);
         reset();
      } catch (err) {
         console.log(err);
         toast.error("Email is not correct, please try again");
         setIsLoading(false);
      }
   };

   return (
      <div className='max-w-md mx-auto shadow px-8 sm:px-6 py-10 rounded-lg bg-white'>
         <div className='mb-6 text-center'>
            <h3 className='mb-4 text-2xl text-neutral'>Forgot Password</h3>
         </div>
         <form onSubmit={handleSubmit(forgotPassHandler)}>
            <div className='mb-6'>
               <label className='block mb-2 text-neutral font-normal' htmlFor='email'>
                  Email Address
               </label>
               <input
                  id='email'
                  className={`appearance-none block w-full !p-3 leading-5 text-base-content border ${
                     errors?.email ? "!border-red-500" : "border-gray"
                  } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-base-200 focus:outline-none `}
                  type='email'
                  {...register("email", { required: true })}
                  placeholder='Enter Your Email Address'
               />
               {errors?.email && <span className='text-red-500 text-xss italic'>This field is required</span>}
            </div>
            <button
               className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 ${
                  isLoading ? "bg-neutral" : "bg-primary"
               } rounded-md`}
               type='submit'
               disabled={isLoading}
            >
               {isLoading ? "Please wait..." : "Reset Password"}
               {isLoading && (
                  <div className='flex items-center justify-center '>
                     <div className='w-5 h-5 border-b-2 border-white rounded-full animate-spin'></div>
                  </div>
               )}
            </button>
            <p className='text-center flex flex-wrap items-center justify-center gap-2'>
               <span className='text-sm text-base-300 font-normal'>Back to</span>
               <Link href='/signin' className='inline-block text-sm font-normal text-primary hover:underline'>
                  Login
               </Link>
            </p>
         </form>
      </div>
   );
};

export default ForgotPassForm;
