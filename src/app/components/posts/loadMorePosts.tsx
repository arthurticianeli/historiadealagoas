"use client"

import PostList from "@/app/components/postList/postList";
import { getPostsByFilter } from "@/app/hooks/useWpApi";
import { IPost } from "@/app/interfaces/IPost";
import React, { useEffect, useState } from 'react';

interface LoadMorePostsProps {
    initialPosts: IPost[];
    categoryId: number;
}

const LoadMorePosts: React.FC<LoadMorePostsProps> = ({ initialPosts, categoryId }) => {
    const [posts, setPosts] = useState(initialPosts);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(2);

    const loadMorePosts = async () => {
        setLoading(true);
        try {
            const response = await getPostsByFilter({ categoryId: categoryId, page: page, perPage: 10 });
            setPosts([...posts, ...response]);
            setPage(page + 1);
        } catch (error) {
            console.error('Erro ao carregar mais posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
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
                <div className="flex justify-center items-center mt-5">
                    <div className="loader" />
                </div>
            )}
        </div>
    );
};

export default LoadMorePosts;