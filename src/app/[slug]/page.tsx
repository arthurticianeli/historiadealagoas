import { notFound } from 'next/navigation';
import Banner from '../components/banner/banner';
import Post from '../components/posts/post';
import { getBanners, getCategoryById, getPostsBySlug } from '../hooks/useWpApi';


async function PostPage({ params }: { readonly params: Promise<{ readonly slug: string }> }) {
    const slug = (await params).slug

    const post = await getPostsBySlug(slug);
    const banners = await getBanners();

    if (!post) {
        notFound();
    }

    const category = await getCategoryById(post?.categories[0]);

    return (
        <div className='flex flex-col '>
            <Post post={post} category={category.name} />
            <div className='flex flex-wrap justify-center items-center gap-4'>
                {banners.map((banner) => (
                    <div key={banner.title} >
                        <Banner title={banner.title} imageUrl={banner.imageUrl} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostPage;