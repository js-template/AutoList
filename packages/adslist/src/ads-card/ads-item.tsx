'use client';
import Link from 'next/link';

import { MdOutlineLocationOn } from 'react-icons/md';

import _ from 'lodash';

import Image from 'next/image';
import { HiOutlineBadgeCheck } from 'react-icons/hi';

const AdsItem = ({ item }: { item: any }) => {
  const Photos = item?.attributes?.featuredImage;
  const previewImage = _.get(
    Photos,
    `data.attributes.formats.thumbnail.url` ||
      `data.attributes.formats.large.url` ||
      `data[0].attributes.formats.thumbnail.url` ||
      `data[0].attributes.formats.large.url`,
    null,
  );

  return (
    <div className="shadow-owlCard bg-white p-5 rounded-2xl hover:shadow-card transition ease-in-out duration-300 group">
      <div className="relative ">
        <Link href={item ? (item?.attributes?.slug ? `/ads/${item?.attributes?.slug}` : '#') : '#'}>
          {Photos && previewImage && (
            <div className="relative w-full h-56 overflow-hidden rounded-lg">
              <Image
                src={previewImage}
                alt="ads-gallery"
                className="mb-5 w-full group-hover:scale-110 transition duration-300 ease-in-out object-cover object-center"
                fill={true}
                quality={100}
              />
            </div>
          )}
          {Photos && !previewImage && (
            <div className="relative w-full h-56 overflow-hidden rounded-lg">
              <Image
                src={`/avatar.png`}
                alt="ads-gallery"
                className="mb-5 w-full group-hover:scale-110 transition duration-300 ease-in-out object-cover object-center"
                fill={true}
                quality={100}
              />
            </div>
          )}

          {item.status?.isFeatured && (
            <div className="absolute top-3 right-3 bg-primary py-1 px-2 text-white text-sm rounded">Featured</div>
          )}
        </Link>
      </div>
      <p className="text-xs font-normal text-base-300 pb-4 pt-5">{item?.attributes?.condition ?? 'N/A'}</p>
      <span className="border-b border-secondary-content block mb-3"></span>
      <h4 className="text-lg font-semibold text-neutral truncate">
        <Link
          href={item ? (item?.attributes?.slug ? `/ads/${item?.attributes?.slug}` : '#') : '#'}
          className="hover:text-primary transition duration-300 ease-in-out line-clamp-1"
        >
          {item?.attributes?.title}
        </Link>
      </h4>
      <p className="flex items-center text-base-300 text-sm  pb-4 pt-1">
        <span className="mr-1.5">
          <MdOutlineLocationOn className="text-xl" />
        </span>
        <span className="line-clamp-1">{item?.attributes?.location?.description ?? 'Location not available'}</span>
      </p>
      <span className="border-b border-secondary-content block mb-4"></span>
      <div className="flex justify-between items-center">
        <h5 className={`text-xl font-bold ${item?.loding ? 'text-base-300' : 'text-primary'}`}>
          {<span>$ </span>}
          {/* {item?.priceDetails?.currency == "EUR" && <span>€</span>}
          {item?.priceDetails?.currency == "GBP" && <span>£</span>} */}

          {item?.attributes?.price ?? '00'}
        </h5>

        <button className="text-info-content text-2xl">
          <HiOutlineBadgeCheck />
        </button>
      </div>
    </div>
  );
};

export default AdsItem;
