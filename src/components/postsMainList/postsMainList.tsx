import React from 'react';
import { getAllCategories, getPostsByFilter } from 'src/hooks/useWpApi';
import { IPost } from 'src/interfaces/IPost';
import { ICategory } from 'src/interfaces/ICategory';
import PostsMainListWrapper from './postsMainListWrapper';

const PostsMainList: React.FC = async () => {
    console.log('PostsMainList: Iniciando componente');
    
    let categories: ICategory[] = [];
    let initialPosts: IPost[] = [];
    
    try {
        console.log('PostsMainList: Buscando categorias...');
        categories = await getAllCategories();
        console.log('PostsMainList: Categorias encontradas:', categories?.length ?? 0);
        
        console.log('PostsMainList: Buscando posts...');
        initialPosts = await getPostsByFilter({});
        console.log('PostsMainList: Posts encontrados:', initialPosts?.length ?? 0);
    } catch (error) {
        console.error('PostsMainList: Erro ao buscar dados:', error);
    }
    
    console.log('PostsMainList: Renderizando wrapper');
    return (
        <PostsMainListWrapper categories={categories} initialPosts={initialPosts} />
    );
};

export default PostsMainList;