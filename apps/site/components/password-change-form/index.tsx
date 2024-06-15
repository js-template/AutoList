import { useForm } from "react-hook-form";

const PasswordChangeForm = () => {
   const {
      register: register,
      handleSubmit: handleSubmit,
      reset,
      watch,
      formState: { errors, isSubmitting, isDirty }
   } = useForm({
      mode: "onBlur"
   });

   // NOTE: This is just a sample onSubmit handler. You can use your own.
   const onSubmitPassword = async (data: any) => {
      console.log(data);
      reset();
   };

   return (
      <div>
         <form className='space-y-6' onSubmit={handleSubmit(onSubmitPassword)}>
            <div>
               <p className='text-sm font-semibold text-base-200 pb-2'>Current Password</p>
               <input
                  type='password'
                  className='focus:outline-none p-3 border border-accent-content rounded-md w-full md:w-8/12 lg:w-4/12 placeholder:text-neutral'
                  {...register("currentPassword", { required: true })}
               />
               {errors.currentPassword && (
                  <span className='text-red-400 text-sm italic block'>This field is required</span>
               )}
            </div>
            <div>
               <p className='text-sm font-semibold text-base-200 pb-2'>New Password</p>
               <input
                  type='password'
                  className='focus:outline-none p-3 border border-accent-content rounded-md w-full md:w-8/12 lg:w-4/12 placeholder:text-neutral'
                  {...register("newPassword", { required: true })}
               />
               {errors.newPassword && <span className='text-red-400 text-sm italic block'>This field is required</span>}
            </div>
            <div>
               <p className='text-sm font-semibold text-base-200 pb-2'>Re-Type New Password</p>
               <input
                  type='password'
                  className='focus:outline-none p-3 border border-accent-content rounded-md w-full md:w-8/12 lg:w-4/12 placeholder:text-neutral'
                  {...register("confirmPassword", {
                     required: {
                        value: true,
                        message: "This field is required"
                     },
                     validate: (value) => value === watch("newPassword") || "Passwords do not match"
                  })}
               />
               {errors.confirmPassword && (
                  <span className='text-red-400 text-sm italic block'>
                     {/* @ts-ignore */}
                     {errors?.confirmPassword?.message}
                  </span>
               )}
            </div>
            <button
               disabled={!isDirty || isSubmitting}
               type='submit'
               className={`flex bg-primary py-3 px-6 rounded-md text-white mt-12 mb-2 ${
                  isDirty ? "opacity-100" : "opacity-30"
               }`}
            >
               {isSubmitting ? "Please wait..." : "Change Password"}
               {/* spinner */}
               {isSubmitting && (
                  <div className='ml-2 flex items-center justify-center '>
                     <div className='w-5 h-5 border-b-2 border-white rounded-full animate-spin'></div>
                  </div>
               )}
            </button>
         </form>
      </div>
   );
};

export default PasswordChangeForm;
