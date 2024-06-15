'use server';
// @ts-ignore
import qs from 'qs';

const apiUrl = process.env.STRAPI_ENDPOINT || '';

/**
 * Function to get data by id
 * @param model  model name as like strapi model name `pages`, `messages`...
 * @param id  id of the data
 * @param query  query object to filter data
 * @param cache  cache type `force-cache`, `no-cache`, `no-store`
 * @param revalidate  revalidate time in seconds
 * @returns  {data, error}
 * @example
 * const { data, error } = await findOne("pages", 1, { filters: { slug: { $eq: "home" } } }, "force-cache", 60);
 */
export const findOne = async (
  model: string,
  id: number,
  query: any = {},
  cache: 'force-cache' | 'no-cache' | 'no-store' = 'force-cache',
  revalidate?: number,
) => {
  const queryString = qs.stringify(query, {
    arrayFormat: 'indices',
    encode: false,
    indices: false,
  });

  try {
    const response = await fetch(`${apiUrl}/api/${model}/${id}?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_AUTH_TOKEN}`,
      },
      ...{
        ...(revalidate ? {} : { cache }),
        ...(revalidate
          ? {
              next: {
                revalidate: revalidate,
              },
            }
          : {}),
      },
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
      error: error.message || 'An error occurred during data fetch',
    };
  }
};

/**
 * Function to get data
 * @param model  model name as like strapi model name `pages`, `messages`...
 * @param query  query object to filter data
 * @param cache  cache type `force-cache`, `no-cache`, `no-store`
 * @param revalidate  revalidate time in seconds
 * @returns  {data, error}
 * @example
 * const { data, error } = await find("pages", { filters: { slug: { $eq: "home" } } }, "force-cache", 60);
 */
export const find = async (
  model: string,
  query: any = {},
  cache: 'force-cache' | 'no-cache' | 'no-store' = 'force-cache',
  revalidate?: number,
) => {
  const queryString = qs.stringify(query, {
    arrayFormat: 'indices',
    encode: false,
    indices: false,
  });

  try {
    const response = await fetch(`${apiUrl}/api/${model}/?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_AUTH_TOKEN}`,
      },
      ...{
        ...(revalidate ? {} : { cache }),
        ...(revalidate
          ? {
              next: {
                revalidate: revalidate,
              },
            }
          : {}),
      },
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
      error: error.message || 'An error occurred during data fetch',
    };
  }
};
