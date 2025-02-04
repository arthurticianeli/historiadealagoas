import { IPost } from '@/app/interfaces/IPost';
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import Chip from '../chip/chip';
import WpApiParser from '../wpApiParser/wpApiParser';
import './post.css';

interface PostCardProps {
    post: IPost;
    category: string;
}

const Post: React.FC<PostCardProps> = ({ post, category }) => {
    const formattedDate = post?.date ? format(new Date(post.date), 'dd/MM/yyyy') : '';


    return (
        <div className="w-100 mx-auto px-6 mb-4 max-w-[900px]">
            <Chip category={category} />
            <h2 className="text-4xl font-bold mb-2">{post?.title?.rendered}</h2>
            <p className="mb-2 text-xs">Publicado em {formattedDate} por Edberto Ticianeli</p>
            {post?.jetpack_featured_media_url && (
                <a href={post?.jetpack_featured_media_url} target="_blank" rel="noreferrer" >
                    <Image
                        src={post?.jetpack_featured_media_url}
                        alt={post?.title?.rendered}
                        className="mb-4 mx-auto"
                        width={700}
                        height={475}
                        style={{
                            height: "auto",
                            width: "100%",
                        }}
                    />
                </a>
            )
            }
            <div className="m-auto">
                <WpApiParser content={post?.content?.rendered} />
            </div>
        </div >
    );
};

export default Post;