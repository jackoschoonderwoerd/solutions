import { EventEmitter, Injectable } from '@angular/core';
import { Consumption } from '../../firebase/firestore/array-remove/engelbewaarder/models';
import { Course, Exhibition } from '../types/models';


@Injectable({
    providedIn: 'root'
})
export class EngelbewaarderService {


    baseUrl: string = 'engelbewaarder-consumptions'
    consumptionChanged = new EventEmitter<Consumption>;
    courseChanged = new EventEmitter<Course>;
    exhibitionChanged = new EventEmitter<Exhibition>


    getBaseUrl(): string {
        return this.baseUrl;
    }
}
