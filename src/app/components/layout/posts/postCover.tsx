
import { IPost } from '@/app/interfaces/IPost';
import { format } from 'date-fns';
import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PostCardProps {
    post: IPost;
}

const PostCover: React.FC<PostCardProps> = ({ post }) => {
    return (
        <Link href={`/${post.slug}`}>
            <div className="mx-auto bg-white border border-gray-200 shadow-md min-h-[480px] h-full">
                <Image
                    src={post.jetpack_featured_media_url}
                    alt="Imagem do Post"
                    className="w-fullobject-cover "
                    width={600}
                    height={300}
                    priority
                    style={{
                        objectFit: "scale-down",
                    }}
                />
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                        {parse(post.title.rendered)}
                    </h2>
                    <p className="text-base text-gray-500 my-2">
                        {`Publicado em ${format(new Date(post.date), 'dd/MM/yyyy')} por Edberto Ticianeli`}
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                </div>
            </div>
        </Link>
    );
};

export default PostCover;