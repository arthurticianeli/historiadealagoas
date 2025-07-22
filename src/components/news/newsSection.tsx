
import Link from "next/link";
import { FC } from "react";
import { getPostsByFilter } from "src/hooks/useWpApi";
import { IPost } from "src/interfaces/IPost";
import Carousel from "../carousel/carousel";
import { PostNews } from "./postNews";


const NewsSection: FC = async () => {
    const posts: IPost[] = await getPostsByFilter({ categoryId: 3034, page: 1, perPage: 4 });

    // Se não há posts, não renderiza a seção
    if (!posts || posts.length === 0) {
        return null;
    }    return (
        <div className="col-span-4 lg:col-span-1 bg-red-800 rounded-md px-10 pt-5">
            <div className="mb-4">
                <Link href={`/categoria/noticias`}>
                    <h1 className="font-bold text-xl text-white uppercase">NOTÍCIAS</h1>
                </Link>
                <hr className="flex-grow border-t border-white" />
            </div>
            <div className="lg:hidden grid grid-cols-1 gap-4">
                <Carousel posts={posts} />
            </div>
            <div className="hidden lg:grid grid-cols-1 gap-4">
                {posts.map(post =>
                    <div key={`post-${post.id}`}>
                        <PostNews post={post} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsSection;