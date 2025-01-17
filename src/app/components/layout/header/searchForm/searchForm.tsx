"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    FaAlignJustify
} from 'react-icons/fa';
import { FaMagnifyingGlass, FaRegCircleXmark } from 'react-icons/fa6';
import './searchForm.css';

const SearchForm = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSearch}>
                <div className="input-group flex items-center justify-center relative">
                    <input
                        type="search"
                        className={`form-control m-0 searchInput ${isInputVisible ? 'show' : ''}`}
                        placeholder="Buscar"
                        aria-label="Buscar"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {isInputVisible ? (
                        <button className="searchIcon" type="button" onClick={() => setIsInputVisible(!isInputVisible)}>
                            <FaRegCircleXmark />
                        </button>
                    ) : (
                        <button className="searchIcon" type="button" onClick={() => setIsInputVisible(!isInputVisible)}>
                            <FaMagnifyingGlass />
                        </button>
                    )}
                </div>
            </form >
            {/* Botão Mobile */}
            <div className="md:hidden" >
                <button className="text-gray-700 hover:text-red-600 text-xl mt-1">
                    <FaAlignJustify />
                </button>
            </div >
        </div >
    );
};

export default SearchForm;