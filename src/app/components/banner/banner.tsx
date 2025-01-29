import Image from 'next/image';
import React from 'react';

interface BannerProps {
    title: string;
    imageUrl: string;
}

const Banner: React.FC<BannerProps> = ({ title, imageUrl }) => {
    return (
        <div className='flex justify-center w-100 p-2'>
            <Image unoptimized src={imageUrl} alt={title} layout='responsive' width={728} height={90} />
        </div>
    );
};

export default Banner;