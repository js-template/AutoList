import { useForm } from "react-hook-form";

const UserAbout = () => {
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
         <textarea
            className='focus:outline-none p-3 border border-accent-content rounded-md w-full h-36'
            {...register("aboutMe")}
         />
         <button
            disabled={!isDirty || isSubmitting}
            type='submit'
            className={`flex bg-primary py-3 px-6 rounded-md text-white mt-6 mb-2 ${
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

export default UserAbout;
