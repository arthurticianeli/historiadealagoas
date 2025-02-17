
import Link from "next/link";
import { FC } from "react";
import { getPostsByFilter } from "src/hooks/useWpApi";
import { IPost } from "src/interfaces/IPost";
import Carousel from "../carousel/carousel";
import { PostNews } from "./postNews";


const NewsSection: FC = async () => {
    const posts: IPost[] = await getPostsByFilter({ categoryId: 3034, page: 1, perPage: 4 });

    return (
        <div className="col-span-12 bg-red-800 py-4  my-5 lg:my-10">
            <div className="flex justify-between items-center mb-4">
                <hr className="flex-grow border-t border-white mr-4" />
                <Link href={`/categoria/noticias`}>
                    <h1 className="font-bold text-2xl text-white uppercase">NOTÍCIAS</h1>
                </Link>
                <hr className="flex-grow border-t border-white ml-4" />
            </div>
            <div className="lg:hidden grid grid-cols-1 gap-4 px-4">
                <Carousel posts={posts} />
            </div>
            <div className="hidden lg:grid grid-cols-12 gap-4 container">
                {posts.map(post =>
                    <div key={`post-${post.id}`} className="col-span-3">
                        <PostNews post={post} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsSection;