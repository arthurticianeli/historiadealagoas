"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import WPAPI from "wpapi";
import Post from '../components/layout/posts/post';
import { IPost } from '../interfaces/IPost';

const PostPage = () => {
    const { slug } = useParams();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const wp = new WPAPI({ endpoint: apiUrl });

    const [post, setPost] = useState<IPost>({} as IPost);

    useEffect(() => {
        if (slug) {
            wp.posts().slug(slug).then((post: IPost[]) => {
                setPost(post[0]);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return <Post post={post} />;
};

export default PostPage;