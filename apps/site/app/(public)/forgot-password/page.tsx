import ForgotPassForm from "@/components/form/forgotPassword";
import { auth } from "@/context/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Forgot Password",
   description: "Forgot Password Page for the frontend app"
};

const SignInPage = async () => {
   const session = await auth();

   // if jwt is present, redirect to dashboard/ads
   if (session) {
      redirect("/dashboard/ads");
   }

   return (
      <section className='bg-success-content '>
         <div className='container mx-auto py-32'>
            <ForgotPassForm />
         </div>
      </section>
   );
};

export default SignInPage;
