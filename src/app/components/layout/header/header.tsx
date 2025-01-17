import Image from 'next/image';
import NavItens from './navItens/navItens';
import SearchForm from './searchForm/searchForm';


const Header = () => {
    return (
        <header
            className="bg-white border-b border-gray-200"
            style={{
                backgroundColor: 'var(--main-bg-color)',
                borderBottom: '4px solid var(--accent)'
            }}>
            <div className="container mx-auto px-4 flex items-center justify-between py-3">
                {/* Logo */}
                <div className="flex items-center">
                    <Image
                        src="/logo-ha.png"
                        alt="Logo"
                        width={150}
                        height={50}
                        className="object-contain"
                    />
                </div>
                <NavItens />
                <SearchForm />

            </div>
        </header>
    );
};

export default Header;
