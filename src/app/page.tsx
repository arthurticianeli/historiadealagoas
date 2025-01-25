import Link from "next/link";
import NewsSection from "./components/news/newsSection";
import PostCover from "./components/posts/postCover";
import { getAllCategories, getPostsByFilter } from "./hooks/useWpApi";
import { IPost } from "./interfaces/IPost";

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

  return (
    <div className="mx-auto md:max-w-[1200px] p-4">
      {/* Destaques e Notícias */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
        {/* Sessão de Destaque */}
        <div className="col-span-1 md:col-span-9 md:border-e-2 md:pe-10">
          <div className="grid grid-cols-1 gap-6 mb-5">
            <PostCover post={featuredPosts[0]} categories={categories} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <PostCover key={post.id} post={post} categories={categories} />
            ))}
          </div>
        </div>
        {/* Sessão de Notícias */}
        <div className="col-span-1 md:col-span-3">
          <NewsSection />
        </div>
      </div>

      {/* Listagem por Categorias */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {categories.map((category) => (
          <div key={category.id} className="mb-5 col-span-1 md:col-span-12">
            <Link href={`/categoria/${category.slug}`}>
              <div className="flex justify-between items-center mb-4 px-2 border-b-2">
                <h1 className="text-2xl font-bold md:p-0 uppercase title-category">{category.name}</h1>
                Ver mais
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
