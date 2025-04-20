import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InitDescriptionDialogData } from '../../models/initDescriptionDialogData.model';
import { Band } from '../../models/band.model';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-description-dialog',
    imports: [],
    templateUrl: './description-dialog.component.html',
    styleUrl: './description-dialog.component.scss'
})
export class DescriptionDialogComponent {

}
export async function openDescriptionDialog(dialog: MatDialog, data: InitDescriptionDialogData): Promise<Band> {
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
        DescriptionDialogComponent,
        config)
        .afterClosed();

    return firstValueFrom(close$);
}
