import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BannerProps {
    title: string;
    imageData: string;
    url?: string;
}

const Banner: React.FC<BannerProps> = ({ title, imageData, url }) => {

    if (!imageData) {
        return null;
    }

    const bannerImage = (
        <Image
            src={imageData}
            alt={title || "Banner Image"}
            width={800}
            height={100}
            className="w-full mx-auto"
            style={{
                height: "auto",
            }} />
    );

    if (url) {
        return (
            <Link href={url} target="_blank" rel="noopener noreferrer">
                {bannerImage}
            </Link>
        );
    }

    return bannerImage;
};

export default Banner;