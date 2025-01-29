
import { getPostsByFilter } from "@/app/hooks/useWpApi";
import { IBanner } from "@/app/interfaces/IBanner";
import { IPost } from "@/app/interfaces/IPost";
import Link from "next/link";
import { FC, JSX } from "react";
import Banner from "../banner/banner";
import Carousel from "../carousel/carousel";
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

        posts.forEach((post, index) => {
            result.push(<PostNews key={`post-${index}`} post={post} />);

            // Insere um banner após cada post, se houver banners disponíveis
            if (banners.length > 0 && bannerIndex < banners.length) {
                result.push(
                    <div key={`banner-${bannerIndex}`} className="max-w-[300px]">
                        <Banner title={banners[bannerIndex].title} imageUrl={banners[bannerIndex].imageUrl} />
                    </div>
                );
                bannerIndex++;
            }
        });

        return result;
    };

    return (
        <div className="col-span-4">
            <Link href={`/categoria/noticias`}>
                <div className="flex justify-between items-center mb-4 px-2 border-b-2">
                    <h1 className="text-2xl font-bold uppercase title-category">Notícias</h1>
                    <span className="text-blue-500 cursor-pointer">Ver mais</span>
                </div>
            </Link>

            {carousel ? (
                <Carousel posts={posts} />
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {interleavePostsAndBanners(posts, banners)}
                </div>
            )}
        </div>
    );
};

export default NewsSection;