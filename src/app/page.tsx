import CarouselBanners from "./components/banner/carouselBanners";
import CarouselBannersResponsive from "./components/banner/carouselBannersResponsive";
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
          <div className="grid grid-span-12 lg:col-span-9 mb-4">
            <CarouselBanners banners={bannersMock} />
          </div>

          <div className="grid grid-span-12 lg:col-span-9 gap-10 mb-4">
            <PostCover post={postsDestaque[0]} categories={categories} />
          </div>

          <div className="grid grid-span-12 lg:grid-cols-2 gap-10">
            {postsDestaque.slice(1).map((post) => (
              <PostCover key={post.id} post={post} categories={categories} />
            ))}
          </div>
        </div>

        {/* Sessão de Notícias */}
        <NewsSection />
      </div>

      <CarouselBannersResponsive banners={banners} />


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