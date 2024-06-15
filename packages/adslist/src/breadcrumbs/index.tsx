'use server';

const BreadCrumbs = async ({ data }: any) => {
  const { title } = data || {};
  return (
    <div className="bg-primary">
      <div className="container mx-auto">
        <div className="py-28 relative ">
          {title && <h1 className="font-bold text-2xl sm:text-4xl text-white text-center">{title}</h1>}
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
