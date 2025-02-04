import Banner from "./components/banner/banner";
import CarouselBanners from "./components/banner/carouselBanners";
import CategoryHeader from "./components/categoryHeader/categoryHeader";
import NewsSection from "./components/news/newsSection";
import PostCover from "./components/posts/postCover";
import { getAllCategories, getBanners, getPostsByFilter, getPostsDestaques } from "./hooks/useWpApi";
import { IPost } from "./interfaces/IPost";
import { bannersMock } from "./layout";

export default async function Home() {
  const categories = await getAllCategories();
  const banners = await getBanners();

  const postsDestaque = await getPostsDestaques(3);

  // Contar posts por categoria no array postsDestaque
  const postsDestaqueCountByCategory = categories.reduce((acc: { [key: number]: number }, category) => {
    acc[category.id] = postsDestaque.filter(post => post.categories.includes(category.id)).length;
    return acc;
  }, {});

  const postsByCategory = await categories?.reduce(async (accPromise, category) => {
    const acc = await accPromise;
    const offset = postsDestaqueCountByCategory[category.id] || 0;
    const posts: IPost[] = (await getPostsByFilter({ categoryId: category.id, page: 1, perPage: 3, offset })) || [];
    acc[category.name] = posts;
    return acc;
  }, Promise.resolve({} as { [key: string]: IPost[] }));

  return (
    <div className="mx-auto lg:max-w-[1400px] px-4">
      <div className="grid grid-cols-12 gap-10 my-4">
        <div className="col-span-12 lg:col-span-9 gap-6">
          {/* Destaque principal */}
          <CarouselBanners banners={bannersMock} />

          <div className="grid grid-span-12 lg:col-span-9 gap-6 mb-4">
            <PostCover post={postsDestaque[0]} categories={categories} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {postsDestaque.slice(1).map((post) => (
              <PostCover key={post.id} post={post} categories={categories} />
            ))}
          </div>
        </div>

        {/* Sessão de Notícias */}
        <div className="col-span-12 lg:col-span-3 mb-6 lg:mb-0">
          <div className="hidden lg:block">
            <NewsSection banners={banners} />
          </div>
        </div>

      </div>
      <div className="grid grid-cols-12 col-span-12 my-4 gap-6">
        {banners.map((banner, index) => (
          <div key={`banner-${index}`} className="col-span-3">
            <Banner title={banner.title} imageUrl={banner.imageUrl} />
          </div>
        ))}
      </div>

      {/* Listagem por Categorias */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {categories.map((category) => (
          <div key={category.id} className="mb-4 col-span-1 lg:col-span-12">
            <CategoryHeader category={category} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {postsByCategory[category.name]?.map((post: IPost) => (
                <PostCover key={post.id} post={post} categories={categories} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}