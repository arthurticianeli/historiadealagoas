
import React from 'react';
import { getAllCategories, getPostsByFilter } from 'src/hooks/useWpApi';
import { IPost } from 'src/interfaces/IPost';
import { ICategory } from 'src/interfaces/ICategory';
import BannerGrande from '../banner/bannerGrande';
import PostCover from './postCover';
import "./postCover.css";

const PostsDestaque: React.FC = async () => {
    console.log('PostsDestaque: Iniciando componente');
    console.log('PostsDestaque: NEXT_PUBLIC_API_URL =', process.env.NEXT_PUBLIC_API_URL);
    
    let posts: IPost[] = [];
    let categories: ICategory[] = [];
    
    try {
        console.log('PostsDestaque: Buscando posts...');
        posts = await getPostsByFilter({});
        console.log('PostsDestaque: Posts encontrados:', posts?.length ?? 0);
        
        console.log('PostsDestaque: Buscando categorias...');
        categories = await getAllCategories();
        console.log('PostsDestaque: Categorias encontradas:', categories?.length ?? 0);
    } catch (error) {
        console.error('PostsDestaque: Erro ao buscar dados:', error);
        posts = [];
        categories = [];
    }
    
    // Se não há posts suficientes, renderiza mensagem informativa
    if (!posts || posts.length < 6) {
        console.log('PostsDestaque: Posts insuficientes, renderizando fallback');
        return (
            <div className="container col-span-4 mb-4 text-center text-gray-500">
                <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
                    <p>Posts em carregamento... ({posts?.length ?? 0} de 6 necessários)</p>
                    <p className="text-sm mt-2">API URL: {process.env.NEXT_PUBLIC_API_URL ?? 'Não definida'}</p>
                </div>
            </div>
        );
    }
    
    console.log('PostsDestaque: Renderizando componente completo');
    return (
        <div className="container col-span-4 mb-4 grid grid-cols-4 gap-10">
            <div className="col-span-4 lg:col-span-3">
            <div className='hidden lg:block mb-5 lg:mb-10'>
                <BannerGrande position="topo-1" />
                </div>
                <PostCover post={posts[0]} categories={categories} />
            </div>
            <div className="col-span-4 lg:col-span-1">
                <div className="mb-5 lg:mb-10">
                    <PostCover post={posts[1]} categories={categories} />
                </div>
                <PostCover post={posts[2]} categories={categories} />
            </div>
            <div className="col-span-4 grid grid-cols-3 gap-10">
                <div className="col-span-3 lg:col-span-1">
                    <PostCover post={posts[3]} categories={categories} />
                </div>
                <div className="col-span-3 lg:col-span-1">
                    <PostCover post={posts[4]} categories={categories} />
                </div>
                <div className="col-span-3 lg:col-span-1">
                    <PostCover post={posts[5]} categories={categories} />
                </div>
            </div >
        </div >
    );
};

export default PostsDestaque;