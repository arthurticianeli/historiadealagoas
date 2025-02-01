import Image from 'next/image';
import NavItens from './navItens/navItens';
import SearchForm from './searchForm/searchForm';

import Link from 'next/link';
import './header.css';

const Header = () => {
    return (
        <header
            className="header bg-white border-b border-gray-200 h-[200px] 2xl:h-[250px]"
            style={{
                backgroundColor: 'var(--main-bg-color)',
                borderBottom: '4px solid var(--accent)'
            }}>
            <div className="container mx-auto px-4 flex items-center justify-between py-3 relative z-10">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/logo-ha.png"
                        alt="Logo"
                        width={200}
                        height={75}
                        className="mt-4"
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </Link>
                {/* NavItens */}
                <div className='flex items-center'>
                    <NavItens />
                    <SearchForm />
                </div>
            </div>
            <div className="image-gradient" />
        </header>
    );
};

export default Header;