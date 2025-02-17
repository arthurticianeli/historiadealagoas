
import { getBannersMenores } from 'src/hooks/useWpApi';
import Banner from './banner';
import CarouselBanners from './carouselBanners';

const CarouselBannersResponsive: React.FC = async () => {

    const banners = await getBannersMenores();

    return (
        <div className="container grid grid-cols-12 col-span-12 my-5 lg:my-10">
            <div className="grid sm:hidden col-span-12">
                <CarouselBanners isSmall />
            </div>
            <div className="hidden sm:grid grid-cols-12 col-span-12 justify-center items-center gap-4">
                {banners.map((banner, index) => (
                    <div key={`banner-${index}`} className='col-span-12 sm:col-span-3'>
                        <Banner title={banner.title} imageUrl={banner.imageUrl} />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default CarouselBannersResponsive;