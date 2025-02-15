"use client"

import { useEffect, useState } from 'react';
import { IBanner } from 'src/interfaces/IBanner';
import Banner from './banner';

interface CarouselBannersProps {
    banners: IBanner[];
}

const CarouselBanners: React.FC<CarouselBannersProps> = ({ banners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners?.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [banners?.length]);

    return (
        <div className="col-span-4 relative w-full overflow-hidden">
            <Banner title={banners?.[currentIndex]?.title} imageUrl={banners?.[currentIndex]?.imageUrl} />
        </div>
    );
};

export default CarouselBanners;