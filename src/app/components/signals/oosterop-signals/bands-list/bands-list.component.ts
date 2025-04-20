import { Component, inject, input, output } from '@angular/core';
import { Band } from '../models/band.model';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OosteropStore } from '../services/oosterop.store';

@Component({
    selector: 'app-bands-list',
    imports: [JsonPipe, MatIconModule],
    templateUrl: './bands-list.component.html',
    styleUrl: './bands-list.component.scss'
})
export class BandsListComponent {
    bands = input<Band[]>([]);
    idBandForDeletion = output<string>()
    oosteropStore = inject(OosteropStore)


    onDelete(bandId: string) {
        console.log('deleting', bandId)
        this.idBandForDeletion.emit(bandId)
        // this.persionIdForDeletion    ()?.(person.id);

        // this.personDeleted.emit(person.id);
    }
    onEditBand(band: Band) {
        console.log(band);
        this.oosteropStore.setActiveBand(band);
    }
}
