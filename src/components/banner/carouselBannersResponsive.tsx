"use client";

import { useEffect, useState } from 'react';
import { IBanner } from 'src/interfaces/IBanner';
import Banner from './banner';
import CarouselBanners from './carouselBanners';

const CarouselBannersResponsive: React.FC = () => {

    const [banners, setBanners] = useState<IBanner[]>([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`/api/banners`);
                if (!response.ok) {
                    console.error('Erro ao buscar banners:', response.status);
                    return;
                }
                const data: IBanner[] = await response.json();

                setBanners(
                    data.filter(banner => 
                        banner.position === "menor-1" || 
                        banner.position === "menor-2" || 
                        banner.position === "menor-3" || 
                        banner.position === "menor-4"
                    ))
            } catch (error) {
                console.error('Erro ao buscar banners:', error);
                setBanners([]);
            }
        }

        fetchBanners();
    }, []);

    return (
        <div className="container grid grid-cols-12 col-span-12 my-5 lg:my-10">
            <div className="grid sm:hidden col-span-12">
                <CarouselBanners isSmall />
            </div>
            <div className="hidden sm:flex flex-no-wrap col-span-12 justify-center items-center gap-4">
            {banners.map((banner, index) => (
                <div key={`banner-${index}`} className="flex justify-center items-center w-full sm:w-1/4">
                    <Banner 
                        title={banner.title} 
                        imageData={banner.imageData} 
                        url={banner.url}
                    />
                </div>
            ))}
        </div>
        </div>
    );
};


export default CarouselBannersResponsive;