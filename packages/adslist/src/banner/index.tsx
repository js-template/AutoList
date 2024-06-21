'use server';
import { cookies } from 'next/headers';
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
        <div className="z-20 relative px-5 sm:px-0">
          <div className={'w-full text-center py-24'}>
            <div className="max-w-2xl mx-auto">
              {title && <h1 className={`text-3xl lg:text-5xl text-neutral mb-7 font-bold text-center`}>{title}</h1>}
            </div>
            <div className="max-w-3xl mx-auto">
              {description && <p className="text-base-300 text-lg lg:text-xl pb-11">{description}</p>}
            </div>
            <Search SearchData={search} direction={direction} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
