export interface IBanner {
    id?: number;
    title: string;
    imageData: string;
    position?: string;
    url?: string;
    displayDays?: string; // Dias da semana separados por vírgula
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}