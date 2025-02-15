
import React from 'react';
import { getAllCategories, getPostsByFilter } from 'src/hooks/useWpApi';
import { bannersMockMaior } from 'src/mocks/bannersMocks';
import CarouselBanners from '../banner/carouselBanners';
import PostCover from './postCover';
import "./postCover.css";



const PostsDestaque: React.FC = async () => {
    const posts = await getPostsByFilter({});
    const categories = await getAllCategories();
    return (
        <div className="container col-span-4 mb-4 grid grid-cols-4 gap-10">
            <div className="col-span-4 lg:col-span-3">
                <div className='mb-10'>
                    <CarouselBanners banners={bannersMockMaior} />
                </div>
                <PostCover post={posts[0]} categories={categories} />
            </div>
            <div className="col-span-4 lg:col-span-1">
                <div className="mb-10">
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