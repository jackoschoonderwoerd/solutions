

export enum Vessel {
    'glass', 'bottle'
}

export interface Standard {
    nameDutch: string,
    nameEnglish?: string,
    price: number,
}

export interface Beer extends Standard {
    descriptionDutch: string;
    descriptionEnglish?: string;
    alcoholPercentage: number;
    vessel: Vessel;
    volume: number;
}
export interface Wine extends Standard {
    vessel: Vessel;
}

export interface Snack extends Standard {
    descriptionDutch: string;
    descriptionEnglish?: string;
}
export interface Plate extends Standard {
    descriptionDutch: string;
    descriptionEnglish?: string;
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


