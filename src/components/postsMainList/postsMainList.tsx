import React from 'react';
import { getAllCategories, getPostsByFilter } from 'src/hooks/useWpApi';
import { IPost } from 'src/interfaces/IPost';
import { ICategory } from 'src/interfaces/ICategory';
import CarouselBannersResponsive from '../banner/carouselBannersResponsive';
import LoadMorePostsMain from './loadMorePostsMain';

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
    
    // Se não há posts suficientes, renderiza apenas o carousel
    if (!initialPosts || initialPosts.length <= 6) {
        console.log('PostsMainList: Posts insuficientes, renderizando apenas carousel');
        return (
            <div>
                <div className="p-4 bg-blue-100 border border-blue-400 rounded mb-4">
                    <p className="text-center">Posts principais em carregamento... ({initialPosts?.length ?? 0} posts encontrados)</p>
                </div>
                <CarouselBannersResponsive />
            </div>
        );
    }
    
    console.log('PostsMainList: Renderizando componente completo');
    return (
        <div>
            <LoadMorePostsMain categories={categories} initialPosts={initialPosts.slice(6)} />
            <CarouselBannersResponsive />
        </div>
    );
};

export default PostsMainList;