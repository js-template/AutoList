'use client';
import _ from 'lodash';
import Link from 'next/link';
import AdsItem from './ads-item';

const AdsCard = ({ data }: any) => {
  const { title, description, button, showAds } = data || {};

  return (
    <section className="bg-gradient-to-b from-white to-primary/10 py-28 px-5 sm:px-0">
      <div className="container mx-auto">
        <div className="text-center">
          {title && <h2 className="font-bold text-4xl text-neutral">{title}</h2>}
          {description && <p className="text-lg text-neutral lg:w-[38%] w-full mx-auto mt-5">{description}</p>}
        </div>

        {showAds && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-7 mt-12 ">
            {_.map(showAds?.data, (item, index) => (
              <AdsItem key={index} item={item} />
            ))}
          </div>
        )}

        {button && (
          <div className="mt-14 text-center">
            <Link href={button?.link || '#'} target={button?.target} rel="noopener noreferrer">
              <button className="bg-secondary rounded-md text-white w-[200px] h-14">{button?.label}</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdsCard;
