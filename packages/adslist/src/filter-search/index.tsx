'use client';
import _ from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import AdsItem from '../ads-card/ads-item';
import { AdsCardLoader } from '../ads-card/loader';
import { find } from '../utils/strapi';
// @ts-ignore
import { getCookie } from 'cookies-next';
import Autocomplete from 'react-google-autocomplete';

interface FormData {
  searchText: string | null;
  category: string | null;
  condition: string | null;
  location: string | null;
  sort: string | null;
}

const SearchFilter = ({ data }: { data: any }) => {
  const direction = getCookie('direction');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [AdsCardData, setAdsCardData] = useState<[] | null>(null);

  const { title, description, button, search, filter } = data || {};

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [searchOptions, setSearchOptions] = useState({
    searchText: '',
    location: '',
    category: '',
    condition: '',
    sort: '',
  });

  const filterOptions = {
    category: watch('category'),
    condition: watch('condition'),
    sort: watch('sort'),
  };

  useEffect(() => {
    // Set form values when component mounts with existing search parameters
    const setSearchFormValues = () => {
      setValue('searchText', searchParams.get('search'));
      setValue('location', searchParams.get('location'));
      setValue('category', searchParams.get('category'));
      setValue('condition', searchParams.get('condition'));
      setValue('sort', searchParams.get('sort'));
      setSearchOptions({
        searchText: searchParams.get('search') || '',
        location: searchParams.get('location') || '',
        category: searchParams.get('category') || '',
        condition: searchParams.get('condition') || '',
        sort: searchParams.get('sort') || '',
      });
    };

    setSearchFormValues();
  }, [searchParams]);

  useEffect(() => {
    // Update URL when filter options change
    const updateFilterUrl = () => {
      const queryParams = [];

      // Include search options in the query string
      if (searchOptions.searchText) {
        queryParams.push(`search=${encodeURIComponent(searchOptions.searchText)}`);
      }

      if (searchOptions.location) {
        queryParams.push(`location=${encodeURIComponent(searchOptions.location)}`);
      }

      // Include filter options in the query string
      Object.entries(filterOptions).forEach(([key, value]) => {
        if (value) {
          queryParams.push(`${key}=${encodeURIComponent(value)}`);
        }
      });

      const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

      router.push(
        `/all-ads/${queryString}`,

        { scroll: false },
      );
    };

    updateFilterUrl();
  }, [searchOptions, filterOptions]);

  const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
    // Handle search and location logic
    setSearchOptions({
      ...searchOptions,
      // @ts-ignore
      searchText: data.searchText,
      // @ts-ignore
      location: data.location,
    });
  };

  useEffect(() => {
    const fetchAds = async () => {
      // Initialize an empty filters object
      const filters = {} as {
        [key: string]: any;
      };
      const Sort = {} as {
        [key: string]: any;
      };

      // Check if search parameters are available and add them to filters
      const search = searchParams.get('search');
      if (search) {
        // @ts-ignore
        filters.title = {
          $containsi: search,
        };
      }

      const condition = searchParams.get('condition');
      const category = searchParams.get('category');
      const sort = searchParams.get('sort');
      const location = searchParams.get('location');

      if (condition) {
        filters.condition = {
          $containsi: condition,
        };
      }
      if (category) {
        filters.category = {
          title: { $containsi: category },
        };
      }
      if (location) {
        filters.location = {
          $containsi: location,
        };
      }
      if (sort) {
        sort === 'price-asc'
          ? (Sort.price = 'asc')
          : sort === 'price-desc'
            ? (Sort.price = 'desc')
            : sort === 'date-asc'
              ? (Sort.createdAt = 'asc')
              : sort === 'date-desc'
                ? (Sort.createdAt = 'desc')
                : sort === 'title:asc'
                  ? (Sort.title = 'asc')
                  : sort === 'title:desc'
                    ? (Sort.title = 'desc')
                    : (Sort.createdAt = 'desc');
      }
      setAdsCardData(null);
      // Make the API call with the constructed filters object
      const { data, error } = await find(
        'manage-ads',
        {
          filters,
          populate: 'deep',
          publicationState: 'live',
          locale: ['en'],
          sort: {
            ...Sort,
          },
        },
        'no-cache',
      );

      if (data && !error) {
        setAdsCardData(data?.data);
      } else {
        setAdsCardData([]);
      }
    };

    fetchAds();
  }, [searchOptions]);

  // *** Switch case for filter options ***
  const getSortName = (option: string) => {
    switch (option) {
      case 'price-asc':
        return 'Price (Low to High)';
      case 'price-desc':
        return 'Price (High to Low)';
      case 'date-asc':
        return 'Date (Old to New)';
      case 'date-desc':
        return 'Date (New to Old)';
      case 'title-asc':
        return 'Title (A to Z)';
      case 'title-desc':
        return 'Title (Z to A)';
      default:
        return option;
    }
  };

  return (
    <section>
      {/* {!totalAdsData && !adsError &&
        < LoaderPage />
      } */}
      {/* <!-- search section --> */}
      <div className="bg-primary">
        <div className="container mx-auto">
          <div className="py-24 relative ">
            {title && (
              <h1 className="mb-12 font-bold text-2xl sm:text-4xl text-white text-center">Find Anything Around You</h1>
            )}
            {search && (
              <div className="absolute md:-bottom-24 lg:-bottom-9 left-0 right-0 w-fit sm:w-full rounded-lg mx-5 sm:m-auto">
                <div className="bg-white rounded w-full shadow-frontShadow max-w-4xl mx-auto">
                  <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
                    <div className="flex flex-wrap lg:flex-nowrap gap-3  p-3 rounded-lg w-full">
                      <div className="relative w-full">
                        <div className={`${direction === 'rtl' ? 'right-4' : 'left-4'} absolute top-4`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          className={`${
                            direction === 'rtl' ? 'pr-10' : 'pl-10'
                          } h-14 rounded-lg z-0 focus:outline-none border border-themeWhiteLight2 w-full pl-10`}
                          placeholder={search?.searchByWords}
                          defaultValue={searchOptions.searchText}
                          {...register('searchText')}
                        />
                      </div>

                      <div className="relative w-full">
                        <Autocomplete
                          className={`${
                            direction === 'rtl' ? 'pr-10' : 'pl-10'
                          } h-14 rounded-lg z-0 focus:outline-none border border-themeWhiteLight2 w-full ${
                            errors?.location && 'border-error'
                          }`}
                          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                          onPlaceSelected={(place: any) => {
                            setValue('location', place.formatted_address);
                            setSearchOptions({
                              ...searchOptions,
                              location: place.formatted_address,
                            });
                          }}
                          defaultValue={searchOptions.location}
                          placeholder={search?.searchByLocation}
                          {...register('location')}
                        />
                        <svg
                          className={`${
                            direction === 'rtl' ? 'right-4' : 'left-4'
                          }  h-4 w-4 absolute top-1/2 transform -translate-y-1/2`}
                          width="12"
                          height="18"
                          viewBox="0 0 12 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 0.875C2.90186 0.875 0.375 3.40186 0.375 6.5C0.375 7.37891 0.731446 8.38721 1.21484 9.48828C1.69824 10.5894 2.3208 11.7588 2.95312 12.8477C4.21777 15.0278 5.49219 16.8516 5.49219 16.8516L6 17.5938L6.50781 16.8516C6.50781 16.8516 7.78223 15.0278 9.04688 12.8477C9.6792 11.7588 10.3018 10.5894 10.7852 9.48828C11.2686 8.38721 11.625 7.37891 11.625 6.5C11.625 3.40186 9.09814 0.875 6 0.875ZM6 2.125C8.42432 2.125 10.375 4.07568 10.375 6.5C10.375 7.00049 10.1064 7.94775 9.65234 8.98047C9.19824 10.0132 8.5708 11.1582 7.95312 12.2227C6.97168 13.917 6.36133 14.813 6 15.3477C5.63867 14.813 5.02832 13.917 4.04688 12.2227C3.4292 11.1582 2.80176 10.0132 2.34766 8.98047C1.89355 7.94775 1.625 7.00049 1.625 6.5C1.625 4.07568 3.57568 2.125 6 2.125ZM6 5.25C5.30908 5.25 4.75 5.80908 4.75 6.5C4.75 7.19092 5.30908 7.75 6 7.75C6.69092 7.75 7.25 7.19092 7.25 6.5C7.25 5.80908 6.69092 5.25 6 5.25Z"
                            fill="#1A2B3A"
                          />
                        </svg>
                      </div>

                      <div className="relative w-full lg:w-3/12">
                        <button className="bg-secondary h-14 px-6 lg:px-2 2xl:px-6 rounded-lg text-white font-semibold text-base w-full whitespace-nowrap">
                          {search?.button}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-success-content py-44 md:py-36 lg:py-24">
        <div className="container mx-auto  px-5 sm:px-0">
          {/* <!-- filter section --> */}
          <div className="bg-white p-7 rounded-lg shadow-filterShadow">
            {/* <h1 className="text-neutral text-base md:text-2xl font-bold text-center">
              <span className="text-primary">{"00"}</span> Product
              {10 > 1 && <span>s</span>} Found
            </h1> */}

            {/* <hr className="mt-5 md:hidden" /> */}

            <div className="pt-6">
              <div className="grid lg:flex flex-wrap lg:flex-nowrap gap-5">
                <div className="flex items-center justify-between text-base-300 cursor-pointer grow-0 w-full md:w-auto">
                  {filter && (
                    <p
                      className={`${
                        direction === 'rtl' ? 'pl-5' : 'pr-5'
                      } text-neutral text-base md:text-xl font-bold whitespace-nowrap`}
                    >
                      {filter?.title}
                    </p>
                  )}
                  <svg
                    // onClick={() => close(!open)}
                    // className={`lg:hidden transition duration-300 ease-in-out ${
                    //   open ? 'text-primary' : 'text-base-300'
                    // }`}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.8327 0.666992H3.16602C2.50297 0.666992 1.86709 0.930384 1.39825 1.39923C0.929408 1.86807 0.666016 2.50395 0.666016 3.16699V4.14199C0.665896 4.48611 0.736821 4.82655 0.874349 5.14199V5.19199C0.992082 5.45947 1.15884 5.70254 1.36602 5.90866L6.49935 11.0087V16.5003C6.49907 16.6419 6.53488 16.7813 6.60341 16.9052C6.67194 17.0292 6.77092 17.1336 6.89102 17.2087C7.02363 17.2909 7.17666 17.3342 7.33268 17.3337C7.46313 17.3329 7.59158 17.3015 7.70768 17.242L11.041 15.5753C11.1784 15.5061 11.294 15.4001 11.3749 15.2692C11.4558 15.1383 11.4989 14.9875 11.4993 14.8337V11.0087L16.5993 5.90866C16.8065 5.70254 16.9733 5.45947 17.091 5.19199V5.14199C17.24 4.82902 17.3223 4.48848 17.3327 4.14199V3.16699C17.3327 2.50395 17.0693 1.86807 16.6004 1.39923C16.1316 0.930384 15.4957 0.666992 14.8327 0.666992ZM10.0743 10.0753C9.99711 10.1532 9.93601 10.2455 9.89454 10.3471C9.85307 10.4486 9.83205 10.5573 9.83268 10.667V14.317L8.16602 15.1503V10.667C8.16665 10.5573 8.14563 10.4486 8.10416 10.3471C8.06269 10.2455 8.00158 10.1532 7.92435 10.0753L3.50768 5.66699H14.491L10.0743 10.0753ZM15.666 4.00033H2.33268V3.16699C2.33268 2.94598 2.42048 2.73402 2.57676 2.57774C2.73304 2.42146 2.945 2.33366 3.16602 2.33366H14.8327C15.0537 2.33366 15.2657 2.42146 15.4219 2.57774C15.5782 2.73402 15.666 2.94598 15.666 3.16699V4.00033Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* <!-- Search Filters --> */}
                <div className={`w-full lg:block ${true ? 'block' : 'hidden'}`}>
                  <form className="w-full h-full" action="">
                    <div className="flex flex-wrap lg:flex-nowrap gap-6 grow">
                      {/* Category  */}
                      <select
                        className={`${
                          direction === 'rtl' ? 'pr-3 selectFormRtl' : 'pl-3 selectForm'
                        } py-3 text-base text-neutral appearance-none w-full border  rounded focus:outline-none cursor-pointer `}
                        {...register('category')}
                      >
                        <option value="">{filter?.filterByCategory || 'All Category'}</option>
                        {_.map(filter?.categories?.data, (item, index) => (
                          // @ts-ignore
                          <option key={index} value={item?.attributes?.title}>
                            {/* @ts-ignore */}
                            {item?.attributes?.title || 'Not Found'}
                          </option>
                        ))}
                      </select>

                      {/* Condition  */}
                      <select
                        className={`${
                          direction === 'rtl' ? 'pr-3 selectFormRtl' : 'pl-3 selectForm'
                        } selectForm py-3 text-base text-neutral appearance-none w-full border rounded focus:outline-none cursor-pointer`}
                        {...register('condition')}
                      >
                        <option value="">{filter?.filterByCondition || 'Condition'}</option>
                        {_.map(filter?.condition, (item, index) => (
                          <option key={index} value={item}>
                            {item || 'Not Found'}
                          </option>
                        ))}
                      </select>

                      {/* Sort */}
                      <select
                        className={`${
                          direction === 'rtl' ? 'pr-3 selectFormRtl' : 'pl-3 selectForm'
                        } selectForm py-3 text-base text-neutral appearance-none w-full border rounded focus:outline-none cursor-pointer`}
                        {...register('sort')}
                      >
                        <option value="">Sort</option>
                        {_.map(filter?.sort, (item, index) => (
                          <option key={index} value={item} className="capitalize">
                            {getSortName(item) || 'Not Found'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Loading skeleton */}
          {!AdsCardData && <AdsCardLoader />}
          {/* <!-- card section --> */}
          {AdsCardData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-7 mt-12">
              {AdsCardData.map((item: any, index: number) => (
                <AdsItem key={index} item={item} />
              ))}
            </div>
          )}
          {/* {AdsCardData && (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1  gap-7 mt-12 pb-40">
              <div className="text-center">Error </div>
            </div>
          )} */}
        </div>
        {AdsCardData && AdsCardData?.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-7 mt-12 text-center ">
            <h3 className="text-3xl font-semibold pt-10 pb-40">No Data Found</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchFilter;
