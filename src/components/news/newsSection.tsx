
import { getPostsByFilter } from "@/app/hooks/useWpApi";
import { FC } from "react";
import { ICategory } from "src/interfaces/ICategory";
import { IPost } from "src/interfaces/IPost";
import Carousel from "../carousel/carousel";
import CategoryHeader from "../categoryHeader/categoryHeader";
import { PostNews } from "./postNews";


const NewsSection: FC = async () => {
    const posts: IPost[] = await getPostsByFilter({ categoryId: 3034, page: 1, perPage: 5 });

    return (
        <>
            <CategoryHeader category={{ name: "Notícias", slug: "noticias" } as ICategory} />
            <div className="lg:hidden grid grid-cols-1 gap-4">
                <Carousel posts={posts} />
            </div>
            <div className="hidden lg:grid grid-cols-1 gap-4">
                {posts.map(post =>
                    <PostNews key={`post-${post.id}`} post={post} />
                )}
            </div>
        </>
    );
};

export default NewsSection;