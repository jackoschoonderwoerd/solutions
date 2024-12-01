import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-select-edit-section-dialog',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './select-edit-section-dialog.component.html',
    styleUrl: './select-edit-section-dialog.component.scss'
})
export class SelectEditSectionDialogComponent {
    data = inject(MAT_DIALOG_DATA)
}
