import Image from 'next/image';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import { RiStarFill, RiStarHalfLine } from 'react-icons/ri';

const Review = ({ data }: any) => {
  const { title, description, reviews } = data || {};

  return (
    <section className="pt-24 pb-14 sm:pb-16 px-5 sm:px-0 bg-success-content">
      <div className="container mx-auto sm:px-12">
        <div className="text-center">
          <h2 className="font-bold text-4xl text-neutral">{title}</h2>
          <p className="text-lg text-neutral md:w-[38%] w-full mx-auto mt-5">{description}</p>
        </div>

        <div className="relative pb-6">
          <button className="flex justify-center items-center absolute h-12 w-12 p-3 border border-primary rounded-full hover:bg-primary group ml-16 sm:ml-0 left-0 sm:-left-14  xl:-left-10 bottom-0 sm:top-28 xl:top-24 ">
            <HiOutlineArrowLeft className="text-2xl text-primary group-hover:text-white" />
          </button>

          <button className="flex justify-center items-center absolute rounded-full  border border-primary h-12 w-12 p-3 hover:bg-primary group mr-16 sm:mr-0 right-0 sm:-right-14 xl:-right-10 bottom-0 sm:top-28 xl:top-24 ">
            <HiOutlineArrowRight className="text-2xl text-primary group-hover:text-white" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14 sm:mx-5 pb-16 sm:pb-0">
            {reviews && (
              <>
                {reviews?.map((item: any, index: number) => {
                  return (
                    <div className="item py-4 px-1" key={index}>
                      <div className="p-7 bg-white rounded-2xl shadow-owlCard">
                        <p className="text-base text-base-300 mb-6">{item?.feedback}</p>

                        <div className="flex items-center gap-4">
                          <Image
                            src={item?.avatar?.data?.attributes?.formats?.small?.url || '/avatar/avatar.png'}
                            alt="feedback"
                            width={48}
                            height={48}
                          />

                          <div>
                            <h5 className="text-primary font-semibold text-lg">{item?.name}</h5>
                            <div className="flex gap-1">
                              <RiStarFill className="text-warning text-base" />
                              <RiStarFill className="text-warning text-base" />
                              <RiStarFill className="text-warning text-base" />
                              <RiStarFill className="text-warning text-base" />
                              <RiStarHalfLine className="text-warning text-base" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
