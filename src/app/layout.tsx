
import { Roboto } from 'next/font/google'
import Head from 'next/head'
import { ReactNode } from 'react'
import Banner from './components/banner/banner'
import Footer from './components/layout/footer'
import Header from './components/layout/header/header'
import './globals.css'


const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <>
      <Head>
        <title>História de Alagoas</title>
        <meta name="description" content="Descrição do seu site" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="src\app\globals.css" as="style" onLoad={() => { (document.querySelector('link[rel="preload"][href="src\\app\\globals.css"]') as HTMLLinkElement).rel = 'stylesheet'; }} />

      </Head>
      <html lang="en" className={roboto.className}>
        <body>
          <Header />
          <div className='flex flex-wrap content-center justify-center my-4'>
            <Banner title="Next.js Blog" imageUrl="https://banner.historiadealagoas.com.br/up/Prestacao-Faz-Faz-Faz-120241213121232.gif" />
          </div>

          <main className="container mx-auto md:px-4">
            {children}
          </main>

          <Footer />
        </body>
      </html>
    </>
  )
}