
import { getAllCategories } from '@/app/hooks/useWpApi';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { FaAngleDown } from 'react-icons/fa';

const NavItens: React.FC = async () => {

    const categories = await getAllCategories()

    return (
        <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-bold text-xl">
                INÍCIO
            </Link>
            <Link href="/categoria/noticias" className="text-gray-700 hover:text-red-600 font-bold text-xl">
                NOTÍCIAS
            </Link>
            <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="text-gray-700 hover:text-red-600 uppercase font-bold text-xl">
                    <div className="flex items-center">
                        Categorias <FaAngleDown />
                    </div>
                </MenuButton>
                <MenuItems className=" absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {
                        categories?.map(category => (
                            <MenuItem key={category.id}>
                                <Link href={`/categoria/${category.slug}`} className="bg-gray-100 block px-4 py-2 text-sm text-gray-900 uppercase font-bold"
                                    role="menuitem">
                                    {category.name}
                                </Link>
                            </MenuItem>
                        ))
                    }
                </MenuItems>
            </Menu>
        </nav>
    );
};

export default NavItens;