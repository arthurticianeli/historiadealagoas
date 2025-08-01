"use client"

import { useEffect, useState } from 'react';
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
            try {
                const response = await fetch(`/api/banners`);
                if (!response.ok) {
                    console.error('Erro ao buscar banners:', response.status);
                    return;
                }
                const data: IBanner[] = await response.json();

                if (isSmall) {
                    setBanners(data.filter(banner => 
                        banner.position === "menor-1" || 
                        banner.position === "menor-2" || 
                        banner.position === "menor-3" || 
                        banner.position === "menor-4"
                    ));
                    return;
                }

                setBanners(data.filter(banner => banner.position === "topo-1" || banner.position === "topo-2"));
            } catch (error) {
                console.error('Erro ao buscar banners:', error);
                setBanners([]);
            }
        }

        fetchBanners();
    }, [isSmall]);

    if (!banners.length) {
        return null;
    }

    return (
        <div className="col-span-4 relative w-full overflow-hidden">
            <Banner 
                title={banners?.[currentIndex]?.title} 
                imageData={banners?.[currentIndex]?.imageData} 
                url={banners?.[currentIndex]?.url}
            />
        </div>
    );
};

export default CarouselBanners;