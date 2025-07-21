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
            const response = await fetch(`/api/banners`);
            const data: IBanner[] = await response.json();
            setBanner(data.find(banner => banner.position === position) ?? ({} as IBanner));
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