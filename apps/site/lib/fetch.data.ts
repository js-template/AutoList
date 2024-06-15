"use server";
import { cookies } from "next/headers";
import { find, updateOne } from "./strapi";
import { userRevalidate } from "./userRevalidate";

export const getCategories = async () => {
   try {
      const cookieStore = cookies();
      const Lang = cookieStore.get("lang");

      const language = Lang ? Lang.value : "en";

      const requestData = await fetch(
         `${process.env.STRAPI_ENDPOINT}/api/ads-categories?populate=deep&locale=${language}`,
         {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${process.env.STRAPI_AUTH_TOKEN}`
            },
            cache: "no-store"
         }
      );

      if (!requestData.ok) {
         throw new Error("Failed to fetch data");
      }

      const resData = await requestData.json();

      const CategoriesData = resData?.data;

      return { data: CategoriesData, error: null };
   } catch (error: any) {
      console.error("Error during fetching categories:", error);
      return {
         data: null,
         error: error.message || "An error occurred during data fetch"
      };
   }
};

// Function to upload an image and set its ID
export const uploadImageAndSetId = async (fileInput: any, userToken: string) => {
   try {
      const response = await fetch(`${process.env.STRAPI_ENDPOINT}/api/upload`, {
         method: "POST",
         body: fileInput,
         headers: {
            Authorization: `Bearer ${userToken}` // Replace with your authentication token
         }
      });

      const resData = await response.json();

      if (!response.ok) {
         throw new Error(resData?.error?.message || "Failed to add Image");
      }

      if (response.ok) {
         return {
            success: true,
            data: resData // Assuming your API returns the ID of the uploaded image
         };
      } else {
         // Handle non-OK response status
         throw new Error(`Failed to upload image. Status: ${response.status}`);
      }
   } catch (error: any) {
      console.error("Error during image upload:", error);
      return {
         success: false,
         data: null,
         error: error.message || "An error occurred during image upload"
      };
   }
};

type MessageBodyProps = {
   seller: number;
   buyer: number;
   ads: number;
   messages: {
      userId: string;
      message: string;
      timestamp: string;
   }[];
};

/**
 * Create a new message thread between two users for a specific ad listing (ads) with an initial message
 * @param body - The message data
 * @param body.seller - The seller ID `number`
 * @param body.buyer - The buyer ID `number`
 * @param body.ads - The ads ID `number`
 * @param body.messages - The messages data `array`
 * @param body.message.userId - The user ID `string`
 * @param body.message.message - The message `string`
 * @param body.message.timestamp - The message timestamp `string`
 * @example
 * const { data, error, message } = await createMessage({
 *  seller: 1,
 *  buyer: 2,
 *  ads: 3,
 *  messages: [
 *   {
 *    userId: 1,
 *    message: "Hello",
 *    timestamp: "2021-09-09T12:00:00.000Z",
 *   },
 *   ...
 *  ],
 * });
 */
export const createMessage = async (body: MessageBodyProps, userToken: string) => {
   try {
      if (!body) {
         throw new Error("Input is required");
      }

      const { data, error } = await find(
         "messages",
         {
            filters: {
               ads: {
                  id: body.ads
               },
               buyer: {
                  id: body.buyer
               }
            }
         },
         "no-store",
         userToken
      );

      if (error) {
         throw new Error(error);
      }

      // if message thread already exists, return the existing thread
      if (data?.length) {
         // update the message thread with the new message
         const { data: updatedData, error: updateError } = await updateOne(
            "messages",
            data[0].id,
            {
               data: {
                  seller: body.seller,
                  buyer: body.buyer,
                  ads: body.ads,
                  messages: [...(data[0].attributes.messages && data[0].attributes.messages), ...body.messages]
               }
            },
            userToken
         );

         if (updateError) {
            throw new Error(updateError);
         }

         return {
            data: updatedData,
            error: null,
            message: "Message send successfully"
         };
      }

      const requestData = await fetch(`${process.env.STRAPI_ENDPOINT}/api/messages`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
         },
         body: JSON.stringify({
            data: body
         })
      });

      if (!requestData.ok) {
         throw new Error("Message creation failed");
      }

      const resData = await requestData.json();
      const chatData = resData?.data;

      return {
         data: chatData,
         error: null,
         message: "Message send successfully"
      };
   } catch (error: any) {
      return {
         data: null,
         error: error.message || "An error occurred",
         message: "Message send failed"
      };
   }
};

/**
 * Function to post new ads
 * @param postData
 * @param revalidatePath path string
 * @param revalidateType page | layout
 * @returns {message,data, error}
 */
export const postAds = async (
   postData: any,
   userToken: string,
   revalidatePath?: string,
   revalidateType?: "page" | "layout"
) => {
   try {
      const cookieStore = cookies();
      const Lang = cookieStore.get("lang");
      const language = Lang ? Lang.value : "en";
      const postInput = {
         data: {
            ...postData,
            status: "Active",
            // locale: "language",
            locale: "en"
         }
      };

      const requestData = await fetch(`${process.env.STRAPI_ENDPOINT}/api/manage-ads/`, {
         method: "POST",
         body: JSON.stringify(postInput),
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
         },
         cache: "no-store"
      });

      if (!requestData.ok) {
         return {
            data: null,
            error: requestData.statusText || "Server Error",
            message: "Ad creation failed"
         };
      }
      const resData = await requestData.json();
      const data = resData?.data;

      if (revalidatePath && revalidateType) {
         userRevalidate(revalidatePath, revalidateType);
      }
      return {
         message: "Ad created Successfully",
         data: data,
         error: null
      };
   } catch (error: any) {
      return {
         data: null,
         error: error?.message || "Server Error"
      };
   }
};
