"use client"

import { IBanner } from '@/app/interfaces/IBanner';
import { useEffect, useState } from 'react';
import Banner from './banner';

interface CarouselBannersProps {
    banners: IBanner[];
}

const CarouselBanners: React.FC<CarouselBannersProps> = ({ banners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000); // Muda o slide a cada 3 segundos

        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="relative w-full overflow-hidden">
            <Banner title={banners[currentIndex].title} imageUrl={banners[currentIndex].imageUrl} />
        </div>
    );
};

export default CarouselBanners;