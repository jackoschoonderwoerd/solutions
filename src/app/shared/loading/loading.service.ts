import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    #loadingSignal = signal(false);
    loading = this.#loadingSignal.asReadonly();

    router = inject(Router)

    loadingOn() {
        console.log('loadingOn()')
        this.#loadingSignal.set(true);
    }
    loadingOff() {
        console.log('loadingOff()')
        this.#loadingSignal.set(false)
    }
}
