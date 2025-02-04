
import { IBanner } from '@/app/interfaces/IBanner';
import Banner from './banner';
import CarouselBanners from './carouselBanners';

interface CarouselBannersProps {
    banners: IBanner[];
}

const CarouselBannersResponsive: React.FC<CarouselBannersProps> = ({ banners }) => {

    return (
        <div className="grid grid-cols-12 col-span-12">
            <div className="grid lg:hidden col-span-12 mb-6">
                <CarouselBanners banners={banners} />
            </div>
            <div className="hidden lg:grid grid-cols-12 col-span-12 gap-10 mb-4">
                {banners.map((banner, index) => (
                    <div key={`banner-${index}`} className="col-span-3">
                        <Banner title={banner.title} imageUrl={banner.imageUrl} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarouselBannersResponsive;