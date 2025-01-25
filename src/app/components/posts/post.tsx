import { IPost } from '@/app/interfaces/IPost';
import { format } from 'date-fns';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';
import React from 'react';
import Chip from '../chip/chip';
import './post.css';

interface PostCardProps {
    post: IPost;
    category: string;
}

const Post: React.FC<PostCardProps> = ({ post, category }) => {
    const formattedDate = post?.date ? format(new Date(post.date), 'dd/MM/yyyy') : '';

    const options = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        replace: (domNode: any) => {
            if (domNode.name === 'div' && domNode.attribs?.style) {
                const { style, class: className, ...restAttribs } = domNode.attribs; // eslint-disable-line @typescript-eslint/no-unused-vars
                return (
                    <div {...restAttribs} className={className}>
                        {domToReact(domNode.children, options)}
                    </div>
                );
            }
            if (domNode.name === 'p' && domNode?.parent?.name !== 'div') {
                return (
                    <p className="content">
                        {domToReact(domNode.children, options)}
                    </p>
                );
            }
            if (domNode.name === 'strong' && domNode?.parent?.name !== 'h4') {
                return (
                    <strong className="content">
                        {domToReact(domNode.children, options)}
                    </strong>
                );
            }
            if (domNode.name === 'h3') {
                return (
                    <h3 className="title">
                        {domToReact(domNode.children, options)}
                    </h3>
                );
            }
            if (domNode.name === 'h3' || domNode.name === 'h4' || domNode.name === 'h5' || domNode.name === 'h6') {
                return (
                    <h4 className="title">
                        {domToReact(domNode.children, options)}
                    </h4>
                );
            }

            if (domNode.name === 'img') {
                return (
                    <Image
                        src={domNode.attribs.src}
                        alt={domNode.attribs.alt}
                        width={700}
                        height={475}
                        style={{
                            width: "auto",
                            height: "auto",
                        }}
                    />
                );
            }
        }
    };

    return (
        <div className="max-w-[1200px] m-auto bg-white shadow-md rounded-lg p-6 mb-4">
            <Chip category={category} />
            <h2 className="text-4xl font-bold mb-2">{post?.title?.rendered}</h2>
            <p className="mb-2 text-xs">Publicado em {formattedDate} por Edberto Ticianeli</p>
            {post?.jetpack_featured_media_url && (
                <a href={post?.jetpack_featured_media_url} target="_blank" rel="noreferrer">
                    <Image
                        src={post?.jetpack_featured_media_url}
                        alt={post?.title?.rendered}
                        className="mb-4"
                        width={700}
                        height={475}
                        style={{
                            width: "auto",
                            height: "auto",
                        }}
                    />
                </a>
            )}
            <div>{parse(post?.content?.rendered || "", options)}</div>
        </div>
    );
};

export default Post;