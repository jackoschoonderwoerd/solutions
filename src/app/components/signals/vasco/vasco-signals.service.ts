import { Injectable, effect, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VascoSignalsService {

    private counterSignal = signal<number>(0);

    readonly counter = this.counterSignal.asReadonly();

    increment() {
        if (this.counter() > 10) {
            throw `Maximum value reached!`;
        }
        this.counterSignal.update(val => val + 1);

    }

}
