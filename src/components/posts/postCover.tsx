
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ICategory } from 'src/interfaces/ICategory';
import { IPost } from 'src/interfaces/IPost';
import Chip from '../chip/chip';
import "./postCover.css";

interface PostCardProps {
    post: IPost;
    categories: ICategory[];
}

const PostCover: React.FC<PostCardProps> = ({ post, categories }) => {
    // Proteção contra post undefined
    if (!post) {
        return <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">Post não encontrado</div>;
    }
    
    const category = categories?.find(category => category.id === post.categories?.[0])?.name ?? "";
    const options = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        replace: (domNode: any) => {
            if (domNode.name === 'a') {
                return <>{domToReact(domNode.children, options)}</>;
            }
        }
    };
    return (
        <Link href={`/${post.slug}`}>
            <Image
                src={post.jetpack_featured_media_url}
                alt="Imagem do Post"
                className="w-full rounded-md"
                width={1000}
                height={500}
                priority
                style={{
                    height: "auto",
                }}
            />
            {category &&
                <div className='mt-2'>
                    <Chip category={category} />
                </div>
            }
            <h2 className='text-lg lg:text-2xl font-bold leading-6 lg:leading-6'>
                {parse(post.title?.rendered ?? '')}
            </h2>
            {/* <div className="text-gray-600 leading-relaxed">{parse(post.excerpt?.rendered ?? '', options)}</div> */}
        </Link>
    );
};

export default PostCover;