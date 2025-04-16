import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { SnackbarService } from '../snackbar.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfirmService {
    dialog = inject(MatDialog)
    sb = inject(SnackbarService)

    constructor() { }

    async getConfirmation(doomedElement: any): Promise<boolean> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                doomedElement
            }
        })
        return await firstValueFrom(dialogRef.afterClosed());
    }
}
