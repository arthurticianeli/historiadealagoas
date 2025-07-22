"use client";

import { useEffect, useState, useCallback } from "react";
import PublicBanners from "./publicBanners";
import { IBanner } from "src/interfaces/IBanner";

function TopBannersLayout() {
    const [bannersCount, setBannersCount] = useState({ topo1: 0, topo2: 0 });
    const [loading, setLoading] = useState(true);

    const fetchBannersCount = useCallback(async () => {
        try {
            const response = await fetch("/api/banners?today=true");
            const data: IBanner[] = await response.json();
            
            const topo1Count = data.filter(banner => banner.position === 'topo-1').length;
            const topo2Count = data.filter(banner => banner.position === 'topo-2').length;
            
            setBannersCount({ topo1: topo1Count, topo2: topo2Count });
        } catch (error) {
            console.error("Erro ao buscar banners:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBannersCount();
    }, [fetchBannersCount]);

    if (loading) {
        return (
            <div className='container block lg:flex lg:gap-4 mb-5 lg:mb-10'>
                <div className="animate-pulse bg-gray-200 rounded-lg h-24 mb-2 lg:mb-0"></div>
                <div className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
            </div>
        );
    }

    // Se não há banners, não renderiza nada
    if (bannersCount.topo1 === 0 && bannersCount.topo2 === 0) {
        return null;
    }

    // Se há apenas um banner (em qualquer posição), centraliza
    const hasOnlyOneBanner = (bannersCount.topo1 > 0 && bannersCount.topo2 === 0) || 
                              (bannersCount.topo1 === 0 && bannersCount.topo2 > 0);

    if (hasOnlyOneBanner) {
        return (
            <div className='container flex justify-center mb-5 lg:mb-10'>
                <div className="">
                    {bannersCount.topo1 > 0 && (
                        <PublicBanners position="topo-1" />
                    )}
                    {bannersCount.topo2 > 0 && (
                        <PublicBanners position="topo-2" />
                    )}
                </div>
            </div>
        );
    }

    // Se há banners nas duas posições, usa o layout original lado a lado
    return (
        <div className='container block lg:flex lg:gap-4 mb-5 lg:mb-10'>
            <PublicBanners position="topo-1" className='mb-2 lg:mb-0' />
            <PublicBanners position="topo-2" />
        </div>
    );
}

export default TopBannersLayout;
