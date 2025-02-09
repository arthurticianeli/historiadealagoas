import { notFound } from 'next/navigation';
import Layout from '../../components/pagesLayout/layout';
import Post from '../../components/posts/post';
import { getCategoryById, getPostsBySlug } from '../../hooks/useWpApi';

async function PostPage({ params }: { readonly params: Promise<{ readonly slug: string }> }) {
    const slug = (await params).slug

    const post = await getPostsBySlug(slug);

    if (!post) {
        notFound();
    }

    const category = await getCategoryById(post?.categories[0]);

    return (
        <div className='flex flex-col max-w-[900px] m-auto'>
            <Layout>
                <Post post={post} category={category.name} />
            </Layout>
        </div>
    );
}

export default PostPage;