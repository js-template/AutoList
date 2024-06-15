import SignUpForm from "@/components/form/signup";
import { auth } from "@/context/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Sign Up | AutoLister",
   description: "Sign Up page for the app"
};

const SignUp = async () => {
   const session = await auth();

   // if jwt is present, redirect to dashboard/ads
   if (session) {
      redirect("/dashboard/ads");
   }

   return (
      <main>
         <section className='py-24 md:py-32 bg-success-content'>
            <SignUpForm />
         </section>
      </main>
   );
};

export default SignUp;
