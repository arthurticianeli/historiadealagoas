"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IBanner } from "src/interfaces/IBanner";

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

    const [grid, setGrid] = useState<(IBanner | null)[]>(Array(6).fill(null)); // 6 posições no grid

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await fetch("/api/banners");
            const data: IBanner[] = await response.json();
    
            // Organiza os banners no grid com base na posição
            const newGrid = [...grid];
            const remainingBanners: IBanner[] = [];
    
            data.forEach((banner) => {
                const positionIndex = Object.values(positions).indexOf(banner.position || "");
                if (positionIndex !== -1) {
                    newGrid[positionIndex] = banner;
                } else {
                    remainingBanners.push(banner);
                }
            });
    
            setGrid(newGrid);
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
        console.log("Dropped at index:", index);
        // @ts-expect-error: 'isDragging' is not part of the IBanner interface but is used temporarily for drag-and-drop functionality
        const draggedBanner = banners.find((b) => b.isDragging);
        if (!draggedBanner) return;

        const newGrid = [...grid];
        newGrid[index] = draggedBanner;

        setGrid(newGrid);
        setBanners(banners.filter((b) => b.id !== draggedBanner.id));

        // Salva a posição no servidor
        try {
            await fetch("/api/banners", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: draggedBanner.id,
                    position: positions[(index + 1) as keyof typeof positions],
                }),
            });
            console.log(`Banner ${draggedBanner.id} atualizado para a posição ${index + 1}`);
        } catch (error) {
            console.error("Erro ao atualizar posição do banner:", error);
        }
    };

    const handleRemoveFromGrid = async (index: number, banner: IBanner) => {
        // Remove o banner do grid
        const newGrid = [...grid];
        newGrid[index] = null;
        setGrid(newGrid);
    
        // Adiciona o banner de volta à lista de banners
        setBanners((prevBanners) => [...prevBanners, banner]);
    
        // Atualiza a posição do banner no servidor para null
        try {
            await fetch("/api/banners", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: banner.id,
                    position: null, // Define a posição como null
                }),
            });
            console.log(`Banner ${banner.id} removido do grid e posição limpa no servidor.`);
        } catch (error) {
            console.error("Erro ao limpar a posição do banner:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                Gerenciar Banners
            </h1>
    
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
                            className="border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-center bg-white hover:shadow-md transition"
                            draggable
                            role="button"
                            tabIndex={0}
                            onDragStart={() => handleDragStart(banner)}
                            onDragEnd={() => handleDragEnd(banner)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    handleDragStart(banner);
                                }
                            }}
                        >
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
                {grid.map((banner, index) => (
                    <div
                        key={index}
                        className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-32 bg-gray-100 relative"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(index)}
                    >
                        {banner ? (
                            <>
                                <Image
                                    src={banner.imageData}
                                    alt={`Banner ${banner.title}`}
                                    width={150}
                                    height={64}
                                    className="w-full h-24 object-cover rounded-md"
                                />
                                <button
                                    onClick={() => handleRemoveFromGrid(index, banner)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition"
                                    aria-label="Remover do grid"
                                >
                                    X
                                </button>
                            </>
                        ) : (
                            <p className="text-gray-400 text-sm text-center">
                                {positions[(index + 1) as keyof typeof positions]}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BannersPage;