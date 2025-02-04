import Image from 'next/image';
import NavItens from './navItens/navItens';
import SearchForm from './searchForm/searchForm';

import { getAllCategories } from '@/app/hooks/useWpApi';
import Link from 'next/link';
import './header.css';

const Header = async () => {
    const categories = await getAllCategories({ excludeNoticias: true });
    return (
        <header
            className="header bg-white border-b border-gray-200 h-[200px] 2xl:h-[250px]"
            style={{
                backgroundColor: 'var(--main-bg-color)',
                borderBottom: '4px solid var(--accent)'
            }}>
            <div className="container p-3 3xl:px-0 mx-auto flex items-center justify-between relative z-10 max-w-[1368px]">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/logo-ha.png"
                        alt="Logo"
                        width={200}
                        height={75}
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </Link>
                {/* NavItens */}
                <div className='flex items-center'>
                    <NavItens categories={categories} />
                    <SearchForm />
                </div>
            </div>
            <div className="image-gradient" />
        </header>
    );
};

export default Header;