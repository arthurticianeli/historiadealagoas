
import SearchResults from "../components/search/searchResults";

export default async function SearchPage({ searchParams }: { readonly searchParams: Promise<{ readonly query: string }> }) {
    const query = (await searchParams).query;

    return (
        <div className="px-5 md:p-0 md:max-w-[900px] mx-auto">
            <SearchResults search={query} />
        </div>
    );
};