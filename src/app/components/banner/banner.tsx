import Image from 'next/image';
import React from 'react';

interface BannerProps {
    title: string;
    imageUrl: string;
}

const Banner: React.FC<BannerProps> = ({ title, imageUrl }) => {
    return (

        <Image className='p-2' src={imageUrl} alt={title} width={1200} height={500} style={{ maxWidth: "100%", height: "auto" }} />

    );
};

export default Banner;