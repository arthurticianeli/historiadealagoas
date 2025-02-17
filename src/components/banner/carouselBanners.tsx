"use client"

import { useEffect, useState } from 'react';
import { getBannersMaiores, getBannersMenores } from 'src/hooks/useWpApi';
import { IBanner } from 'src/interfaces/IBanner';
import Banner from './banner';

interface CarouselBannersProps {
    isSmall?: boolean
}

const CarouselBanners: React.FC<CarouselBannersProps> = ({ isSmall = false }) => {
    const [banners, setBanners] = useState<IBanner[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners?.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [banners?.length]);

    useEffect(() => {
        const fetchBanners = async () => {
            if (isSmall) {
                const response = await getBannersMenores();
                setBanners(response);
                return;
            }
            const response = await getBannersMaiores();
            setBanners(response);
        }

        fetchBanners();
    }, []);

    if (!banners.length) {
        return null;
    }

    return (
        <div className="col-span-4 relative w-full overflow-hidden">
            <Banner title={banners?.[currentIndex]?.title} imageUrl={banners?.[currentIndex]?.imageUrl} />
        </div>
    );
};

export default CarouselBanners;