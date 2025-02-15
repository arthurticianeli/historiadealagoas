import Image from "next/image";
import Link from "next/link";
import { IPost } from "src/interfaces/IPost";

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
                        className="rounded-md"
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-md text-white font-bold">
                        {post.title.rendered}
                    </h2>
                </div>
            </div>
        </Link>
    );
};