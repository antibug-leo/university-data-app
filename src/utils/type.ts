export interface University {
    _id: number;
    country: string;
    name: string;
    "state-province": string;
    web_pages: string;
    is_favorite: boolean;
    onToggleFavorite: () => void;
}

export interface UniversityData {
    universities: University[];
    total: number;
}

export interface FilterOptions {
    country: string;
    searchTerm: string;
}