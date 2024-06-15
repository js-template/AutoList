import LoginForm from "@/components/form/login";
import { auth } from "@/context/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Sign In | AutoLister",
   description: "Sign In page for the app"
};

type Props = {
   searchParams?: Record<"callbackUrl" | "error", string>;
};

const SignInPage = async ({ searchParams }: Props) => {
   const session = await auth();

   // if jwt is present, redirect to dashboard/ads
   if (session) {
      redirect("/dashboard/ads");
   }

   return (
      <section className='bg-success-content '>
         <div className='container mx-auto py-32'>
            <LoginForm error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
         </div>
      </section>
   );
};

export default SignInPage;
