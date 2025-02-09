
import { notFound } from "next/navigation";
import Chip from "src/components/chip/chip";
import Layout from "src/components/pagesLayout/layout";
import LoadMorePosts from "src/components/posts/loadMorePosts";
import { getAllCategories, getPostsByFilter } from "src/hooks/useWpApi";
import { ICategory } from "src/interfaces/ICategory";

export default async function CategoryPage({ params }: { readonly params: Promise<{ readonly categoria: string }> }) {
    const categoria = (await params).categoria;

    const categories = await getAllCategories();

    const category = categories.find((cat: ICategory) => cat.slug === categoria);

    if (!category?.id) notFound()

    const initialPosts = await getPostsByFilter({ categoryId: category.id, page: 1, perPage: 10 });

    return (
        <div className="px-5 md:p-0 md:max-w-[900px] mx-auto">
            <Layout>
                {category?.name && <Chip category={category.name} />}
                <LoadMorePosts initialPosts={initialPosts} categoryId={category.id} />
            </Layout>
        </div>
    );
};

