"use client";

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { deleteCookie } from "cookies-next";
import React, { useState } from "react";
import toast from "react-hot-toast";

const StripeForm = ({ packageId }: any) => {
   const stripe = useStripe();
   const elements = useElements();

   const [btnDisable, setBtnDisable] = useState(true);

   const handleChange = (e: any) => {
      if (e?.complete) {
         setBtnDisable(false);
      } else {
         setBtnDisable(true);
      }
   };

   const [isLoading, setIsLoading] = React.useState(false);

   React.useEffect(() => {
      if (!stripe) {
         return;
      }
      const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
      if (!clientSecret) {
         return;
      }

      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }: any) => {
         switch (paymentIntent.status) {
            case "succeeded":
               break;
            case "processing":
               break;
            case "requires_payment_method":
               break;
            default:
               break;
         }
      });
   }, [stripe]);

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (!stripe || !elements) {
         return;
      }

      setIsLoading(true);

      try {
         // TODO :  call the API here to update user package
         deleteCookie("paymentIntent_id");
         const { error, paymentIntent } = (await stripe.confirmPayment({
            elements,
            confirmParams: {
               // NOTE: This is the URL to which the user will be redirected after the payment is successful.
               return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?packageId=${packageId}`
            }
            // redirect: "if_required",
         })) as any;

         if (error) {
            toast.error(error?.message || "Sorry, Payment is not successful");
            setIsLoading(false);
         } else if (paymentIntent && paymentIntent?.status === "succeeded") {
            toast.success("Payment is successful");
            setIsLoading(false);
         } else {
            toast.error(error?.message || "Sorry, Payment is not successful");
            setIsLoading(false);
         }
      } catch (error: any) {
         toast.error(error?.message || "Sorry, Payment is not successful");
      }
   };

   return (
      <>
         <div className='bg-white px-0 sm:px-4 py-3 rounded-xl mt-5'>
            <form id='payment-form' onSubmit={handleSubmit}>
               <PaymentElement id='payment-element' onChange={handleChange} />

               <div id='button-text' className='flex justify-center'>
                  <button
                     id='submit'
                     disabled={isLoading || !stripe || !elements || btnDisable}
                     className={`${btnDisable ? " opacity-40" : ""}  ${isLoading ? " bg-primary" : " bg-secondary"} ${
                        !btnDisable && !isLoading ? "hover:bg-primary" : ""
                     }  text-white  my-5 px-5 py-4 flex items-center justify-center text-base font-semibold uppercase duration-500 ease-in-out rounded-md`}
                  >
                     {isLoading && (
                        <span className='mr-2'>
                           {/* <FormLoader id='spinner' color={"text-themeDark"} /> */}
                           <div className='col-span-3'>
                              <div className='flex items-center justify-center '>
                                 <div className='w-5 h-5 border-b-2 border-t-2 border-white rounded-full animate-spin'></div>
                              </div>
                           </div>
                        </span>
                     )}
                     {isLoading ? "Payment Processing" : "CONFIRM PAYMENT"}
                  </button>
               </div>
            </form>
         </div>
      </>
   );
};

export default StripeForm;
