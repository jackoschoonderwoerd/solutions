import { Component, inject, OnInit, output, signal } from '@angular/core';
import { openInitBandDialog } from './init-band-dialog/init-band-dialog.component';
import { InitBandDialogData } from './models/InitBandDialogData';
import { MatDialog } from '@angular/material/dialog';
import { Band } from './models/band.model';
import { LoadingService } from '../../../shared/loading/loading.service';
import { OosteropFirestoreService } from './services/oosterop-firestore.service';
import { SnackbarService } from '../../../shared/snackbar.service';
import { BandsListComponent } from './bands-list/bands-list.component';
import { BandComponent } from './band/band.component';


@Component({
    selector: 'app-oosterop-signals',
    imports: [BandsListComponent, BandComponent],
    templateUrl: './oosterop-signals.component.html',
    styleUrl: './oosterop-signals.component.scss'
})
export class OosteropSignalsComponent implements OnInit {

    dialog = inject(MatDialog)

    bands = signal<Band[]>([]);


    loadingService = inject(LoadingService)

    afs = inject(OosteropFirestoreService)

    sb = inject(SnackbarService)

    band = signal<Band>(null);



    ngOnInit(): void {
        this.loadBands()
    }

    async loadBands() {
        this.loadingService.loadingOn()

        try {
            const bands = await this.afs.collectionAsPromise('bands', 'bandname', 'asc')
            console.log(bands)
            this.bands.set(bands);
            this.loadingService.loadingOff()
        }
        catch (err) {
            this.sb.openSnackbar(`operation failed due to: ${err}`)
        }
    }

    async onOpenInitBand() {
        console.log('onOpenInitBand()')
        const data: InitBandDialogData = {
            mode: 'create'
        }
        const newBand = await openInitBandDialog(this.dialog, data);
        console.log(newBand)
        const newBands = [
            ...this.bands(),
            newBand
        ]
        this.bands.set(newBands)
    }

    onEditBand(band: Band) {
        this.band.set(band)
    }

    async deleteBand(bandId: string) {
        console.log(bandId)
        try {
            await this.afs.deleteDoc(`bands/${bandId}`)
            const bands = this.bands();
            console.log(bands);
            const newBands = bands.filter(band => {
                return band.id !== bandId
            })
            this.bands.set(newBands)
            console.log(this.bands())
        } catch (err) {
            console.log(err);
            this.sb.openSnackbar(`operation failed due to: ${err}`)
        }
    }
}
// async onAddPerson() {
//         const data: EditPersonDialogData = {
//             mode: 'create',
//         }

//         const newPerson = await openEditPersonDialog(this.dialog, data)
//         const newPersons = [
//             ...this.#persons(),
//             newPerson
//         ];

//         this.#persons.set(newPersons);
//     }
