import Link from "next/link";

const Logo = () => {
   return (
      <Link href='/'>
         <p className='text-themeBlackLight font-bold text-2xl'>
            Meta <span className='text-primary'>Ads</span>
         </p>
      </Link>
   );
};
export default Logo;
