export interface Instrument {
    name: string;
    seqNr: number;
}

export interface Musician {
    firstName: string;
    lastName: string;
    seqNr: number
    instruments: Instrument[];
}

export interface Cd {
    title: string;
    musicians: Musician[];
    reviews: string[];
}
