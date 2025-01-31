
import { getPostsByFilter } from "@/app/hooks/useWpApi";
import { IBanner } from "@/app/interfaces/IBanner";
import { ICategory } from "@/app/interfaces/ICategory";
import { IPost } from "@/app/interfaces/IPost";
import { FC, JSX } from "react";
import Banner from "../banner/banner";
import Carousel from "../carousel/carousel";
import CategoryHeader from "../categoryHeader/categoryHeader";
import { PostNews } from "./postNews";

interface NewsSectionProps {
    carousel?: boolean;
    banners?: IBanner[]; // Array de banners
}

const NewsSection: FC<NewsSectionProps> = async ({ carousel, banners = [] }) => {
    const posts: IPost[] = await getPostsByFilter({ categoryId: 3034, page: 1, perPage: 10 });

    // Função para intercalar posts e banners
    const interleavePostsAndBanners = (posts: IPost[], banners: IBanner[]) => {
        const result: JSX.Element[] = [];
        let bannerIndex = 0;

        posts.forEach((post) => {
            result.push(<PostNews key={`post-${post.id}`} post={post} />);

            // Insere um banner após cada post, se houver banners disponíveis
            if (banners.length > 0 && bannerIndex < banners.length) {
                result.push(
                    <div key={`banner-${bannerIndex}`} className="max-w-[300px] mx-auto border-b-2 border-t-2">
                        <Banner title={banners[bannerIndex].title} imageUrl={banners[bannerIndex].imageUrl} />
                    </div>
                );
                bannerIndex++;
            }
        });

        // Adiciona os banners restantes
        while (bannerIndex < banners.length) {
            result.push(
                <div key={`banner-${bannerIndex}`} className="max-w-[300px] mx-auto">
                    <Banner title={banners[bannerIndex].title} imageUrl={banners[bannerIndex].imageUrl} />
                </div>
            );
            bannerIndex++;
        }

        return result;
    };
    return (
        <div className="col-span-4">
            <CategoryHeader category={{ name: "Notícias", slug: "noticias" } as ICategory} />

            {carousel ? (
                <div className="grid grid-cols-1 gap-4">
                    <Carousel posts={posts} />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {interleavePostsAndBanners(posts, banners)}
                </div>
            )}
        </div>
    );
};

export default NewsSection;