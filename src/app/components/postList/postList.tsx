import { IPost } from '@/app/interfaces/IPost';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PostListProps {
    post: IPost;
}

const PostList: React.FC<PostListProps> = ({ post }) => {

    if (!post) return null;

    const options = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        replace: (domNode: any) => {
            if (domNode.name === 'a') {
                return <>{domToReact(domNode.children, options)}</>;
            }
        }
    };

    return (
        <Link href={`/${post.slug}`} >
            <div className="block sm:flex border-b-2 border-gray-200 p-5 hover-link">
                <Image
                    src={post?.jetpack_featured_media_url}
                    alt={post?.title?.rendered}
                    width={300}
                    height={150}
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                    className="sm:mr-5 sm:max-w-[300px] sm:max-h-[150px]"
                />
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">{parse(post?.title?.rendered)}</h2>
                    {parse(post.excerpt.rendered, options)}
                </div>
            </div>
        </Link>
    );
};

export default PostList;