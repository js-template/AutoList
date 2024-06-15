"use server";
import { User } from "next-auth";
import { cookies } from "next/headers";
import { userRevalidate } from "./userRevalidate";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * Function to create-payment-intent in stripe
 * @param price as number
 * @param userDetails as {name, email}
 * @param revalidatePath path string
 * @param revalidateType page | layout
 * @returns {message,data, error}
 */
export const createPaymentIntent = async (
   price: number,
   userDetails: User,
   revalidatePath?: string,
   revalidateType?: "page" | "layout"
) => {
   try {
      const totalCartPriceCalc = price ? price * 100 : 0;
      const totalCartPrice = Math.round((totalCartPriceCalc + Number.EPSILON) * 100) / 100;

      const cookieStore = cookies();
      const paymentIntentID_Old = cookieStore.get("paymentIntent_id");

      if (paymentIntentID_Old) {
         // Create a PaymentIntent with the order amount and currency
         const paymentIntentUpdated = await stripe.paymentIntents.update(paymentIntentID_Old?.value, {
            amount: totalCartPrice
         });
         if (revalidatePath && revalidateType) {
            userRevalidate(revalidatePath, revalidateType);
         }
         return {
            message: "Payment Intent Created Successfully",
            data: {
               clientSecret: paymentIntentUpdated.client_secret,
               paymentIntentID: paymentIntentUpdated.id
            },
            error: null
         };
      } else {
         // check if customer exists
         const customer = await stripe.customers.create({
            description: "AutoLister Customer",
            name: userDetails?.name,
            email: userDetails?.email
         });

         // Create a PaymentIntent with the order amount and currency
         const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCartPrice,
            currency: "usd",
            customer: customer?.id,
            setup_future_usage: "off_session",
            automatic_payment_methods: {
               enabled: true
            }
         });
         // set paymentIntent id in local storage
         cookies().set("paymentIntent_id", paymentIntent.id);
         if (revalidatePath && revalidateType) {
            userRevalidate(revalidatePath, revalidateType);
         }
         return {
            message: "Payment Intent Created Successfully",
            data: {
               clientSecret: paymentIntent.client_secret,
               paymentIntentID: paymentIntent.id
            },
            error: null
         };
      }
   } catch (error: any) {
      return {
         data: null,
         error: error?.message || "Failed to Create Payment Intent"
      };
   }
};

/**
 * Function to retrieve-payment-intent in stripe
 * @param paymentIntentID as string
 * @returns {message,data, error}
 */
export const retrievePaymentIntent = async (paymentIntentID: string) => {
   try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentID);
      return {
         message: "Payment Intent Retrieved Successfully",
         data: paymentIntent,
         error: null
      };
   } catch (error: any) {
      return {
         data: null,
         error: error?.message || "Failed to Retrieve Payment Intent"
      };
   }
};
