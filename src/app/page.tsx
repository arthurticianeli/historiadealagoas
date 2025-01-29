import Link from "next/link";
import { JSX } from "react";
import Banner from "./components/banner/banner"; // Certifique-se de importar o componente Banner
import NewsSection from "./components/news/newsSection";
import PostCover from "./components/posts/postCover";
import { getAllCategories, getPostsByFilter } from "./hooks/useWpApi";
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

  const postsByCategory = await Promise.all(
    categories?.map(async (category) => {
      const posts: IPost[] = (await getPostsByFilter({ categoryId: category.id, page: 1, perPage: 3 })) || [];
      return { [category.name]: posts };
    })
  );

  const posts = postsByCategory.reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const featuredPosts = categories
    .flatMap((category) => posts[category.name] || [])
    .slice(0, 6);

  // Remover posts destacados das categorias originais
  const remainingPosts = { ...posts };
  featuredPosts.forEach((post) => {
    Object.keys(remainingPosts).forEach((categoryName) => {
      remainingPosts[categoryName] = remainingPosts[categoryName]?.filter((p) => p.id !== post.id);
    });
  });

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

    return result;
  };

  return (
    <div className="mx-auto md:max-w-[1200px] p-4">
      {/* Destaques e Notícias */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
        {/* Sessão de Destaque */}
        <div className="col-span-1 md:col-span-9 md:border-e-2 md:pe-10">
          {/* Destaque principal */}
          <div className="grid grid-cols-1 gap-6 mb-5">
            <PostCover post={featuredPosts[0]} categories={categories} />
          </div>

          {/* Carrossel em telas menores que md */}
          <div className="md:hidden flex overflow-x-auto space-x-4">
            <NewsSection carousel />
          </div>

          {/* Destaques secundários intercalados com banners em telas menores que md */}
          <div className="md:hidden">
            {interleavePostsAndBanners(featuredPosts.slice(1), bannersMock)}
          </div>

          {/* Destaques secundários em telas maiores que md */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {featuredPosts.slice(1).map((post) => (
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
            <Link href={`/categoria/${category.slug}`}>
              <div className="flex justify-between items-center mb-4 px-2 border-b-2 title-container">
                <h1 className="text-2xl font-bold md:p-0 uppercase title-category">{category.name}</h1>
                <div className="text-sm text-gray-400">Ver mais</div>
              </div>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {remainingPosts[category.name]?.map((post) => (
                <PostCover key={post.id} post={post} categories={categories} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}