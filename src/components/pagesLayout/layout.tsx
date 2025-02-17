
import { ReactNode } from 'react';
import CarouselBannersResponsive from '../banner/carouselBannersResponsive';


export default async function Layout({ children }: { readonly children: ReactNode }) {

  return (
    <div className='container mx-auto'>
      {children}
      <CarouselBannersResponsive />
    </div>
  )
}