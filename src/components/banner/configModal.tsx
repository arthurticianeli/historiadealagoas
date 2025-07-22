import React, { useState, useEffect } from 'react';
import { IBanner } from "../../interfaces/IBanner";

interface ConfigModalProps {
    readonly banner: IBanner;
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onSave: (data: Partial<IBanner>) => void;
    readonly conflictingBanners?: IBanner[];
}

const daysOfWeek = [
    { value: 'sunday', label: 'Domingo' },
    { value: 'monday', label: 'Segunda-feira' },
    { value: 'tuesday', label: 'Terça-feira' },
    { value: 'wednesday', label: 'Quarta-feira' },
    { value: 'thursday', label: 'Quinta-feira' },
    { value: 'friday', label: 'Sexta-feira' },
    { value: 'saturday', label: 'Sábado' }
];

function ConfigModal({ banner, isOpen, onClose, onSave, conflictingBanners = [] }: ConfigModalProps) {
    const [title, setTitle] = useState(banner.title || '');
    const [url, setUrl] = useState(banner.url || '');
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [dayConflicts, setDayConflicts] = useState<string[]>([]);
    const [hasMultipleBanners, setHasMultipleBanners] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTitle(banner.title || '');
            setUrl(banner.url || '');
            
            // Verifica se há múltiplos banners na mesma posição
            const hasManyBanners = conflictingBanners.length > 0;
            setHasMultipleBanners(hasManyBanners);
            
            // Parse os dias já salvos
            if (banner.displayDays) {
                setSelectedDays(banner.displayDays.split(','));
            } else {
                setSelectedDays([]);
            }
        }
    }, [banner, isOpen, conflictingBanners]);

    const handleDayToggle = (day: string) => {
        const newSelectedDays = selectedDays.includes(day) 
            ? selectedDays.filter(d => d !== day)
            : [...selectedDays, day];
        
        setSelectedDays(newSelectedDays);
        
        // Verifica conflitos com outros banners na mesma posição
        checkDayConflicts(newSelectedDays);
    };

    const checkDayConflicts = (days: string[]) => {
        const conflicts: string[] = [];
        
        conflictingBanners.forEach(conflictBanner => {
            if (conflictBanner.id !== banner.id && conflictBanner.displayDays) {
                const conflictDays = conflictBanner.displayDays.split(',');
                const overlapping = days.filter(day => conflictDays.includes(day));
                conflicts.push(...overlapping);
            }
        });
        
        setDayConflicts([...new Set(conflicts)]);
    };

    const handleSave = () => {
        // Verifica se há conflitos de dias
        if (dayConflicts.length > 0) {
            alert(`Conflito detectado! Os seguintes dias já estão sendo usados por outros banners na mesma posição: ${dayConflicts.map(day => daysOfWeek.find(d => d.value === day)?.label).join(', ')}`);
            return;
        }

        const updatedBanner: IBanner = {
            ...banner,
            title: title.trim() || banner.title,
            url: url.trim(),
            displayDays: selectedDays.join(',')
        };
        
        onSave(updatedBanner);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Configurar Banner
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Aviso sobre múltiplos banners */}
                    {hasMultipleBanners && (
                        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                            <p className="text-sm">
                                ⚠️ Há múltiplos banners nesta posição. Configure os dias de exibição para evitar conflitos.
                            </p>
                        </div>
                    )}

                    {/* Aviso sobre conflitos */}
                    {dayConflicts.length > 0 && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <p className="text-sm">
                                ❌ Conflito detectado! Os dias {dayConflicts.map(day => daysOfWeek.find(d => d.value === day)?.label).join(', ')} já estão sendo usados por outros banners.
                            </p>
                        </div>
                    )}
                    {/* Campo Título */}
                    <div>
                        <label htmlFor="banner-title" className="block text-sm font-medium text-gray-700 mb-2">
                            Título (opcional)
                        </label>
                        <input
                            id="banner-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Digite o título do banner"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Campo URL */}
                    <div>
                        <label htmlFor="banner-url" className="block text-sm font-medium text-gray-700 mb-2">
                            URL do Link
                        </label>
                        <input
                            id="banner-url"
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://exemplo.com ou exemplo.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {url && !url.startsWith('http://') && !url.startsWith('https://') && (
                            <p className="text-xs text-blue-600 mt-1">
                                💡 O protocolo &ldquo;https://&rdquo; será adicionado automaticamente
                            </p>
                        )}
                    </div>

                    {/* Dias da Semana */}
                    <div>
                        <fieldset>
                            <legend className="block text-sm font-medium text-gray-700 mb-2">
                                Dias de Exibição
                            </legend>
                            <div className="space-y-2">
                                {daysOfWeek.map((day) => {
                                    const isConflicted = dayConflicts.includes(day.value);
                                    const isSelected = selectedDays.includes(day.value);
                                    
                                    return (
                                        <label key={day.value} className={`flex items-center ${isConflicted ? 'bg-red-50 p-2 rounded' : ''}`}>
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleDayToggle(day.value)}
                                                className={`h-4 w-4 focus:ring-blue-500 border-gray-300 rounded ${
                                                    isConflicted ? 'text-red-600 border-red-300' : 'text-blue-600'
                                                }`}
                                            />
                                            <span className={`ml-2 text-sm ${
                                                isConflicted ? 'text-red-700 font-medium' : 'text-gray-700'
                                            }`}>
                                                {day.label}
                                                {isConflicted && ' ⚠️'}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </fieldset>
                    </div>
                </div>

                {/* Botões */}
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={dayConflicts.length > 0}
                        className={`px-4 py-2 rounded-lg transition ${
                            dayConflicts.length > 0 
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfigModal;
