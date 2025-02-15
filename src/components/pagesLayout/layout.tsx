
import { ReactNode } from 'react';
import { bannersMockMaior } from 'src/mocks/bannersMocks';
import CarouselBanners from '../banner/carouselBanners';
import CarouselBannersResponsive from '../banner/carouselBannersResponsive';


export default async function Layout({ children }: { readonly children: ReactNode }) {

  return (
    <div className='container mx-auto'>
      <CarouselBanners banners={bannersMockMaior} />
      {children}
      <CarouselBannersResponsive />
    </div>
  )
}