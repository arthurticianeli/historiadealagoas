import React from 'react';
import { getAllCategories, getPostsByFilter } from 'src/hooks/useWpApi';
import { IPost } from 'src/interfaces/IPost';
import { ICategory } from 'src/interfaces/ICategory';
import PostsMainListWrapper from './postsMainListWrapper';

const PostsMainList: React.FC = async () => {

    let categories: ICategory[] = [];
    let initialPosts: IPost[] = [];
    
    try {
        categories = await getAllCategories();
        initialPosts = await getPostsByFilter({});

    } catch (error) {
        console.error('PostsMainList: Erro ao buscar dados:', error);
    }

    return (
        <PostsMainListWrapper categories={categories} initialPosts={initialPosts} />
    );
};

export default PostsMainList;