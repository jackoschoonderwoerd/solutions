import { AlertComponent } from '../../../../shared/alert/alert.component';
import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Exhibition } from '../../types/eb-models';

import { EditExDescription } from './select-edit-section-dialog/edit-ex-description/edit-ex-description.component';

import { ExhibitionsAdminService } from './exhibitions-admin.service';
import { ExhibitionsAdminStore } from '../../stores/exhibitions-admin.store';
import { FirebaseError } from '@angular/fire/app';
import { FirestoreService } from '../../../../shared/firestore.service';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { take } from 'rxjs';
import { WarnDialogComponent } from '../../../../shared/warn-dialog/warn-dialog.component';
import { SelectEditSectionDialogComponent } from './select-edit-section-dialog/select-edit-section-dialog.component';
import { EditExDetails } from './select-edit-section-dialog/edit-ex-details/edit-ex-details.component';
import { EditExImages } from './select-edit-section-dialog/edit-ex-images/edit-ex-images.component';



@Component({
    selector: 'app-exhibitions-admin',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        DatePipe,
        EditExImages,
        EditExDescription,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './exhibitions-admin.component.html',
    styleUrl: './exhibitions-admin.component.scss'
})
export class ExhibitionsAdminComponent implements OnInit {

    fs = inject(FirestoreService);
    exStore = inject(ExhibitionsAdminStore)
    exService = inject(ExhibitionsAdminService)
    dialog = inject(MatDialog);
    exhibitionId: string;

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
        const dialogRef = this.dialog.open(SelectEditSectionDialogComponent, {
            data: {
                exhibitionTitle: exhibition.title
            }
        })
        dialogRef.afterClosed().subscribe((res: string) => {
            console.log(res)
            switch (res) {
                case 'details':
                    this.dialog.open(EditExDetails, { data: { exhibition } });
                    break;
                case 'description':
                    this.dialog.open(EditExDescription, { data: { exhibition } });
                    break;
                case 'images':
                    this.dialog.open(EditExImages, {
                        data: { exhibitionId: exhibition.id },
                        height: "calc(100% - 30px)",
                        width: "calc(100% - 30px)",
                        maxWidth: "100%",
                        maxHeight: "100%"
                    })
                    break;
                default:
                    this.dialog.open(AlertComponent, {
                        data: {
                            message: 'Aborted by user'
                        }
                    })
            }
        })
        // this.exService.exhibitionSelected.emit(exhibition);
        // this.exService.exhibitionSelected(exhibition)
    }

    onAddExhibition() {
        // this.exService.exhibitionSelected.emit();
        this.dialog.open(EditExDetails)
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
