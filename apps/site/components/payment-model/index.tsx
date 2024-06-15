"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Fragment } from "react";
import StripeForm from "../stripe-form";

type Props = {
   packageId: string;
   modalOn: boolean;
   setModalOn: (modalOn: boolean) => void;
   clientSecret: string;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const PaymentModel = ({ packageId, modalOn, setModalOn, clientSecret }: Props) => {
   const appearance = {
      theme: "stripe"
   };
   const options = {
      clientSecret,
      appearance
   } as any;

   return (
      <Fragment>
         <div
            className={`fixed w-full h-full left-0 top-0 z-[99] bg-primary/20  backdrop-blur-sm ${
               modalOn ? "block" : "hidden"
            }`}
            onClick={() => setModalOn(false)}
         />
         {modalOn ? (
            <div className='fixed w-full h-full left-0 top-0 z-[999] transition-all ease-in-out duration-500 scale-100 visible flex items-center justify-center'>
               <div>
                  <div className=' px-6 py-4 md:pt-10 md:pb-6 rounded text-base-300 w-11/12 md:w-full max-w-2xl  m-auto z-50 bg-white  relative'>
                     <h3 className=' pt-2 text-xxs font-bold text-primary text-center'>Please Complete Payment</h3>
                     {/* stripe-button */}
                     <Elements options={options} stripe={stripePromise}>
                        <StripeForm packageId={packageId} />
                     </Elements>
                  </div>
               </div>
               <div
                  className={`fixed w-full h-full left-0 top-0 z-20 ${modalOn ? "block" : "hidden"}`}
                  onClick={() => setModalOn(false)}
               />
            </div>
         ) : (
            <div className='invisible scale-75 opacity-0'></div>
         )}
      </Fragment>
   );
};

export default PaymentModel;
