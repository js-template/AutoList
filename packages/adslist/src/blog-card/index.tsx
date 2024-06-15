import PostCard from './post.';
const BlogCard = ({ data }: { data: any }) => {
  const { posts } = data || {};

  return (
    <section className="bg-success-content">
      <div className="py-24">
        <div className="container mx-auto">
          {/* {img.map((item, index) => ( */}
          {posts && posts?.data?.length > 0 && (
            <div className="grid grid-cols-6 gap-7 px-5 sm:px-0">
              {posts?.data?.map((item: unknown, index: number) => <PostCard item={item} key={index} />)}
            </div>
          )}

          {/* {blogData && !blogError && blogData.length == 0 && (
              <div className="grid grid-cols-1 gap-7 px-5 sm:px-0 text-center">
                <h3 className="text-3xl font-semibold pt-10 pb-40">
                  No Data Found
                </h3>
              </div>
            )} */}

          {/* <Pagination /> */}
        </div>
      </div>
    </section>
  );
};
export default BlogCard;
