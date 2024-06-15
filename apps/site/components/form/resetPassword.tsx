"use client";
import { create } from "@/lib/strapi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ResetPassFormProps = {
   code: string | undefined;
};

const ResetPassForm = ({ code }: ResetPassFormProps) => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   useEffect(() => {
      const closeId = setTimeout(() => {
         if (!code) {
            toast.error("Invalid reset password link", {
               duration: 5000,
               position: "top-center",
               style: {
                  borderRadius: "6px",
                  boxShadow: "0px 4px 20px 5px rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  color: "#F87171"
               }
            });
         }
      }, 100);

      return () => {
         clearTimeout(closeId);
      };
   }, [code]);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
   } = useForm();

   const resetPassHandler = async (data: any) => {
      setIsLoading(true);
      try {
         const { data: resetPassData, error } = await create(
            "auth/reset-password",
            {
               code,
               password: data.password,
               passwordConfirmation: data.confirmPassword
            },
            process.env.STRAPI_AUTH_TOKEN
         );

         if (error) {
            toast.error("Code is not correct, please try again");
            setIsLoading(false);
            return;
         }

         toast.success("Password has been reset successfully", {
            duration: 5000
         });
         setIsLoading(false);
         reset();
         router.push("/signin");
      } catch (err) {
         console.log(err);
         toast.error("Something went wrong, please try again");
         setIsLoading(false);
      }
   };

   return (
      <div className='max-w-md mx-auto shadow px-8 sm:px-6 py-10 rounded-lg bg-white'>
         <div className='mb-6 text-center'>
            <h3 className='mb-4 text-2xl text-neutral'>Reset Password</h3>
         </div>
         <form onSubmit={handleSubmit(resetPassHandler)}>
            {/* New Password */}
            <div className='mb-6'>
               <label className='block mb-2 text-neutral font-normal' htmlFor='password'>
                  New Password
               </label>
               <input
                  id='password'
                  className={`appearance-none block w-full !p-3 leading-5 text-base-content border ${
                     errors?.password ? "!border-red-500" : "border-gray"
                  } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-base-200 focus:outline-none `}
                  type='password'
                  {...register("password", { required: true })}
                  placeholder='Enter New Password'
               />
               {errors?.password && <span className='text-red-500 text-xss italic'>This field is required</span>}
            </div>
            {/* Confirm Password */}
            <div className='mb-6'>
               <label className='block mb-2 text-neutral font-normal' htmlFor='confirmPassword'>
                  Confirm Password
               </label>
               <input
                  id='confirmPassword'
                  className={`appearance-none block w-full !p-3 leading-5 text-base-content border ${
                     errors?.confirmPassword ? "!border-red-500" : "border-gray"
                  } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-base-200 focus:outline-none `}
                  type='password'
                  {...register("confirmPassword", { required: true })}
                  placeholder='Confirm Password'
               />
               {errors?.confirmPassword && <span className='text-red-500 text-xss italic'>This field is required</span>}
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
         </form>
      </div>
   );
};

export default ResetPassForm;
