
import { ReactNode } from 'react';


export default async function Layout({ children }: { readonly children: ReactNode }) {

  return (
    <div className='container mx-auto'>
      {children}
    </div>
  )
}