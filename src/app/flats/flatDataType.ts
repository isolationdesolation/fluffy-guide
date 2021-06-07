

export interface FlatImage {
    name: string,
    image: string,
    isPlanImage: boolean
}

export interface FlatCategory {
    id: number;
    name: string;
}

export interface FlatCity {
    name: string;
}

export interface Flat {
    id: number;
    images: FlatImage[] | null;
    address: string;
    extraInformation: string | null;
    apartment: string;
    isNewFlat: boolean;
    numRooms: number;
    square: number | null;
    squareLot: number | null;
    floor: number;
    floorsHouse: number;
    price: number;
    material: string;
    finishing: string;
    dateConstruction: string;
    builtYear: string | null;
    readyQuarter: string | null;
    constructionCompany: string;
    contactPerson: string;
    contactPhone: string;
    contactEmail: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    description: string;
    district: string | null;
    cityId: number;
    city: FlatCity;
    category: FlatCategory;
    commercialCategory: FlatCategory | null;
}

export interface Filter {
    city?: number;
    category: number[];
    room_count: number[];
}


export interface FlatResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Flat[] | null;
}

export interface Params {
    currentPage: number,
    city?: string,
    flatCategory?: string,
    roomsAmount?: string
}
