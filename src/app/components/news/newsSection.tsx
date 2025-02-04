
import { getPostsByFilter } from "@/app/hooks/useWpApi";
import { IBanner } from "@/app/interfaces/IBanner";
import { ICategory } from "@/app/interfaces/ICategory";
import { IPost } from "@/app/interfaces/IPost";
import { FC } from "react";
import Carousel from "../carousel/carousel";
import CategoryHeader from "../categoryHeader/categoryHeader";
import { PostNews } from "./postNews";

interface NewsSectionProps {
    carousel?: boolean;
    banners?: IBanner[];
}

const NewsSection: FC<NewsSectionProps> = async ({ carousel }) => {
    const posts: IPost[] = await getPostsByFilter({ categoryId: 3034, page: 1, perPage: 5 });

    return (
        <div className="col-span-4">
            <CategoryHeader category={{ name: "Notícias", slug: "noticias" } as ICategory} />

            <div className="grid grid-cols-1 gap-4">
                {carousel ? (
                    <Carousel posts={posts} />
                ) : (
                    posts.map(post =>
                        <PostNews key={`post-${post.id}`} post={post} />
                    )
                )}
            </div>

        </div>
    );
};

export default NewsSection;