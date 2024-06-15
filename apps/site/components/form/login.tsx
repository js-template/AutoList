"use client";
import { AuthProviders } from "@/context/auth";
import _ from "lodash";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type LoginFormProps = {
   error: string | undefined;
   callbackUrl: string | undefined;
};

const LoginForm = ({ error, callbackUrl }: LoginFormProps) => {
   const [isLoading, setIsLoading] = useState<boolean>(false);

   useEffect(() => {
      const closeId = setTimeout(() => {
         if (error) {
            if (error === "CredentialsSignin") {
               toast.error("Email or password is incorrect", {
                  duration: 5000,
                  position: "top-center",
                  style: {
                     borderRadius: "6px",
                     boxShadow: "0px 4px 20px 5px rgba(0, 0, 0, 0.05)",
                     border: "1px solid rgba(0, 0, 0, 0.1)",
                     color: "#F87171"
                  }
               });

               return;
            }

            if (error === "EmailCreateAccount") {
               toast.error("Email is already in use", {
                  duration: 5000,
                  position: "top-center",
                  style: {
                     borderRadius: "6px",
                     boxShadow: "0px 4px 20px 5px rgba(0, 0, 0, 0.05)",
                     border: "1px solid rgba(0, 0, 0, 0.1)",
                     color: "#F87171"
                  }
               });

               return;
            }

            if (error === "CallbackRouteError") {
               toast.error("Maybe you are trying a wrong account", {
                  duration: 5000,
                  position: "top-center",
                  style: {
                     borderRadius: "6px",
                     boxShadow: "0px 4px 20px 5px rgba(0, 0, 0, 0.05)",
                     border: "1px solid rgba(0, 0, 0, 0.1)",
                     color: "#F87171"
                  }
               });

               return;
            }

            toast.error("Something went wrong", {
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
   }, [error]);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
   } = useForm();

   const loginHandler = async (data: any) => {
      setIsLoading(true);

      await signIn("credentials", {
         username: data.email,
         password: data.password,
         redirect: true,
         callbackUrl: callbackUrl || process.env.NEXTAUTH_URL
      }).then(() => {
         setIsLoading(false);
      });
   };

   return (
      <div className='max-w-md mx-auto shadow px-8 sm:px-6 py-10 rounded-lg bg-white'>
         <div className='mb-6 text-center'>
            <h3 className='mb-4 text-2xl text-neutral'>Sign In</h3>
         </div>
         <div className='flex flex-wrap items-center justify-center gap-3'>
            {_.map(AuthProviders, (provider) => {
               return provider === "credentials" ? (
                  <form onSubmit={handleSubmit(loginHandler)} className='w-full'>
                     <div className='mb-6'>
                        <label className='block mb-2 text-neutral font-normal' htmlFor='Username'>
                           Username or Email
                        </label>
                        <input
                           id='Username'
                           className={`appearance-none block w-full !p-3 leading-5 text-base-content border ${
                              errors?.email ? "!border-red-500" : "border-gray"
                           } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-base-200 focus:outline-none `}
                           type='text'
                           {...register("email", { required: true })}
                           placeholder='Enter Your Username'
                        />
                        {errors?.email && <span className='text-red-500 text-xss italic'>This field is required</span>}
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
                        {errors?.password && (
                           <span className='text-red-500 text-xss italic'>This field is required</span>
                        )}
                     </div>
                     <div className='flex flex-wrap items-center justify-between mb-6'>
                        <div className='w-full md:w-1/2'>
                           {/* <label className="relative inline-flex items-center">
              <input
                className="checked:bg-red-500 w-4 h-4"
                {...register("remember")}
                type="checkbox"
              />
              <span className="ml-3 text-sm text-base-content font-normal">
                Remember me
              </span>
            </label> */}
                        </div>
                        <div className='w-full md:w-auto mt-1'>
                           <Link
                              href='/forgot-password'
                              className='inline-block text-sm font-normal text-primary hover:underline'
                           >
                              Forgot password?
                           </Link>
                        </div>
                     </div>
                     <button
                        className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 ${
                           isSubmitting ? "bg-primary" : "bg-primary"
                        } rounded-md`}
                        type='submit'
                        disabled={isSubmitting}
                     >
                        {isLoading ? "Please wait..." : "Login"}
                        {isLoading && (
                           <div className='flex items-center justify-center '>
                              <div className='w-5 h-5 border-b-2 border-white rounded-full animate-spin'></div>
                           </div>
                        )}
                     </button>
                     <p className='text-center flex flex-wrap items-center justify-center gap-3'>
                        <span className='text-sm text-base-300 font-normal'>Not a Member?</span>
                        <Link href='/signup' className='inline-block text-sm font-normal text-primary  hover:underline'>
                           Create Account
                        </Link>
                     </p>
                  </form>
               ) : (
                  <button
                     key={provider}
                     onClick={() => signIn(provider, { callbackUrl: callbackUrl || process.env.NEXTAUTH_URL })}
                     className={`p-2.5 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out text-base font-normal text-center leading-6 ${
                        provider === "google"
                           ? "bg-gray-100 text-base-content hover:bg-[#f1f1f1]"
                           : provider === "facebook"
                             ? "bg-[#1877f2] text-white hover:bg-[#0d6efd]"
                             : provider === "linkedin"
                               ? "bg-[#0077b5] text-white hover:bg-[#046293]"
                               : "bg-primary text-white"
                     } rounded-md group shadow hover:shadow-lg`}
                  >
                     {provider === "google" ? (
                        <FcGoogle className='w-7 h-7 transform group-hover:scale-125 transition-all duration-300 ease-in-out' />
                     ) : provider === "facebook" ? (
                        <FaFacebook className='w-7 h-7 transform group-hover:scale-125 transition-all duration-300 ease-in-out' />
                     ) : provider === "linkedin" ? (
                        <FaLinkedin className='w-7 h-7 transform group-hover:scale-125 transition-all duration-300 ease-in-out' />
                     ) : (
                        provider
                     )}
                  </button>
               );
            })}
         </div>
      </div>
   );
};

export default LoginForm;
