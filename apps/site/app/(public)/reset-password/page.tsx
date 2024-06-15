import ResetPassForm from "@/components/form/resetPassword";
import { auth } from "@/context/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Reset Password",
   description: "Reset Password Page for the frontend app"
};

type Props = {
   searchParams?: Record<"code", string>;
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
            <ResetPassForm code={searchParams?.code} />
         </div>
      </section>
   );
};

export default SignInPage;
