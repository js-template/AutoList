"use server";
// @ts-ignore
import qs from "qs";
import { userRevalidate } from "./userRevalidate";

const apiUrl = process.env.STRAPI_ENDPOINT;

/**
 * Function to create data
 * @param model model name as like strapi model name `pages`, `messages`...
 * @param data data object to create data
 * @param userToken
 * @param revalidatePath path string for revalidate data after update or delete (https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
 * @param revalidateType page | layout
 * @returns {data, error, message}
 * @example
 * const { data, error, message } = await create("messages", { ...data }, "/dashboard/messages", "page");
 */
export const create = async (
   model: string,
   data: any,
   userToken?: string,
   revalidatePath?: string,
   revalidateType?: "page" | "layout"
) => {
   try {
      const response = await fetch(`${apiUrl}/api/${model}`, {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
         },
         cache: "no-cache"
      });

      const resData = await response?.json();

      if (!response.ok) {
         throw new Error(resData?.error?.message || "Failed to create");
      }
      if (revalidatePath && revalidateType) {
         userRevalidate(revalidatePath, revalidateType);
      }

      return { message: "Successfully Created", data: resData?.data, error: null };
   } catch (error: any) {
      return {
         data: null,
         error: error?.message || "Failed to create"
      };
   }
};

/**
 * Function to get data by id
 * @param model  model name as like strapi model name `pages`, `messages`...
 * @param id  id of the data
 * @param query  query object to filter data
 * @param cache  cache type `force-cache`, `no-cache`, `no-store`
 * @param userToken
 * @param revalidate  revalidate time in seconds
 * @returns  {data, error}
 * @example
 * const { data, error } = await findOne("pages", 1, { filters: { slug: { $eq: "home" } } }, "force-cache", 60);
 */
export const findOne = async (
   model: string,
   id: number,
   query: any = {},
   cache: "force-cache" | "no-cache" | "no-store" = "force-cache",
   userToken?: string,
   revalidate?: number
) => {
   const queryString = qs.stringify(query, {
      arrayFormat: "indices",
      encode: false,
      indices: false
   });

   try {
      const response = await fetch(`${apiUrl}/api/${model}/${id}?${queryString}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            ...{ ...(userToken ? { Authorization: `Bearer ${userToken}` } : {}) }
         },
         ...{
            ...(revalidate ? {} : { cache }),
            ...(revalidate
               ? {
                    next: {
                       revalidate: revalidate
                    }
                 }
               : {})
         }
      });

      if (!response.ok) {
         throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      return { data, error: null };
   } catch (error: any) {
      console.error(`Error during API call: ${error.message}`);
      return {
         data: null,
         error: error.message || "An error occurred during data fetch"
      };
   }
};

/**
 * Function to get data
 * @param model  model name as like strapi model name `pages`, `messages`...
 * @param query  query object to filter data
 * @param cache  cache type `force-cache`, `no-cache`, `no-store`
 * @param userToken
 * @param revalidate  revalidate time in seconds
 * @returns  {data, error}
 * @example
 * const { data, error } = await find("pages", { filters: { slug: { $eq: "home" } } }, "force-cache", 60);
 */
export const find = async (
   model: string,
   query: any = {},
   cache: "force-cache" | "no-cache" | "no-store" = "force-cache",
   userToken?: string,
   revalidate?: number
) => {
   const queryString = qs.stringify(query, {
      arrayFormat: "indices",
      encode: false,
      indices: false
   });

   try {
      const response = await fetch(`${apiUrl}/api/${model}/?${queryString}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            ...{ ...(userToken ? { Authorization: `Bearer ${userToken}` } : {}) }
         },
         ...{
            ...(revalidate ? {} : { cache }),
            ...(revalidate
               ? {
                    next: {
                       revalidate: revalidate
                    }
                 }
               : {})
         }
      });

      if (!response.ok) {
         throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();

      return { data, error: null };
   } catch (error: any) {
      console.error(`Error during API call: ${error.message}`);
      return {
         data: null,
         error: error.message || "An error occurred during data fetch"
      };
   }
};

/**
 * Function to delete data
 * @param model
 * @param id
 * @param userToken
 * @param revalidatePath path string
 * @param revalidateType page | layout
 * @returns {message,data, error}
 */
export const deleteOne = async (
   model: string,
   id: number,
   userToken: string,
   revalidatePath?: string,
   revalidateType?: "page" | "layout"
) => {
   try {
      const response = await fetch(`${apiUrl}/api/${model}/${id}`, {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${userToken}`
         }
      });

      const resData = await response?.json();

      if (!response.ok) {
         throw new Error(resData?.error?.message || "Failed to delete");
      }
      if (revalidatePath && revalidateType) {
         userRevalidate(revalidatePath, revalidateType);
      }
      return { message: "Successfully Deleted", data: resData?.data, error: null };
   } catch (error: any) {
      return {
         data: null,
         error: error?.message || "Failed to delete"
      };
   }
};

/**
 * Function to update data
 * @param model
 * @param id
 * @param updatedData
 * @param userToken
 * @param revalidatePath path string
 * @param revalidateType page | layout
 * @returns {message,data, error}
 */
export const updateOne = async (
   model: string,
   id: number,
   updatedData: any,
   userToken?: string,
   revalidatePath?: string,
   revalidateType?: "page" | "layout"
) => {
   try {
      const response = await fetch(`${apiUrl}/api/${model}/${id}`, {
         method: "PUT",
         body: JSON.stringify(updatedData),
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
         },
         cache: "no-store"
      });

      const resData = await response?.json();

      if (!response.ok) {
         throw new Error(resData?.error?.message || "Failed to update");
      }
      if (revalidatePath && revalidateType) {
         userRevalidate(revalidatePath, revalidateType);
      }

      return { message: "Successfully Updated", data: resData?.data ?? resData, error: null };
   } catch (error: any) {
      return {
         data: null,
         error: error?.message || "Failed to update"
      };
   }
};

/**
 * Strapi dynamic fetch function for GET, POST, PUT, DELETE, PATCH method with revalidate option for Next.js
 * @param method GET | POST | PUT | DELETE | PATCH default GET
 * @param model model name as like strapi model name `pages`, `messages`...
 * @param body body data mainly for POST, PUT, PATCH method
 * @param query query string as object {key: value} for filtering data
 * @param cache force-cache | no-cache | no-store default force-cache (https://developer.mozilla.org/en-US/docs/Web/API/Request/cache)
 * @param revalidate revalidate time in seconds (https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation)
 * @param id id for single data fetch like findOne method default null
 * @param revalidatePath path string for revalidate data after update or delete (https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
 * @param revalidateType page | layout
 * @example
 * // GET method example
 * const { data, error } = await strapiFetch("GET", "pages", {}, { slug: "home" });
 * // POST method example
 * const { data, error } = await strapiFetch("POST", "messages", { ...data }, {}, "no-store");
 * // PUT method example
 * const { data, error } = await strapiFetch("PUT", "messages", { ...data }, {}, "no-store", null, 1, null, null);
 * // DELETE method example
 * const { data, error } = await strapiFetch("DELETE", "messages", {}, {}, "no-store", null, 1, "/dashboard/messages", "page");
 * // PATCH method example
 * const { data, error } = await strapiFetch("PATCH", "messages", { ...data }, {}, "no-store", null, 1, "/dashboard/messages", "page");
 * @returns {data, error}
 */
export const strapiFetch: {
   (
      method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
      model: string,
      body: object | null,
      query?: object,
      cache?: "force-cache" | "no-cache" | "no-store",
      revalidate?: number | null,
      id?: number | null,
      revalidatePath?: string,
      revalidateType?: "page" | "layout"
   ): Promise<{
      data: any;
      error: any;
   }>;
} = async (
   method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
   model: string,
   body: object | null,
   query?: object,
   cache: "force-cache" | "no-cache" | "no-store" = "force-cache",
   revalidate?: number | null,
   id?: number | null,
   revalidatePath?: string,
   revalidateType?: "page" | "layout"
) => {
   const queryString = qs.stringify(query, {
      arrayFormat: "indices",
      encode: false,
      indices: false
   });

   try {
      const response = await fetch(`${apiUrl}/api/${model}/${id ? id : ""}?${queryString}`, {
         method,
         body: JSON.stringify(body),
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.STRAPI_AUTH_TOKEN}`
         },
         ...{
            ...(revalidate ? {} : { cache }),
            ...(revalidate
               ? {
                    next: {
                       revalidate: revalidate
                    }
                 }
               : {})
         }
      });

      if (!response.ok) {
         throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      if (revalidatePath && revalidateType) {
         userRevalidate(revalidatePath, revalidateType);
      }
      return { data, error: null };
   } catch (error: any) {
      console.error(`Error during API call: ${error.message}`);
      return {
         data: null,
         error: error.message || "An error occurred during data fetch"
      };
   }
};
