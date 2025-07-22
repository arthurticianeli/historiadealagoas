'use client';

import React from 'react';
import { IPost } from 'src/interfaces/IPost';
import { ICategory } from 'src/interfaces/ICategory';
import LoadMorePostsMain from './loadMorePostsMain';
interface PostsMainListWrapperProps {
    categories: ICategory[];
    initialPosts: IPost[];
}

const PostsMainListWrapper: React.FC<PostsMainListWrapperProps> = ({ categories, initialPosts }) => {

    if (!initialPosts || initialPosts.length <= 6) {
        return (
            <div>
                <div className="p-4 bg-blue-100 border border-blue-400 rounded mb-4">
                    <p className="text-center">Posts principais em carregamento... ({initialPosts?.length ?? 0} posts encontrados)</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <LoadMorePostsMain categories={categories} initialPosts={initialPosts.slice(6)} />
        </div>
    );
};

export default PostsMainListWrapper;