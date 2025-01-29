"use client"

import { IPost } from "@/app/interfaces/IPost";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export default function Carousel({ posts }: { readonly posts: ReadonlyArray<IPost> }) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const prevSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
    };

    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    };

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                nextSlide();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isHovered]);

    return (
        <div
            className="relative w-full overflow-hidden mb-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {posts.map((post) => (
                    <div key={post.id} className="min-w-full">
                        <img src={post.jetpack_featured_media_url} alt={post.title.rendered} className="w-full h-auto" />
                        <h2 className="text-xl font-bold">{post.title.rendered}</h2>
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2">
                <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>
            <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <ChevronRightIcon className="h-6 w-6 text-white" />
            </button>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {posts.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-red-800' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
}