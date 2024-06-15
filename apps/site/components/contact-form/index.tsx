"use client";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
   // NOTE: The `successMessage` state is used to show the success message
   const [successMessage, setSuccessMessage] = React.useState("");

   // NOTE: The `register` function is used to register the form fields with `react-hook-form`
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
   } = useForm({
      mode: "onChange"
   });

   /**
    * The `onSubmitHandler` function should be an server function. It is used to submit the form data to the server.
    * The `onSubmitHandler` function should return a promise and async/await can be used to handle the promise.
    * @param data
    */
   const onSubmitHandler = async (data: any) => {
      // NOTE: The `data` object contains the form fields
      console.log(data);

      // NOTE: The `setSuccessMessage` function is used to set the success message
      setSuccessMessage("Your message has been sent successfully");

      // NOTE: The `reset` function is used to reset the form fields
      reset();
   };

   return (
      <Fragment>
         <form className='grid' onSubmit={handleSubmit(onSubmitHandler)}>
            <div className='mb-4 '>
               <input
                  className='w-full px-3 py-3 rounded border border-accent-content focus:outline-none'
                  type='text'
                  placeholder='Your Name'
                  {...register("name", {
                     required: "Name is required",
                     minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters"
                     }
                  })}
               />
               {errors?.name && (
                  <p className='text-red-400 text-sm italic py-2'>
                     {/* @ts-ignore */}
                     {errors.name.message}
                  </p>
               )}
            </div>
            <div className='mb-4 '>
               <input
                  className='w-full px-3 py-3 rounded border border-accent-content focus:outline-none'
                  type='text'
                  placeholder='Your Email'
                  {...register("email", {
                     required: "Email is required",
                     pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address"
                     }
                  })}
               />
               {errors?.email && (
                  <p className='text-red-400 text-sm italic py-2'>
                     {/* @ts-ignore */}
                     {errors.email.message}
                  </p>
               )}
            </div>
            <div className='mb-4'>
               <input
                  className='w-full px-3 py-3 rounded border border-accent-content focus:outline-none'
                  type='text'
                  placeholder='Your Phone'
                  {...register("mobile", {
                     required: "Mobile is required",
                     pattern: {
                        value: /^[0-9]+$/,
                        message: "Mobile must be numeric"
                     }
                  })}
               />
               {errors?.mobile && (
                  <p className='text-red-400 text-sm italic py-2'>
                     {/* @ts-ignore */}
                     {errors.mobile.message}
                  </p>
               )}
            </div>
            <div className='mb-4'>
               <textarea
                  className='w-full h-24 p-3 rounded border border-accent-content focus:outline-none'
                  placeholder='How can we help you ...'
                  {...register("message", {
                     required: "This field is required"
                  })}
               />
               {errors?.message && (
                  <p className='text-red-400 text-sm italic py-2'>
                     {/* @ts-ignore */}
                     {errors.message.message}
                  </p>
               )}
            </div>
            <button
               type='submit'
               disabled={isSubmitting}
               className='flex gap-2 items-center justify-center  w-full py-4 bg-primary rounded-md text-base font-normal text-white'
            >
               {isSubmitting ? "Please wait..." : "Send Message"}
               {/* spinner */}
               {isSubmitting && (
                  <div className='flex items-center justify-center '>
                     <div className='w-5 h-5 border-b-2 border-white rounded-full animate-spin'></div>
                  </div>
               )}
            </button>
         </form>
         {successMessage && (
            <div className='bg-green-100 border-l-4 border-green-500 text-green-700 py-3 px-4 mt-4'>
               <p className='font-bold'>Success!</p>
               <p>{successMessage}</p>
            </div>
         )}
      </Fragment>
   );
};

export default ContactForm;
