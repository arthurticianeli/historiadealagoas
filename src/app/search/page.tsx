import LoadMorePosts from "@/app/components/posts/loadMorePosts";
import { getResultsBySearch } from "@/app/hooks/useWpApi";

export default async function SearchPage({ searchParams }: { readonly searchParams: Promise<{ readonly query: string }> }) {
    const query = (await searchParams).query;

    const initialPosts = await getResultsBySearch({ query: query, page: 1, perPage: 10 });

    return (
        <div className="px-5 md:p-0 md:max-w-[900px] mx-auto">
            <LoadMorePosts initialPosts={initialPosts} search={query} />
        </div>
    );
};