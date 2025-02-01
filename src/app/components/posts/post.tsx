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
                        className="w-full"
                        style={{
                            height: "auto",
                        }}
                    />
                );
            }

            if (domNode.name === 'a') {
                return (
                    <a href={domNode.attribs.href} target="_blank" rel="noreferrer">
                        {domToReact(domNode.children, options)}
                    </a>
                );
            }
        }
    };

    return (
        <div className="w-100 mx-auto px-6 mb-4" style={{ marginTop: "-20px" }}>
            <Chip category={category} />
            <h2 className="text-4xl font-bold mb-2">{post?.title?.rendered}</h2>
            <p className="mb-2 text-xs">Publicado em {formattedDate} por Edberto Ticianeli</p>
            {post?.jetpack_featured_media_url && (
                <a href={post?.jetpack_featured_media_url} target="_blank" rel="noreferrer" >
                    <Image
                        src={post?.jetpack_featured_media_url}
                        alt={post?.title?.rendered}
                        className="mb-4 mx-auto w-full"
                        width={700}
                        height={475}
                        style={{
                            height: "auto",
                        }}
                    />
                </a>
            )}
            <div className="max-w-[900px] m-auto">{parse(post?.content?.rendered || "", options)}</div>
        </div>
    );
};

export default Post;