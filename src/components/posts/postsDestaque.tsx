
import React from 'react';
import { getAllCategories, getPostsByFilter } from 'src/hooks/useWpApi';
import { IPost } from 'src/interfaces/IPost';
import { ICategory } from 'src/interfaces/ICategory';
import PostCover from './postCover';
import "./postCover.css";
import NewsSection from '../news/newsSection';

const PostsDestaque: React.FC = async () => {

    let posts: IPost[] = [];
    let categories: ICategory[] = [];

    try {
        posts = await getPostsByFilter({});
        categories = await getAllCategories();
    } catch (error) {
        console.error('PostsDestaque: Erro ao buscar dados:', error);
        posts = [];
        categories = [];
    }

    // Se não há posts suficientes, renderiza mensagem informativa
    if (!posts || posts.length < 6) {
        return (
            <div className="container col-span-4 mb-4 text-center text-gray-500">
                <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
                    <p>Posts em carregamento... ({posts?.length ?? 0} de 6 necessários)</p>
                    <p className="text-sm mt-2">API URL: {process.env.NEXT_PUBLIC_API_URL ?? 'Não definida'}</p>
                </div>
            </div>
        );
    }

    return (
     
            <div className="container col-span-4 grid grid-cols-4">
                <div className="col-span-4 lg:col-span-3 bg-gray-100 rounded-md p-5 lg:p-10 pb-5">
                    <PostCover post={posts[0]} categories={categories} />
                    <div className="col-span-4 grid grid-cols-3 gap-5 mt-6">
                        <div className="col-span-3 lg:col-span-1">
                            <PostCover post={posts[1]} categories={categories} />
                        </div>
                        <div className="col-span-3 lg:col-span-1">
                            <PostCover post={posts[2]} categories={categories} />
                        </div>
                        <div className="col-span-3 lg:col-span-1">
                            <PostCover post={posts[3]} categories={categories} />
                        </div>
                    </div >
                </div>
                <NewsSection />
            </div>
  
    );
};

export default PostsDestaque;