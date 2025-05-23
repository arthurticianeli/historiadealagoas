import Image from 'next/image';
import React from 'react';

interface BannerProps {
    title: string;
    imageData: string;
}

const Banner: React.FC<BannerProps> = ({ title, imageData }) => {
    return (
        <Image
            src={imageData}
            alt={title}
            width={800}
            height={100}
            className="w-full mx-auto"
            style={{
                height: "auto",
            }} />
    );
};

export default Banner;