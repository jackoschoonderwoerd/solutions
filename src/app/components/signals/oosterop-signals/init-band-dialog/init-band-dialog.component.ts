import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EditPersonDialogData } from '../../udemy-signals/models/edit-person-dialog-data.model';
import { InitBandDialogData } from '../models/InitBandDialogData';
import { firstValueFrom } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { OosteropFirestoreService } from '../services/oosterop-firestore.service';
import { SnackbarService } from '../../../../shared/snackbar.service';
import { Band } from '../models/band.model';

@Component({
    selector: 'app-init-band-dialog',
    imports: [MatFormFieldModule, MatInput],
    templateUrl: './init-band-dialog.component.html',
    styleUrl: './init-band-dialog.component.scss'
})
export class InitBandDialogComponent {

    dialogRef = inject(MatDialogRef<InitBandDialogComponent>)
    data: InitBandDialogData = inject(MAT_DIALOG_DATA);
    afs = inject(OosteropFirestoreService)
    sb = inject(SnackbarService)


    async onAddOrUpdateBandname(bandname: string) {
        const band: Band = {
            bandname: bandname
        }
        // return
        if (this.data?.mode === 'create') {
            this.initBand(band)
        }
        // await this.afs.addDocReturnsTheNewElement('bands', { bandname })


    }
    async initBand(bandname: Partial<Band>) {
        try {
            const initializedBand = await this.afs.addDocReturnsTheNewElement('bands', bandname);

            this.sb.openSnackbar(`band initialized`);
            this.dialogRef.close(initializedBand);
        }
        catch (err) {
            {
                console.log(err);
                this.sb.openSnackbar(`operation failed due to: ${err}`)
            }
        }
    }

}




export async function openInitBandDialog(dialog: MatDialog, data: InitBandDialogData): Promise<Band> {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "90vw";
    config.height = "90vh";
    config.panelClass = 'full-screen-dialog';
    config.maxWidth = "90vw";
    config.maxHeight = '90vh';
    config.data = data;

    const close$ = dialog.open(
        InitBandDialogComponent,
        config)
        .afterClosed();
    console.log(firstValueFrom(close$))
    return firstValueFrom(close$);
}
