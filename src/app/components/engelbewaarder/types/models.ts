

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

export interface ConsumptionTypeInputs {
    inputName: string;
    visible: boolean
}

export interface ConsumptionType {
    name: string;
    consumptionTypeInputsVisibility: {
        nameDutchVisible: boolean;
        nameEnglishVisible: boolean;
        descriptionDutchVisible: string;
        descriptionEnglishVisible: string;
        alcoholPercentageVisible: number;
        vesselVisible: Vessel;
        volumeVisible: number;
        priceVisible: number;

    }
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


