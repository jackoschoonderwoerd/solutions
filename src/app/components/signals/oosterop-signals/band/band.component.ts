import { Component, effect, inject, input, OnInit } from '@angular/core';
import { Band } from '../models/band.model';
import { OosteropStore } from '../services/oosterop.store';
import { STATE_SOURCE } from '@ngrx/signals/src/state-source';
import { FormBuilder } from '@angular/forms';
import { BandnameComponent } from './bandname/bandname.component';
import { MatDialog } from '@angular/material/dialog';
import { openDescriptionDialog } from './description-dialog/description-dialog.component';


@Component({
    selector: 'app-band',
    imports: [BandnameComponent],
    templateUrl: './band.component.html',
    styleUrl: './band.component.scss'
})
export class BandComponent {
    dialog = inject(MatDialog)

    updateDescription() {
        openDescriptionDialog(this.dialog, { body: 'new text' });
    }
}
