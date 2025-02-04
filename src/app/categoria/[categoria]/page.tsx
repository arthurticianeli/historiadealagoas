import Chip from "@/app/components/chip/chip";
import LoadMorePosts from "@/app/components/posts/loadMorePosts";
import { getAllCategories, getPostsByFilter } from "@/app/hooks/useWpApi";
import { ICategory } from "@/app/interfaces/ICategory";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { readonly params: Promise<{ readonly categoria: string }> }) {
    const categoria = (await params).categoria;

    const categories = await getAllCategories();

    const category = categories.find((cat: ICategory) => cat.slug === categoria);

    if (!category?.id) notFound()

    const initialPosts = await getPostsByFilter({ categoryId: category.id, page: 1, perPage: 10 });

    return (
        <div className="px-5 md:p-0 md:max-w-[900px] mx-auto">
            {category?.name && <Chip category={category.name} />}
            <LoadMorePosts initialPosts={initialPosts} categoryId={category.id} />
        </div>
    );
};

