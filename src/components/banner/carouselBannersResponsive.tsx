
import { getBanners } from 'src/hooks/useWpApi';
import Banner from './banner';
import CarouselBanners from './carouselBanners';

const CarouselBannersResponsive: React.FC = async () => {

    const banners = await getBanners();

    return (
        <div className="container grid grid-cols-12 col-span-12 my-10">
            <div className="grid lg:hidden col-span-12">
                <CarouselBanners banners={banners} />
            </div>
            <div className="hidden lg:grid grid-cols-12 col-span-12 justify-center items-center gap-4">
                {banners.map((banner, index) => (
                    <div key={`banner-${index}`} className='col-span-12 lg:col-span-3'>
                        <Banner title={banner.title} imageUrl={banner.imageUrl} />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default CarouselBannersResponsive;