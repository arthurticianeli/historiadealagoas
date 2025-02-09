"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaAlignJustify, FaAngleDown } from 'react-icons/fa';
import { ICategory } from 'src/interfaces/ICategory';

interface NavItensProps {
    categories: ICategory[];
}

const NavItens: React.FC<NavItensProps> = ({ categories }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="hidden md:flex gap-10 items-center">
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
                    <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
            {/* Botão Mobile */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-700 hover:text-red-600 text-xl" style={{ padding: "10px 0px 10px 20px" }}>
                    <FaAlignJustify />
                </button>
                {isMenuOpen && (
                    <div className="bg-white border border-gray-200 rounded-md shadow-lg absolute right-5 top-20 pt-2">
                        <Link href="/" className="block px-4 py-2 text-gray-700 hover:text-red-600 font-bold text-xl">
                            INÍCIO
                        </Link>
                        <Link href="/categoria/noticias" className="block px-4 py-2 text-gray-700 hover:text-red-600 font-bold text-xl">
                            NOTÍCIAS
                        </Link>
                        <div className="relative inline-block text-left">
                            <div className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 uppercase font-bold text-xl">
                                Categorias <FaAngleDown />
                            </div>
                            <div className="mt-2 w-56 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                                {
                                    categories?.map(category => (
                                        <Link key={category.id} href={`/categoria/${category.slug}`} className="block px-4 py-2 text-sm text-gray-900 uppercase font-bold">
                                            {category.name}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default NavItens;