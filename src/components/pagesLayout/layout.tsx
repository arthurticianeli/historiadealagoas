
import { bannersMock } from '@/app/layout';
import { ReactNode } from 'react';
import { getBanners } from 'src/hooks/useWpApi';
import CarouselBanners from '../banner/carouselBanners';
import CarouselBannersResponsive from '../banner/carouselBannersResponsive';


export default async function Layout({ children }: { readonly children: ReactNode }) {
  const banners = await getBanners();
  return (
    <div className='container mx-auto'>
      <CarouselBanners banners={bannersMock} />
      {children}
      <CarouselBannersResponsive banners={banners} />
    </div>
  )
}