

export enum Vessel {
    'glass', 'bottle'
}



export interface Consumption {
    nameDutch: string;
    nameEnglish: string;
    descriptionDutch: string;
    descriptionEnglish: string;
    alcoholPercentage: number;
    vessel: Vessel;
    volume: number;
    price: number;
    availableOutside: boolean;
}

export interface Course {
    id: string;
    nameEnglish: string;
    nameDutch: string;
    nameDutchVisible: boolean;
    nameEnglishVisible: boolean;
    descriptionDutchVisible: string;
    descriptionEnglishVisible: string;
    alcoholPercentageVisible: number;
    vesselVisible: Vessel;
    volumeVisible: number;
    priceVisible: number;
    consumptions: Consumption[];
}

export interface Artist {
    firstName: string;
    lastName: string
}

export interface EbImage {
    url: string;
    filename: string;
    price?: number;
    artist?: string;
    sold?: boolean;
}

export interface Exhibition {
    id?: string;
    startDate: Date;
    endDate: Date;
    title: string;
    artists: Artist[];
    description: string;
    downloadUrls?: string[];
    ebImages: EbImage[]
}


