import { JSX } from "react";
import Banner from "./components/banner/banner"; // Certifique-se de importar o componente Banner
import CategoryHeader from "./components/categoryHeader/categoryHeader";
import NewsSection from "./components/news/newsSection";
import PostCover from "./components/posts/postCover";
import { getAllCategories, getPostsByFilter, getPostsDestaques } from "./hooks/useWpApi";
import { IBanner } from "./interfaces/IBanner";
import { IPost } from "./interfaces/IPost";

const bannersMock: IBanner[] = [
  {
    title: "Banner 1",
    imageUrl: "https://i0.wp.com/www.historiadealagoas.com.br/wp-content/uploads/2020/08/paritura.png?resize=300%2C200&ssl=1",
  },
  {
    title: "Banner 2",
    imageUrl: "https://i0.wp.com/www.historiadealagoas.com.br/wp-content/uploads/2024/01/GIF-9-ANOS.gif?resize=300%2C250&ssl=1",
  },
  {
    title: "Banner 3",
    imageUrl: "https://i0.wp.com/www.historiadealagoas.com.br/wp-content/uploads/2022/11/ABC-das-Alagoas.jpg?resize=300%2C300&ssl=1",
  },


];

export default async function Home() {
  const categories = await getAllCategories();

  const bannerLength = bannersMock.length;
  const postsDestaqueCount = bannerLength + 4;
  const adjustedPostsDestaqueCount = postsDestaqueCount % 2 !== 0 ? postsDestaqueCount : postsDestaqueCount + 1;

  const postsDestaque = await getPostsDestaques(adjustedPostsDestaqueCount);

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

  // Função para intercalar banners com posts
  const interleavePostsAndBanners = (posts: IPost[], banners: IBanner[]) => {
    const result: JSX.Element[] = [];
    let bannerIndex = 0;

    posts.forEach((post) => {
      result.push(<PostCover key={`post-${post.id}`} post={post} categories={categories} />);

      // Insere um banner após cada post, se houver banners disponíveis
      if (banners.length > 0 && bannerIndex < banners.length) {
        result.push(
          <div key={`banner-${bannerIndex}`} className="max-w-[300px] mx-auto">
            <Banner title={banners[bannerIndex].title} imageUrl={banners[bannerIndex].imageUrl} />
          </div>
        );
        bannerIndex++;
      }
    });

    // Adiciona os banners restantes
    while (bannerIndex < banners.length) {
      result.push(
        <div key={`banner-${bannerIndex}`} className="max-w-[300px] mx-auto">
          <Banner title={banners[bannerIndex].title} imageUrl={banners[bannerIndex].imageUrl} />
        </div>
      );
      bannerIndex++;
    }

    return result;
  };
  return (
    <div className="mx-auto md:max-w-[1200px] px-4">
      {/* Destaques e Notícias */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
        {/* Sessão de Destaque */}
        <div className="col-span-1 md:col-span-9 md:border-e-2 md:pe-10">
          {/* Destaque principal */}
          <div className="grid grid-cols-1 gap-6 mb-5">
            <PostCover post={postsDestaque[0]} categories={categories} />
          </div>

          {/* Carrossel em telas menores que md */}
          <div className="md:hidden flex overflow-x-auto space-x-4">
            <NewsSection carousel />
          </div>

          {/* Destaques secundários intercalados com banners em telas menores que md */}
          <div className="md:hidden grid grid-cols-1 gap-6">
            {interleavePostsAndBanners(postsDestaque.slice(1), bannersMock)}
          </div>

          {/* Destaques secundários em telas maiores que md */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {postsDestaque.slice(1).map((post) => (
              <PostCover key={post.id} post={post} categories={categories} />
            ))}
          </div>
        </div>

        {/* Sessão de Notícias */}
        <div className="col-span-1 md:col-span-3 md:order-none mb-6 md:mb-0">
          <div className="hidden md:block">
            <NewsSection banners={bannersMock} />
          </div>
        </div>
      </div>

      {/* Listagem por Categorias */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {categories.map((category) => (
          <div key={category.id} className="mb-5 col-span-1 md:col-span-12">
            <CategoryHeader category={category} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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