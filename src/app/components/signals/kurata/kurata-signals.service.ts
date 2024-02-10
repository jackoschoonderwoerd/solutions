import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class KurataSignalsService {

    quantity = signal<number>(20);
}
