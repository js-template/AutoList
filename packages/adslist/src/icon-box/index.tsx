import { cookies } from 'next/headers';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';
import IconComponent from '../utils/react.icon';

interface IconBoxProps {
  data: {
    title: string;
    description: string;
    categories: any;
    button: {
      label: string;
    };
  };
}

const IconBox = ({ data }: IconBoxProps) => {
  const cookieStore = cookies();
  const direction = cookieStore.get('direction')?.value || 'ltr';

  const { title, description, categories, button } = data || {};

  return (
    <section className="py-28 bg-primary/5 px-5 sm:px-0">
      <div className="container mx-auto">
        <div className="text-center">
          {title && <h2 className="font-bold text-4xl text-neutral">{title}</h2>}
          {description && <p className="text-lg text-neutral md:w-[38%] w-full mx-auto mt-5">{description}</p>}
        </div>

        {/* Main category display here */}
        {
          <div className="grid grid-cols-2 gap-4 sm:gap-7 md:grid-cols-3 mt-14">
            {categories &&
              categories?.data?.map((item: any, index: number) => {
                return (
                  <Link href={`/all-ads?category=${encodeURIComponent(item?.attributes?.title)}` || '#'} key={index}>
                    <div className="group sm:flex items-center justify-between bg-white border border-base-content/10 py-8 px-7 md:px-3 lg:px-7 rounded-2xl shadow-owlCard transition-all duration-300 ease-in-out hover:bg-primary cursor-pointer">
                      <div className="flex items-center flex-col sm:flex-row">
                        <div
                          className={`${
                            direction === 'rtl' ? 'pl-2 md:pl-4 lg:pl-7' : 'pr-2 md:pr-4 lg:pr-7'
                          } text-primary group-hover:text-white transition duration-300 ease-in-out `}
                        >
                          <IconComponent
                            icon={item?.attributes?.icon}
                            size={44}
                            className={`${direction === 'rtl' ? 'transform scale-x-[-1]' : ''}`}
                          />
                        </div>
                        <div className="pt-1 sm:pt-0">
                          <h5 className="text-themeBlackLight text-base sm:text-lg font-semibold group-hover:text-white transition duration-300 ease-in-out ">
                            {item?.title || item?.attributes?.title}
                          </h5>
                          <p className="text-xs sm:text-sm text-base-300 group-hover:text-white transition duration-300 ease-in-out whitespace-nowrap sm:whitespace-normal">
                            {item?.description || item?.attributes?.description}
                          </p>
                        </div>
                      </div>

                      <div className="border border-accent-content w-9 h-9 lg:w-11 lg:h-11 group-hover:border-white sm:flex items-center justify-center rounded-full hidden">
                        <HiOutlineArrowRight
                          className={`${
                            direction === 'rtl' ? 'rotate-180' : ''
                          } h-6 w-6 text-primary group-hover:text-white`}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        }
        {button && (
          <div className="mt-14 text-center">
            <Link href="/all-ads">
              <button className="bg-secondary rounded-md text-white px-8 h-14">{button?.label}</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default IconBox;
