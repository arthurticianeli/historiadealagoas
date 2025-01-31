import { IPost } from "@/app/interfaces/IPost";
import Image from "next/image";
import Link from "next/link";

interface PostNewsProps {
    post: IPost;
}


export const PostNews = ({ post }: PostNewsProps) => {
    return (
        <Link href={`/${post.slug}`}>
            <div className="flex flex-col gap-2">
                <div className="w-full">
                    <Image
                        src={post?.jetpack_featured_media_url}
                        alt={post?.title?.rendered}
                        width={500}
                        height={250}
                        style={{
                            width: "auto",
                            height: "auto",
                        }}
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-semibold mt-1 mb-2 leading-tight">
                        {post.title.rendered}
                    </h2>
                </div>
            </div>
        </Link>
    );
};