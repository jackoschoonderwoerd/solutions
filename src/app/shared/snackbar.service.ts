import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    private _snackBar = inject(MatSnackBar)



    openSnackbar(message: string) {
        this._snackBar.open(message, 'Close', {

            panelClass: ['mat-warn']
        })
    }

    private messageSignal = signal<string | null>(null);
    readonly message = computed(() => this.messageSignal());

    constructor(private snackBar: MatSnackBar) {
        effect(() => {
            const msg = this.message();
            if (msg) {
                this.snackBar.open(msg, 'Close', {
                    // duration: 3000,

                });
                this.messageSignal.set(null); // reset so it only triggers once
            }
        });
    }

    show(message: string) {
        this.messageSignal.set(message);
    }
}
