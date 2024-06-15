'use server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Search from '../search';

const Banner = async ({ data }: any) => {
  const cookieStore = cookies();
  const direction = cookieStore.get('direction')?.value || 'ltr';

  const { title, description, image, style, search } = data || {};
  const blockImage = image?.data?.attributes?.formats?.small?.url;

  const finalCSS = twMerge(
    'relative bg-gradient-to-b from-white to-primary/10 overflow-hidden pt-12 xl:pt-0',
    style?.section?.className,
  );

  return (
    <section className={finalCSS}>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 items-center justify-between z-20 relative px-5 sm:px-0">
          <div className={`col-span-2 lg:col-span-1 w-full`}>
            {title && (
              <h1
                className={`text-3xl lg:text-5xl text-neutral mt-16 mb-7  font-bold text-center ${
                  direction === 'rtl' ? 'sm:text-right' : 'sm:text-left'
                }`}
              >
                {title}
              </h1>
            )}
            {description && <p className="text-base-300 text-lg lg:text-xl pb-11">{description}</p>}
            <Search SearchData={search} direction={direction} />
          </div>

          <div className="col-span-1 hidden lg:block lg:mt-20 xl-mt-0">
            <Image
              src={blockImage}
              width={826}
              height={840}
              alt="Header Image"
              className={direction === 'rtl' ? 'transform scale-x-[-1]' : ''}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
