"use client";
import { SignUp } from "@/lib/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignUpForm = () => {
   const [loading, setLoading] = React.useState(false);
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
   } = useForm();
   const router = useRouter();

   const onSubmitHandler = async (data: any) => {
      setLoading(true);
      try {
         // Use the getUser function to perform the login
         const result = await SignUp(data);
         if (result.isLoggedIn) {
            toast.success("Successfully Logged In!");
            router.push("/dashboard/ads");
         } else {
            toast.error("Username or Email already exists");
            setLoading(false);
         }
         // Redirect to the dashboard upon successful login
      } catch (error) {
         // Handle any unexpected errors during the login process
         console.error(error);
         toast.error("Username or Email already exists");
         setLoading(false);
         reset();
      }
   };

   return (
      <div className='max-w-md mx-auto shadow px-8 sm:px-6 py-10 rounded-lg bg-white'>
         <div className='mb-6 text-center'>
            <h3 className='mb-4 text-2xl text-neutral'>Sign Up</h3>
         </div>
         <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className='mb-6'>
               <label className='block mb-2 text-neutral font-normal' htmlFor='email'>
                  Email
               </label>
               <input
                  id='email'
                  className={`appearance-none block w-full !p-3 leading-5 text-base-content border ${
                     errors?.email ? "!border-red-500" : "border-gray"
                  } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-base-200 focus:outline-none `}
                  type='email'
                  {...register("email", { required: true })}
                  placeholder='Enter Your Email'
               />
               {errors?.email && <span className='text-red-500 text-xss italic'>This field is required</span>}
            </div>
            <div className='mb-4'>
               <label className='block mb-2 text-neutral font-normal' htmlFor='username'>
                  Username
               </label>
               <input
                  id='Username'
                  className={`appearance-none block w-full !p-3 leading-5 text-base-content border ${
                     errors?.username ? "!border-red-500" : "border-gray"
                  } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-base-200 focus:outline-none `}
                  type='text'
                  {...register("username", { required: true })}
                  placeholder='Enter Your User Name'
               />
               {errors?.password && <span className='text-red-500 text-xss italic'>This field is required</span>}
            </div>
            <div className='mb-4'>
               <label className='block mb-2 text-neutral font-normal' htmlFor='password'>
                  Password
               </label>
               <input
                  id='password'
                  className={`appearance-none block w-full !p-3 leading-5 text-base-content border ${
                     errors?.password ? "!border-red-500" : "border-gray"
                  } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-base-200 focus:outline-none `}
                  type='password'
                  {...register("password", { required: true })}
                  placeholder='Enter Your Password'
               />
               {errors?.password && <span className='text-red-500 text-xss italic'>This field is required</span>}
            </div>
            <button
               className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out my-6 w-full text-base text-white font-normal text-center leading-6 ${
                  isSubmitting ? "bg-primary" : "bg-primary"
               } rounded-md`}
               type='submit'
               disabled={isSubmitting}
            >
               {isSubmitting ? "Please wait..." : "Register"}
               {(isSubmitting || loading) && (
                  <div className='flex items-center justify-center '>
                     <div className='w-5 h-5 border-b-2 border-white rounded-full animate-spin'></div>
                  </div>
               )}
            </button>
            <p className='text-center flex flex-wrap items-center justify-center gap-3'>
               <span className='text-sm text-base-300 font-normal'>Already a Member?</span>
               <Link href='/signin' className='inline-block text-sm font-normal text-primary  hover:underline'>
                  Login
               </Link>
            </p>
         </form>
      </div>
   );
};

export default SignUpForm;
