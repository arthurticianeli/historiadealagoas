import { notFound } from 'next/navigation';
import Post from '../components/posts/post';
import { getCategoryById, getPostsBySlug } from '../hooks/useWpApi';



async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug

    const post = await getPostsBySlug(slug);

    if (!post) {
        notFound();
    }

    const category = await getCategoryById(post?.categories[0]);

    return (
        <Post post={post} category={category.name} />
    );
}

export default PostPage;