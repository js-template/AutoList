import _ from 'lodash';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

const PostCard = ({ item }: any) => {
  const cookieStore = cookies();
  const direction = cookieStore.get('direction')?.value || 'ltr';

  const Photos = item?.attributes?.featuredImage;
  const previewImage = _.get(Photos, 'data.attributes.formats.large.url', null);
  return (
    <div
      key={item?.id}
      className="col-span-6 md:col-span-3 lg:col-span-2 bg-white p-5 rounded-2xl transition duration-500 ease-in-out hover:shadow-card group"
    >
      <Link
        href={item?.attributes?.slug ? `/blog/${item?.attributes?.slug}` : '#'}
        className="h-56 w-full relative block overflow-hidden rounded-lg mb-3"
      >
        <Image
          className="group-hover:scale-110 transition duration-300 ease-in-out object-cover object-center w-full h-full"
          src={previewImage || '/avatar.png'}
          fill={true}
          alt="blog"
        />
      </Link>
      <h1 className="text-lg sm:text-xl text-neutral font-bold text-ellipsis overflow-hidden max-h-14 transition duration-300 ease-in-out hover:text-primary">
        <Link href={item?.attributes?.slug ? `/blog/${item?.attributes?.slug}` : '#'}>{item?.attributes?.title}</Link>
      </h1>
      <div className="text-base text-base-300 pt-3 text-ellipsis overflow-hidden max-h-28">
        <div
          dangerouslySetInnerHTML={{
            __html: item?.attributes?.excerpt,
          }}
        />
      </div>
      <Link href={item?.attributes?.slug ? `/blog/${item?.attributes?.slug}` : '#'}>
        <button className="flex items-center gap-4 pt-2 group">
          <span className="text-base font-semibold text-primary group-hover:opacity-70 transition duration-300 ease-in-out">
            Read More
          </span>
          <svg
            className={`${
              direction === 'rtl' ? 'rotate-180' : ''
            } group-hover:opacity-70 transition duration-300 ease-in-out`}
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.69922 11.7617L15.0117 6.44922L15.4414 6L15.0117 5.55078L9.69922 0.238282L8.80078 1.13672L13.0391 5.375L0.499999 5.375L0.5 6.625L13.0391 6.625L8.80078 10.8633L9.69922 11.7617Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default PostCard;
