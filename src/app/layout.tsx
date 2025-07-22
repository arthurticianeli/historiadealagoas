
import { Roboto } from 'next/font/google'
import Head from 'next/head'
import { ReactNode } from 'react'
import Footer from '../components/layout/footer'
import Header from '../components/layout/header/header'
import './globals.css'

import logoHa from 'public/logo-ha.png'
import BannerGrande from 'src/components/banner/bannerGrande'
import CarouselBannersResponsive from 'src/components/banner/carouselBannersResponsive'

export const metadata = {
  title: 'História de Alagoas',
  description: 'Encontre a história de Alagoas em um só lugar',
  image: logoHa.src,
  type: 'website',
}


const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="src\app\globals.css" as="style" onLoad={() => { (document.querySelector('link[rel="preload"][href="src\\app\\globals.css"]') as HTMLLinkElement).rel = 'stylesheet'; }} />
      </Head>
      <html lang="en" className={roboto.className}>
        <body>
          <Header />
          <div className='container block lg:flex lg:gap-4 mb-5 lg:mb-10'>
            <BannerGrande position="topo-1" />
            <BannerGrande position="topo-2" />
          </div>
          <main>
            {children}
          </main>
          <CarouselBannersResponsive />
          <Footer />
        </body>
      </html>
    </>
  )
}