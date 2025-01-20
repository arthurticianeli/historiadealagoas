import { ReactNode } from 'react'
import Footer from './components/layout/footer'
import Header from './components/layout/header/header'
import './globals.css'

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container mx-auto md:px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}