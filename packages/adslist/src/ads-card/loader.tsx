'use client';

import _ from 'lodash';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { MdOutlineLocationOn } from 'react-icons/md';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function AdsCardLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-7 mt-12">
      {_.map(Array(16), (item, index) => (
        <div
          className="shadow bg-white p-5 rounded-2xl hover:shadow-card transition ease-in-out duration-300"
          key={index}
        >
          <div className="relative">
            <Skeleton height={190} />
            <div className="absolute top-3 right-3 text-white text-sm rounded z-20">
              <SkeletonTheme baseColor="#2020201f" highlightColor="#f5f5f5">
                <Skeleton height={32} width={60} />
              </SkeletonTheme>
            </div>
          </div>
          <p className="text-xs font-normal text-base-300 pb-4 pt-5">
            <Skeleton width={60} />
          </p>
          <span className="border-b border-secondary-content block mb-3"></span>
          <h4 className="text-lg font-semibold text-neutral truncate">
            <a>
              <Skeleton />
            </a>
          </h4>
          <p className="flex items-center text-base-300 text-sm  pb-4 pt-1">
            <span className="mr-1.5">
              <MdOutlineLocationOn className="text-xl" />
            </span>
            <Skeleton width={100} />
          </p>
          <span className="border-b border-secondary-content block mb-4"></span>
          <div className="flex justify-between items-center">
            <h5 className="text-primary text-xl font-bold">
              <Skeleton height={25} width={40} />
            </h5>
            <Skeleton height={25} width={25} />
          </div>
        </div>
      ))}
    </div>
  );
}
