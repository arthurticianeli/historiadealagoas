"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { IBanner } from "src/interfaces/IBanner";

interface PublicBannersProps {
    position?: string; // Posição específica dos banners (topo-1, topo-2, etc.)
    className?: string; // Classes CSS customizadas
}

function PublicBanners({ position, className = "" }: PublicBannersProps) {
    const [banners, setBanners] = useState<IBanner[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTodayBanners = useCallback(async () => {
        try {
            const response = await fetch("/api/banners?today=true");
            const data: IBanner[] = await response.json();
            
            // Filtra por posição se especificada
            const filteredBanners = position 
                ? data.filter(banner => banner.position === position)
                : data;
                
            setBanners(filteredBanners);
        } catch (error) {
            console.error("Erro ao buscar banners do dia:", error);
        } finally {
            setLoading(false);
        }
    }, [position]);

    // Função para validar URL e evitar links relativos
    const validateUrl = (url: string): string => {
        if (!url) return '';
        
        const trimmedUrl = url.trim();
        
        // Se já tem protocolo, retorna como está
        if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
            return trimmedUrl;
        }
        
        // Se não tem protocolo, adiciona https://
        return `https://${trimmedUrl}`;
    };

    useEffect(() => {
        fetchTodayBanners();
    }, [fetchTodayBanners]);

    if (loading) {
        return (
            <div className={`animate-pulse ${className}`}>
                <div className="bg-gray-200 rounded-lg h-24"></div>
            </div>
        );
    }

    if (banners.length === 0) {
        return null; // Não renderiza nada se não há banners
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {banners.map(banner => (
                <div key={banner.id} className="relative">
                    {banner.url ? (
                        <a 
                            href={validateUrl(banner.url)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block hover:opacity-90 transition-opacity"
                        >
                            <Image
                                src={banner.imageData}
                                alt={banner.title}
                                width={728}
                                height={90}
                                className="w-full h-auto shadow-sm"
                                priority={position === 'topo-1'}
                            />
                        </a>
                    ) : (
                        <Image
                            src={banner.imageData}
                            alt={banner.title}
                            width={728}
                            height={90}
                            className="w-full h-auto shadow-sm"
                            priority={position === 'topo-1'}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default PublicBanners;
