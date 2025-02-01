import Image from 'next/image';
import React from 'react';

interface BannerProps {
    title: string;
    imageUrl: string;
}

const Banner: React.FC<BannerProps> = ({ title, imageUrl }) => {
    return (
        <Image
            src={imageUrl}
            alt={title}
            width={800}
            height={100}
            className="w-full max-w-[800px] mx-auto"
            style={{
                height: "auto",
            }} />
    );
};

export default Banner;