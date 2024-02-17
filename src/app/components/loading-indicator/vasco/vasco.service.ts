import { Injectable, signal } from '@angular/core';
// import { BehaviorSubject, from, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VascoService {

    public loading = signal<boolean>(false)


    // private loadingSubject =
    //     new BehaviorSubject<boolean>(false);

    // loading$ = this.loadingSubject.asObservable();

    loadingOn() {
        // this.loadingSubject.next(true);
        this.loading.set(true)
    }

    loadingOff() {
        // this.loadingSubject.next(false);
        this.loading.set(true);
    }

}
