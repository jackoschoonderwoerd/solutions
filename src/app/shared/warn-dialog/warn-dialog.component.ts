import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-warn-dialog',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './warn-dialog.component.html',
    styleUrl: './warn-dialog.component.scss'
})
export class WarnDialogComponent {
    public data: any = inject(MAT_DIALOG_DATA);
}
