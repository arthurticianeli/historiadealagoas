import React from 'react';
import { getAllCategories, getPostsByFilter } from 'src/hooks/useWpApi';
import CarouselBannersResponsive from '../banner/carouselBannersResponsive';
import LoadMorePostsMain from './loadMorePostsMain';

const PostsMainList: React.FC = async () => {
    const categories = await getAllCategories();
    const initialPosts = await getPostsByFilter({});
    
    // Se não há posts suficientes, não renderiza
    if (!initialPosts || initialPosts.length <= 6) {
        return (
            <div>
                <CarouselBannersResponsive />
            </div>
        );
    }
    
    return (
        <div>
            <LoadMorePostsMain categories={categories} initialPosts={initialPosts.slice(6)} />
            <CarouselBannersResponsive />
        </div>
    );
};

export default PostsMainList;