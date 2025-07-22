"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IBanner } from "src/interfaces/IBanner";
import ConfigModal from "./configModal";

const positions = {
    1: "topo-1",
    2: "topo-2",
    3: "menor-1",
    4: "menor-2",
    5: "menor-3",
    6: "menor-4",
}

function BannersPage() {
    const [banners, setBanners] = useState<IBanner[]>([]);
    const [allBanners, setAllBanners] = useState<IBanner[]>([]); // Lista completa de banners para verificar conflitos

    const [grid, setGrid] = useState<(IBanner | null)[]>(Array(6).fill(null)); // 6 posições no grid

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Estados para o modal de configuração
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState<IBanner | null>(null);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await fetch("/api/banners");
            const data: IBanner[] = await response.json();
    
            // Salva a lista completa para verificar conflitos
            setAllBanners(data);
    
            // Separa banners com posição dos sem posição
            const remainingBanners: IBanner[] = [];
    
            data.forEach((banner) => {
                const positionIndex = Object.values(positions).indexOf(banner.position || "");
                if (positionIndex === -1) {
                    // Banner sem posição vai para a lista de banners disponíveis
                    remainingBanners.push(banner);
                }
            });
    
            // O grid agora é apenas para indicar as posições, não armazena banners
            setGrid(Array(6).fill(null));
            setBanners(remainingBanners);
        } catch (error) {
            console.error("Erro ao buscar banners:", error);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result; // Converte o arquivo para Base64

            const response = await fetch("/api/banners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: selectedFile.name,
                    data: base64Image, // Envia a imagem em Base64
                }),
            });

            if (response.ok) {
                fetchBanners(); // Atualiza a lista de banners
            }
        };

        reader.readAsDataURL(selectedFile); // Lê o arquivo como Base64
    };

    const handleDelete = async (id: number) => {
        try {
            await fetch(`/api/banners`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            fetchBanners();
        } catch (error) {
            console.error("Erro ao deletar banner:", error);
        }
    };

    const handleDragStart = (banner: IBanner) => {
        // @ts-expect-error: 'isDragging' is not part of the IBanner interface but is used temporarily for drag-and-drop functionality
        banner.isDragging = true;
        setBanners([...banners]);
    };

    const handleDragEnd = (banner: IBanner) => {
        // @ts-expect-error: 'isDragging' is not part of the IBanner interface but is used temporarily for drag-and-drop functionality
        banner.isDragging = false;
        setBanners([...banners]);
    };

    const handleDrop = async (index: number) => {
        // @ts-expect-error: 'isDragging' is not part of the IBanner interface but is used temporarily for drag-and-drop functionality
        const draggedBanner = banners.find((b) => b.isDragging);
        if (!draggedBanner) return;

        const positionName = positions[(index + 1) as keyof typeof positions];
        
        // Verifica quantos banners já existem nesta posição
        const bannersAtSamePosition = allBanners.filter(b => b.position === positionName);
        
        // Se é o primeiro banner na posição, define todos os dias da semana
        let displayDays = '';
        if (bannersAtSamePosition.length === 0) {
            displayDays = 'sunday,monday,tuesday,wednesday,thursday,friday,saturday';
        }

        // Remove o banner da lista de banners disponíveis
        setBanners(banners.filter((b) => b.id !== draggedBanner.id));

        // Salva a posição no servidor
        try {
            await fetch("/api/banners", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: draggedBanner.id,
                    position: positionName,
                    displayDays: displayDays,
                }),
            });
            
            // Atualiza a lista completa para refletir as mudanças
            fetchBanners();
        } catch (error) {
            console.error("Erro ao atualizar posição do banner:", error);
        }
    };

    const handleRemoveFromGrid = async (index: number, banner: IBanner) => {
        // Atualiza a posição do banner no servidor para null (remove da posição)
        try {
            await fetch("/api/banners", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: banner.id,
                    position: null, // Define a posição como null
                }),
            });
            
            // Atualiza a lista completa para refletir as mudanças
            fetchBanners();
        } catch (error) {
            console.error("Erro ao limpar a posição do banner:", error);
        }
    };

    // Funções para o modal de configuração
    const handleConfigBanner = (banner: IBanner) => {
        setSelectedBanner(banner);
        setIsConfigModalOpen(true);
    };

    const handleCloseConfigModal = () => {
        setIsConfigModalOpen(false);
        setSelectedBanner(null);
    };

    const handleSaveConfig = async (updatedBanner: Partial<IBanner>) => {
        try {
            await fetch("/api/banners", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: updatedBanner.id,
                    title: updatedBanner.title,
                    url: updatedBanner.url,
                    displayDays: updatedBanner.displayDays,
                }),
            });
            
            // Atualiza a lista local
            fetchBanners();
        } catch (error) {
            console.error("Erro ao salvar configuração do banner:", error);
        }
    };

    // Função para obter banners na mesma posição (para verificar conflitos)
    const getBannersInSamePosition = (banner: IBanner): IBanner[] => {
        if (!banner.position) return [];
        
        // Busca todos os banners com a mesma posição na lista completa
        return allBanners.filter(b => 
            b.position === banner.position && b.id !== banner.id
        );
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                Gerenciar Banners
            </h1>

            {/* Botões de navegação */}
            <div className="flex justify-center gap-4 mb-6">
                <a
                    href="/banners-hoje"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                >
                    📅 Ver Banners de Hoje
                </a>
                <a
                    href="/exemplo-banners"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                    🎨 Exemplo de Uso
                </a>
            </div>
    
            {/* Formulário de Upload */}
            <form onSubmit={handleUpload} className="mb-8 flex flex-col items-center">
                <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="mb-4 p-2 border border-gray-300 rounded-lg"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                    Upload
                </button>
            </form>
    
            {/* Lista de Banners */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {banners
                    .filter((banner) => !grid.some((gridBanner) => gridBanner?.id === banner.id))
                    .map((banner) => (
                        <div
                            key={banner.id}
                            className="border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-center bg-white hover:shadow-md transition relative"
                            draggable
                            onDragStart={() => handleDragStart(banner)}
                            onDragEnd={() => handleDragEnd(banner)}
                        >
                            {/* Ícone de configuração */}
                            <button
                                onClick={() => handleConfigBanner(banner)}
                                className="absolute top-2 left-2 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-gray-600 transition"
                                aria-label="Configurar banner"
                            >
                                ⚙️
                            </button>

                            <Image
                                src={banner.imageData}
                                alt={`Banner ${banner.title}`}
                                width={150}
                                height={64}
                                className="w-full h-24 object-cover rounded-md mb-3"
                            />
                            <p className="text-sm text-gray-700 mb-3 text-center">{banner.title}</p>
                            <button
                                onClick={() => handleDelete(banner.id!)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                            >
                                Deletar
                            </button>
                        </div>
                    ))}
            </div>
    
            {/* Grid de Posições */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {grid.map((banner, index) => {
                    const positionName = positions[(index + 1) as keyof typeof positions];
                    const bannersInPosition = allBanners.filter(b => b.position === positionName);
                    const hasMultiple = bannersInPosition.length > 1;
                    
                    return (
                        <div
                            key={index}
                            className={`border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-100 relative ${
                                hasMultiple ? 'ring-2 ring-yellow-400 min-h-48' : 'h-32'
                            }`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(index)}
                        >
                            {bannersInPosition.length > 0 ? (
                                <>
                                    {/* Indicador de múltiplos banners */}
                                    {hasMultiple && (
                                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-800 text-xs px-2 py-1 rounded-full z-20">
                                            {bannersInPosition.length} banners
                                        </div>
                                    )}

                                    {/* Lista de banners empilhados */}
                                    <div className="w-full space-y-2 overflow-y-auto max-h-40">
                                        {bannersInPosition.map((positionBanner) => (
                                            <div
                                                key={positionBanner.id}
                                                className="relative border border-gray-200 rounded-md bg-white p-2"
                                            >
                                                {/* Ícone de configuração */}
                                                <button
                                                    onClick={() => handleConfigBanner(positionBanner)}
                                                    className="absolute top-1 left-1 bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md hover:bg-gray-600 transition z-10 text-xs"
                                                    aria-label="Configurar banner"
                                                >
                                                    ⚙️
                                                </button>

                                                {/* Botão de remoção */}
                                                <button
                                                    onClick={() => handleRemoveFromGrid(index, positionBanner)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md hover:bg-red-600 transition text-xs"
                                                    aria-label="Remover do grid"
                                                >
                                                    X
                                                </button>

                                                <Image
                                                    src={positionBanner.imageData}
                                                    alt={`Banner ${positionBanner.title}`}
                                                    width={100}
                                                    height={40}
                                                    className="w-full h-16 object-cover rounded-sm"
                                                />
                                                
                                                {/* Indicador dos dias configurados */}
                                                {positionBanner.displayDays && (
                                                    <div className="text-xs text-gray-600 mt-1 truncate">
                                                        Dias: {positionBanner.displayDays.split(',').length} configurados
                                                    </div>
                                                )}
                                                
                                                {/* Indicador se não tem dias configurados */}
                                                {!positionBanner.displayDays && (
                                                    <div className="text-xs text-red-600 mt-1">
                                                        ⚠️ Configure os dias
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-400 text-sm text-center">
                                    {positionName}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Modal de Configuração */}
            {selectedBanner && (
                <ConfigModal
                    banner={selectedBanner}
                    isOpen={isConfigModalOpen}
                    onClose={handleCloseConfigModal}
                    onSave={handleSaveConfig}
                    conflictingBanners={getBannersInSamePosition(selectedBanner)}
                />
            )}
        </div>
    );
}

export default BannersPage;