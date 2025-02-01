import { notFound } from 'next/navigation';
import Banner from '../components/banner/banner';
import Post from '../components/posts/post';
import { getCategoryById, getPostsBySlug } from '../hooks/useWpApi';
import { bannersMock } from '../page';

async function PostPage({ params }: { readonly params: Promise<{ readonly slug: string }> }) {
    const slug = (await params).slug

    const post = await getPostsBySlug(slug);

    if (!post) {
        notFound();
    }

    const category = await getCategoryById(post?.categories[0]);

    return (
        <div className='flex flex-col md:flex-row'>
            <Post post={post} category={category.name} />
            <div className='flex flex-col ml-4'>
                {bannersMock.map((banner) => (
                    <Banner key={banner.title} title={banner.title} imageUrl={banner.imageUrl} />
                ))}
            </div>
        </div>
    );
}

export default PostPage;