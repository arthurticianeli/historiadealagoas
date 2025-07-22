"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IBanner } from "src/interfaces/IBanner";

function TodayBanners() {
    const [banners, setBanners] = useState<IBanner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodayBanners();
    }, []);

    const fetchTodayBanners = async () => {
        try {
            const response = await fetch("/api/banners?today=true");
            const data: IBanner[] = await response.json();
            setBanners(data);
        } catch (error) {
            console.error("Erro ao buscar banners do dia:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-lg text-gray-600">Carregando banners do dia...</div>
            </div>
        );
    }

    const today = new Date();
    const dayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const currentDayName = dayNames[today.getDay()];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
                Banners de Hoje
            </h1>
            <p className="text-lg text-gray-600 mb-6 text-center">
                {currentDayName} - {today.toLocaleDateString('pt-BR')}
            </p>

            {banners.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📅</div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Nenhum banner para hoje
                    </h2>
                    <p className="text-gray-500">
                        Não há banners configurados para exibição em {currentDayName.toLowerCase()}.
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-4 text-center">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {banners.length} banner{banners.length !== 1 ? 's' : ''} para hoje
                        </span>
                    </div>

                    {/* Banners organizados por posição */}
                    <div className="space-y-8">
                        {['topo-1', 'topo-2', 'menor-1', 'menor-2', 'menor-3', 'menor-4'].map(position => {
                            const positionBanners = banners.filter(banner => banner.position === position);
                            
                            if (positionBanners.length === 0) return null;

                            return (
                                <div key={position} className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                                        Posição: {position}
                                        <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                                            {positionBanners.length} banner{positionBanners.length !== 1 ? 's' : ''}
                                        </span>
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {positionBanners.map(banner => (
                                            <div key={banner.id} className="border border-gray-200 rounded-lg p-4">
                                                <Image
                                                    src={banner.imageData}
                                                    alt={`Banner ${banner.title}`}
                                                    width={300}
                                                    height={120}
                                                    className="w-full h-24 object-cover rounded-md mb-3"
                                                />
                                                <h4 className="font-medium text-gray-800 mb-2">{banner.title}</h4>
                                                
                                                {banner.url && (
                                                    <p className="text-sm text-blue-600 mb-2 truncate">
                                                        🔗 {banner.url}
                                                    </p>
                                                )}
                                                
                                                {banner.displayDays && (
                                                    <div className="text-xs text-gray-500">
                                                        Dias configurados: {banner.displayDays.split(',').length}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

export default TodayBanners;
