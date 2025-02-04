"use client"

import PostList from "@/app/components/postList/postList";
import { getPostsByFilter, getResultsBySearch } from "@/app/hooks/useWpApi";
import { IPost } from "@/app/interfaces/IPost";
import React, { useEffect, useState } from 'react';

interface LoadMorePostsProps {
    initialPosts: IPost[];
    categoryId?: number;
    search?: string;
}

const LoadMorePosts: React.FC<LoadMorePostsProps> = ({ initialPosts, categoryId, search }) => {
    const [posts, setPosts] = useState(initialPosts);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(2);
    const [noMorePosts, setNoMorePosts] = useState(false);

    const loadMorePosts = async () => {
        setLoading(true);
        try {
            if (search) {
                const response = await getResultsBySearch({ query: search, page: page, perPage: 10 });
                setPosts([...posts, ...response]);
                setPage(page + 1);
                return;
            } else {
                const response = await getPostsByFilter({ categoryId: categoryId, page: page, perPage: 10 });
                setPosts([...posts, ...response]);
                setPage(page + 1);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.code === "rest_post_invalid_page_number") {
                setNoMorePosts(true);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && !noMorePosts) {
                loadMorePosts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, page]);

    return (
        <div>
            <ul>
                {posts.map(post => (
                    <PostList key={post.id} post={post} />
                ))}
            </ul>
            {loading && (
                <div className="flex justify-center items-center mt-4">
                    <div className="loader" />
                </div>
            )}
            {noMorePosts && (
                <div className="flex justify-center items-center mt-4">
                    <p className="text-gray-700">Não há mais posts para carregar</p>
                </div>
            )}
        </div>
    );
};

export default LoadMorePosts;