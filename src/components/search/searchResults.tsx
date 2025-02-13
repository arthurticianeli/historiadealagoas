"use client"

import React, { useEffect, useState } from 'react';
import PostList from "src/components/postList/postList";
import { getSearchByContent, getSearchByTitle } from 'src/hooks/useWpApi';
import { IPost } from "src/interfaces/IPost";

interface SearchResultsProps {
    search: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ search }) => {
    const [posts, setPosts] = useState<IPost[]>([] as IPost[]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [noMorePosts, setNoMorePosts] = useState(false);

    const loadPostsByTitle = async () => {
        setLoading(true);
        setNoMorePosts(false);

        const response = await getSearchByTitle({ query: search, page: page, perPage: 10 });

        if (!Array.isArray(response)) {
            loadPostsByContent();
            return;
        }

        if (Array.isArray(response)) {
            setPosts([...posts, ...response]);
        }

        if (response.length < 10) {
            loadPostsByContent();
        }

        setPage(page + 1);
        setLoading(false);
    };

    const loadPostsByContent = async () => {
        setLoading(true);
        setNoMorePosts(false);

        const response = await getSearchByContent({ query: search, page: page, perPage: 10 });

        if (!Array.isArray(response)) {
            setNoMorePosts(true);
            setLoading(false);
            return;
        }

        if (Array.isArray(response)) {
            setPosts(prevPosts => [...prevPosts, ...response]);
        }

        if (response.length < 10) {
            setNoMorePosts(true);
        }

        setPage(page + 1);
        setLoading(false);
    };

    useEffect(() => {
        setPosts([] as IPost[]);
        setPage(1);
        setNoMorePosts(false);
    }, [search]);

    useEffect(() => {
        if (page === 1) {
            loadPostsByTitle();
        }
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && !noMorePosts) {
                loadPostsByTitle();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, page]);

    return (
        <div>
            <ul>
                {posts?.map((post, index) => (
                    <PostList key={`${post.id}-${index}`} post={post} />
                ))}
            </ul>
            {loading && (
                <div className="flex justify-center items-center mt-4">
                    <div className="loader" />
                </div>
            )}
            {noMorePosts && posts.length > 0 && (
                <div className="flex justify-center items-center mt-4">
                    <p className="text-gray-700">Não há mais posts para carregar</p>
                </div>
            )}
            {
                !loading && posts.length === 0 && (
                    <div className="flex justify-center items-center my-10">
                        <p className="text-gray-700 text-4xl">Nenhum post encontrado para a busca: {search}</p>
                    </div>
                )
            }
        </div>
    );
};

export default SearchResults;