"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BannersPage from 'src/components/banner/bannerPage';
import Loading from '../loading';

function Painel() {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login'); // Redireciona para o login se não houver token
        }
        setIsLoggedIn(true);
    }, [router]);

    return (
        <>
        {isLoggedIn ? (<BannersPage />) : (<Loading />)}
        </>
    );
}

export default Painel;