import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { OosteropStore } from '../../services/oosterop.store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Band } from '../../models/band.model';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { OosteropFirestoreService } from '../../services/oosterop-firestore.service';

@Component({
    selector: 'app-bandname',
    imports: [
        ReactiveFormsModule,
        MatInput,
        MatFormFieldModule,
        MatLabel,
        MatButtonModule
    ],
    templateUrl: './bandname.component.html',
    styleUrl: './bandname.component.scss'
})
export class BandnameComponent {
    oosteropStore = inject(OosteropStore);
    fb = inject(FormBuilder);
    form = this.fb.group({
        bandname: ['', [Validators.required]]
    })
    activeBand = signal<Band>(null);
    ofs = inject(OosteropFirestoreService)



    constructor() {
        effect(() => {
            const activeBand = this.oosteropStore.activeBand();
            if (activeBand) {
                console.log('active band changed', activeBand)
                this.patchForm(activeBand);
                this.activeBand.set(activeBand)
            }
        })
    }

    patchForm(activeBand: Band) {
        this.form.patchValue({
            bandname: activeBand.bandname
        })
    }
    async updateBandname(newBandname: string) {
        const band = this.activeBand();
        band.bandname = newBandname;
        await this.ofs.updateField(`bands/${band.id}`, 'bandname', newBandname);
        this.oosteropStore.setActiveBand(band);
    }
}
