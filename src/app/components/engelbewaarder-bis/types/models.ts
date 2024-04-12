

export enum Vessel {
    'glass', 'bottle'
}
export enum InputName {
    'nameDutch',
    'nameEnglish',
    'descriptionDutch',
    'descriptionEnglish',
    'alcoholPrecentage',
    'volume',
    'vessel',
    'price'
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
}

export interface Course {
    id: string
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


