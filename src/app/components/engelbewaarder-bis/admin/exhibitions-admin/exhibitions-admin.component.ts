import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe, JsonPipe, NgFor } from '@angular/common';
import { FirestoreService } from '../../../../shared/firestore.service';
import { Exhibition } from '../../types/models';

import { StorageService } from '../../../../shared/storage.service';

import { MatExpansionModule } from '@angular/material/expansion';
import { take } from 'rxjs';
import { ImagesAdminComponent } from './exhibition-admin/images-admin/images-admin.component';
import { ExhibitionsAdminDetailsComponent } from './exhibition-admin/exhibitions-admin-details/exhibitions-admin-details.component';
import { EngelbewaarderService } from '../../services/engelbewaarder.service';
import { ExhibitionsAdminStore } from './exhibitions-admin.store';
import { EngelbewaarderStore } from '../../store/engelbewaarder.store';
import { ExhibitionDescriptionComponent } from './exhibition-admin/exhibition-description/exhibition-description.component';
import { ExhibitionAdminComponent } from './exhibition-admin/exhibition-admin.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../../shared/alert/alert.component';
import { WarnDialogComponent } from '../../../../shared/warn-dialog/warn-dialog.component';
import { FirebaseError } from '@angular/fire/app';


@Component({
    selector: 'app-exhibitions-admin',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatLabel,
        MatDatepickerModule,
        NgFor,
        JsonPipe,
        MatExpansionModule,
        DatePipe,
        ImagesAdminComponent,
        ExhibitionsAdminDetailsComponent,
        ExhibitionDescriptionComponent,
        ExhibitionAdminComponent
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './exhibitions-admin.component.html',
    styleUrl: './exhibitions-admin.component.scss'
})
export class ExhibitionsAdminComponent implements OnInit {
    fb = inject(FormBuilder);
    fs = inject(FirestoreService);
    store = inject(EngelbewaarderStore);
    exStore = inject(ExhibitionsAdminStore)
    ebService = inject(EngelbewaarderService);
    dialog = inject(MatDialog);
    form: FormGroup;
    editmode: boolean = false;
    imageFiles: File[] = [];
    urls: File[] = [];
    storage = inject(StorageService);
    downloadUrls: string[] = [];
    exhibitionId: string;
    exhibitionUC: Exhibition;
    descriptionHtml: string;
    exhibitionSelectedForEdit: Exhibition


    ngOnInit(): void {
        this.exStore.loadExhibitions();
    }




    onDeleteExhibition(event: MouseEvent, exhibitionId: string) {
        console.log(exhibitionId)
        event.stopPropagation();
        this.checkForImages(exhibitionId).then((ebImagesLength: number) => {
            console.log(ebImagesLength)
            if (ebImagesLength) {
                this.dialog.open(AlertComponent, {
                    data: {
                        message: 'remove all images before deleting the complete exhibition'
                    }
                })
            } else {
                const dialogRef = this.dialog.open(WarnDialogComponent, {
                    data: {
                        message: `This will permanently delete the exhibition and all of its properties`
                    }
                })
                dialogRef.afterClosed().subscribe((res: boolean) => {
                    if (res) {
                        const path = `engelbewaarder-exhibitions/${exhibitionId}`
                        this.fs.deleteDoc(path)
                            .then((res: any) => {
                                console.log(`exhibition deleted`)
                            })
                            .catch((err: FirebaseError) => {
                                console.error(`failed to delete exhibition; ${err.message}`)
                            })
                    }
                })
            }
        })
    }

    onEditExhibition(event: MouseEvent, exhibition: Exhibition) {
        event.stopPropagation();
        this.exhibitionSelectedForEdit = exhibition
        this.exStore.editDetail();
    }

    onAddExhibition() {
        this.exStore.editDetail()
        // this.exStore.toggleExhibitionsListVisible(false);
        // this.exStore.toggleExhibitionsAdminDetailVisible(true);
        // this.ebService.exhibitionChanged.emit(null);
        // this.exStore.toggleImagesAdminVisible(false);
    }

    checkForImages(exhibitionId) {
        const promise = new Promise((resolve, reject) => {

            const path = `engelbewaarder-exhibitions/${exhibitionId}`
            this.fs.getDoc(path)
                .pipe(take(1))
                .subscribe((exhibition: Exhibition) => {
                    if (exhibition) {
                        resolve(exhibition.ebImages.length);
                    }
                })
        })
        return promise
    }
}
