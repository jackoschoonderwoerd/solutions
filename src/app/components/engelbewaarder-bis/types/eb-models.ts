

export enum Vessel {
    'glass', 'bottle'
}






export interface Course {
    id: string;
    nameEnglish: string;
    nameDutch: string;
    nameSelectedLanguage: string;
    nameDutchVisible: boolean;
    nameEnglishVisible: boolean;
    descriptionDutchVisible: boolean;
    descriptionEnglishVisible: boolean;
    alcoholPercentageVisible: number;
    vesselVisible: Vessel;
    volumeVisible: number;
    priceVisible: number;
    consumptions: EbConsumption[];
}

export interface EbConsumption {
    nameDutch: string;
    nameEnglish: string;
    nameSelectedLanguage: string;
    descriptionDutch: string;
    descriptionEnglish: string;
    descriptionSelectedLanguage: string;
    alcoholPercentage: number;
    vessel: Vessel;
    volume: number;
    price: number;
    availableOutside: boolean;
}

export interface Artist {
    firstName: string;
    lastName: string
}

export interface EbImage {
    url: string;
    filename: string;
    title?: string;
    price?: number;
    artist?: string;
    sold?: boolean;
}

export interface EbDate {
    seconds: number,
    nanoseconds: number
}

export interface Exhibition {
    id?: string;
    startDate: EbDate;
    endDate: EbDate;
    title: string;
    artists: Artist[];
    descriptionDutch: string;
    descriptionEnglish: string;
    descriptionSelectedLanguage: string;
    downloadUrls?: string[];
    ebImages: EbImage[]
}


