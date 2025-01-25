import { IPost } from "@/app/interfaces/IPost";
import Link from "next/link";

import { getPostsByFilter } from "@/app/hooks/useWpApi";
import { FC } from "react";
import Banner from "../banner/banner";
import { PostNews } from "./postNews";



const NewsSection: FC = async () => {
    const posts: IPost[] = await getPostsByFilter({ categoryId: 3034, page: 1, perPage: 10 });
    return (
        <div className="col-span-4">
            <Link href={`/categoria/noticias`}>
                <div className="flex justify-between items-center mb-4 px-2 border-b-2">
                    <h1 className="text-2xl font-bold uppercase title-category">Notícias</h1>
                    <span className="text-blue-500 cursor-pointer">Ver mais</span>
                </div>
            </Link>
            <div className="grid grid-cols-1 gap-4">
                {posts?.slice(0, 2).map((post, index) => (
                    <PostNews key={index} post={post} />
                ))}
                {posts?.slice(2, 4).map((post, index) => (
                    <PostNews key={index} post={post} />
                ))}
                <Banner title="Anuncie aqui" imageUrl="https://i0.wp.com/www.historiadealagoas.com.br/wp-content/uploads/2020/08/paritura.png?resize=300%2C200&ssl=1" />
                <Banner title="Anuncie aqui" imageUrl="https://i0.wp.com/www.historiadealagoas.com.br/wp-content/uploads/2024/01/GIF-9-ANOS.gif?resize=300%2C250&ssl=1" />
                <Banner title="Anuncie aqui" imageUrl="https://i0.wp.com/www.historiadealagoas.com.br/wp-content/uploads/2022/11/ABC-das-Alagoas.jpg?resize=300%2C300&ssl=1" />
            </div>

        </div >
    );
};



export default NewsSection;
