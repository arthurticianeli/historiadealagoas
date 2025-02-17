"use client"

import React, { useEffect, useState } from 'react';
import { getPostsByFilter } from 'src/hooks/useWpApi';
import { ICategory } from 'src/interfaces/ICategory';
import { IPost } from "src/interfaces/IPost";
import Button from '../button/button';
import PostCover from '../posts/postCover';

interface ComponentProps {
    initialPosts: IPost[];
    categories: ICategory[];
}

const LoadMorePostsMain: React.FC<ComponentProps> = ({ categories, initialPosts }) => {
    const [posts, setPosts] = useState<IPost[]>(initialPosts);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(2);
    const [noMorePosts, setNoMorePosts] = useState(false);

    const loadMorePosts = async () => {
        setLoading(true);
        try {
            const response = await getPostsByFilter({ page: page, perPage: 10 });
            setPosts([...posts, ...response]);
            setPage(page + 1);
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
        setNoMorePosts(false);
    }, [initialPosts]);


    return (
        <>
            <div className="container grid grid-cols-4 gap-10  mt-5 lg:mt-10">
                {posts.map((post) => (
                    <div key={post.id} className="col-span-4 lg:col-span-2">
                        <PostCover post={post} categories={categories} />
                    </div>
                ))}
            </div>
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
            {!noMorePosts && !loading && (
                <div className="flex justify-center items-center mt-4">
                    <Button type='button' onClick={loadMorePosts} className="btn btn-primary">Mostrar Mais</Button>
                </div>
            )}
        </>
    );
};

export default LoadMorePostsMain;