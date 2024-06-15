import { useForm } from "react-hook-form";

const SocialLink = () => {
   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors, isSubmitting, isSubmitted, isDirty }
   } = useForm({
      mode: "onBlur"
   });

   // NOTE: This is just a sample onSubmit handler. You can use your own.
   const onSubmit = async (data: any) => {
      console.log(data);
      reset();
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='space-y-6'>
            {/* facebook */}
            <div className='flex justify-between items-center'>
               <p className='text-base font-semibold text-base-300'>Facebook</p>
               <input
                  className='focus:outline-none p-3 border border-accent-content rounded-md w-8/12'
                  type='text'
                  placeholder='https://facebook.com/user-name-here'
                  {...register("facebook")}
               />
            </div>

            {/* twitter */}
            <div className='flex justify-between items-center'>
               <p className='text-base font-semibold text-base-300'>Twitter</p>
               <input
                  className='focus:outline-none p-3 border border-accent-content rounded-md w-8/12'
                  type='text'
                  placeholder='https://twitter.com/user-name-here'
                  {...register("twitter")}
               />
            </div>

            {/* linkedin */}
            <div className='flex justify-between items-center'>
               <p className='text-base font-semibold text-base-300'>Linkedin</p>
               <input
                  className='focus:outline-none p-3 border border-accent-content rounded-md w-8/12'
                  type='text'
                  placeholder='https://linkedin.com/user-name-here'
                  {...register("linkedin")}
               />
            </div>

            {/* instagram */}
            <div className='flex justify-between items-center'>
               <p className='text-base font-semibold text-base-300'>Instagram</p>
               <input
                  className='focus:outline-none p-3 border border-accent-content rounded-md w-8/12'
                  type='text'
                  placeholder='https://instagram.com/user-name-here'
                  {...register("instagram")}
               />
            </div>
         </div>
         <button
            disabled={!isDirty || isSubmitting}
            type='submit'
            className={`flex bg-primary py-3 px-6 rounded-md text-white mt-12 mb-2  ${
               isDirty ? "opacity-100" : "opacity-30"
            }`}
         >
            {isSubmitting ? "Please wait..." : "Save Changes"}
            {/* spinner */}
            {isSubmitting && (
               <div className='ml-2 flex items-center justify-center '>
                  <div className='w-5 h-5 border-b-2 border-white rounded-full animate-spin'></div>
               </div>
            )}
         </button>
      </form>
   );
};

export default SocialLink;
