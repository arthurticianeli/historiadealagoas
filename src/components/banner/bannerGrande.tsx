"use client"

import { useEffect, useState } from 'react';
import { IBanner } from 'src/interfaces/IBanner';
import Banner from './banner';

interface BannerGrandeProps {
    position: string
}

const BannerGrande: React.FC<BannerGrandeProps> = ({ position }) => {
    const [banner, setBanner] = useState<IBanner>({} as IBanner);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`/api/banners`);
                if (!response.ok) {
                    console.error('Erro ao buscar banners:', response.status);
                    return;
                }
                const data: IBanner[] = await response.json();
                setBanner(data.find(banner => banner.position === position) ?? ({} as IBanner));
            } catch (error) {
                console.error('Erro ao buscar banners:', error);
                // Se há erro, não define banner (mantém o estado inicial vazio)
            }
        }

        fetchBanners();
    }, [position]);


    return (
        <div className="col-span-4 relative w-full overflow-hidden">
            <div className='max-w-[1000px] mx-auto'>
                {banner.imageData ? (
                    <Banner title={banner.title} imageData={banner.imageData} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default BannerGrande;