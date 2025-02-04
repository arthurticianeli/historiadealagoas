"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaMagnifyingGlass, FaRegCircleXmark } from 'react-icons/fa6';
import './searchForm.css';

const SearchForm = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        setIsInputVisible(false);
    };

    useEffect(() => {


    }, [router]);

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSearch}>
                <div className="input-group form-wrapper flex items-center justify-center">
                    <div className={`flex items-center flex-nowrap bg-white border rounded searchInput ${isInputVisible ? 'show' : ''}`}>
                        <input
                            type="search"
                            className={`form-control bg-white  m-0 ps-4 py-2`}
                            placeholder="Buscar"
                            aria-label="Buscar"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="searchIcon" type="submit">
                            <FaMagnifyingGlass />
                        </button>
                    </div>
                </div>
                {isInputVisible ? (
                    <button className="searchIcon" type="button" onClick={() => setIsInputVisible(!isInputVisible)}>
                        <FaRegCircleXmark />
                    </button>
                ) : (
                    <button className="searchIcon" type="button" onClick={() => setIsInputVisible(!isInputVisible)}>
                        <FaMagnifyingGlass />
                    </button>
                )}
            </form >

        </div >
    );
};

export default SearchForm;