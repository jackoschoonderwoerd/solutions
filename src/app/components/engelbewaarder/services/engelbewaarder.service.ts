import { EventEmitter, Injectable } from '@angular/core';
import { Consumption } from '../../firebase/firestore/array-remove/engelbewaarder/models';
import { ConsumptionType } from '../types/models';

@Injectable({
    providedIn: 'root'
})
export class EngelbewaarderService {


    baseUrl: string = 'engelbewaarder'
    consumptionChanged = new EventEmitter<Consumption>
    consumptionTypeChanged = new EventEmitter<ConsumptionType>

    constructor() { }

    getBaseUrl(): string {
        return this.baseUrl;
    }
    changeConsumptionType(consumptionType: ConsumptionType) {
        this.consumptionTypeChanged.emit(consumptionType)
    }
}
