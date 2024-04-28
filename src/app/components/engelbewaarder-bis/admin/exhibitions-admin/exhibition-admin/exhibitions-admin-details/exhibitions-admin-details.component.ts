import { JsonPipe, NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from '../../../../../../shared/firestore.service';
import { take } from 'rxjs';
import { Artist, Exhibition } from '../../../../types/models';
import { DocumentReference } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';
import { EngelbewaarderStore } from '../../../../store/engelbewaarder.store';
import { EngelbewaarderService } from '../../../../services/engelbewaarder.service';
import { MatDialog } from '@angular/material/dialog';
import { WarnDialogComponent } from '../../../../../../shared/warn-dialog/warn-dialog.component';
import { ExhibitionDescriptionComponent } from '../exhibition-description/exhibition-description.component';
import { ExhibitionsAdminStore } from '../../exhibitions-admin.store';

@Component({
    selector: 'app-exhibitions-admin-details',
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
        NgStyle,
        NgClass,
        ExhibitionDescriptionComponent
    ],
    templateUrl: './exhibitions-admin-details.component.html',
    styleUrl: './exhibitions-admin-details.component.scss'
})
export class ExhibitionsAdminDetailsComponent implements OnInit {
    @Input() exhibitionSelectedForEdit: Exhibition
    fb = inject(FormBuilder);
    fs = inject(FirestoreService);
    store = inject(EngelbewaarderStore);
    ebService = inject(EngelbewaarderService);
    dialog = inject(MatDialog);
    exStore = inject(ExhibitionsAdminStore)
    exhibitionAltered: boolean = false;
    form: FormGroup;
    editmode: boolean = false;
    exhibitionId: string;
    exhibitionUC: Exhibition;
    descriptionHtml: string;
    @Output() resetExhibitionSelectedForEditToNull = new EventEmitter<void>


    ngOnInit(): void {
        this.initForm();
        if (this.exhibitionSelectedForEdit) {
            this.editmode = true;
            this.setForm(this.exhibitionSelectedForEdit)
        }

        this.ebService.exhibitionChanged.subscribe((exhibition: Exhibition) => {
            if (exhibition) {
                this.exhibitionUC = exhibition;
                this.editmode = true;
                this.descriptionHtml = exhibition.description;
                this.setForm(exhibition);
            } else {
                this.form.reset();
            }
        })
    }

    editingFinished(descriptionHtml) {
        console.log('editingFinished admin-details')
        if (descriptionHtml) {
            this.descriptionHtml = descriptionHtml;
            this.exhibitionAltered = true;
        }
        this.exStore.toggleDescriptionEditorVisible(false);
    }

    alteringExhibition() {
        this.exhibitionAltered = true;
    }

    initForm() {
        this.form = this.fb.group({
            title: new FormControl(null),
            startDate: new FormControl(null, [Validators.required]),
            endDate: new FormControl(null, [Validators.required]),
            artists: new FormArray([], [Validators.required]),
            // description: new FormControl(null)
        })
    }
    artists(): FormArray {
        return this.form.get('artists') as FormArray
    }
    newArtist(): FormGroup {
        return this.fb.group({
            firstName: '',
            lastName: ''
        })
    }
    removeArtist(index) {
        this.artists().removeAt(index);
    }
    addArtist() {
        this.artists().push(this.newArtist());
    }

    onAddOrUpdateExhibitionDetails() {
        console.log(this.editmode)
        const formValue = this.form.value;
        if (this.editmode) {
            const updatedExhibition: Exhibition = {
                id: this.exhibitionSelectedForEdit.id,
                title: formValue.title,
                startDate: formValue.startDate,
                endDate: formValue.endDate,
                artists: formValue.artists,
                description: this.exhibitionSelectedForEdit.description,
                ebImages: this.exhibitionSelectedForEdit.ebImages
            }
            this.updateExhibition(updatedExhibition)
        } else {
            const newExhibition: Exhibition = {
                title: formValue.title,
                startDate: formValue.startDate,
                endDate: formValue.endDate,
                artists: formValue.artists,
                description: null,
                ebImages: []
            }
            this.saveExhibition(newExhibition)
        }
    }


    saveExhibition(exhibition) {
        if (!this.editmode) {
            const path = `engelbewaarder-exhibitions`
            this.fs.addDoc(path, exhibition)
                .then((docRef: DocumentReference) => {
                    console.log(`exhibition added; ${docRef.id}`)
                    this.exStore.editNothing();
                    this.form.reset();
                    this.resetExhibitionSelectedForEditToNull.emit();
                })
                .catch((err: FirebaseError) => {
                    console.error(`failed to store exhibition; ${err.message}`)
                })
        }
    }

    updateExhibition(exhibition: Exhibition) {
        const path = `engelbewaarder-exhibitions/${exhibition.id}`
        this.fs.updateDoc(path, exhibition)
            .then((res: any) => {
                console.log(res);
                // this.store.loadExhibitions();
                // console.log(`exhibition ${exhibition.title} is updated`);
                this.exStore.editNothing();
                // this.resetAll()
                this.resetExhibitionSelectedForEditToNull.emit();
            })
            .catch((err: FirebaseError) => {
                console.error(`failed to update ${exhibition.title}; ${err.message}`)
            })
    }
    resetAll() {
        this.form.reset();
        this.exStore.toggleExhibitionsListVisible(true);
        this.ebService.exhibitionChanged.emit(null);
        this.exStore.toggleImagesAdminVisible(false);
        this.exStore.toggleExhibitionsAdminDetailVisible(false);
        this.descriptionHtml = '';
        this.editmode = false;
    }


    onDeleteExhibition(event: MouseEvent, exhibitionId: string) {
        event.stopPropagation();
    }
    onEditExhibition(event: MouseEvent, exhibitionId: string) {
        event.stopPropagation()

        const path = `engelbewaarder-exhibitions/${exhibitionId}`
        this.fs.getDoc(path).pipe(take(1)).subscribe((exhibition: Exhibition) => {
            if (exhibition) {
                this.exStore.initExhibitionUC(exhibition)
                console.log(exhibition)

                this.exhibitionId = exhibition.id;
                this.editmode = true;
                this.form.patchValue({
                    title: exhibition.title,
                    startDate: new Date(exhibition.startDate['seconds'] * 1000),
                    endDate: new Date(exhibition.endDate['seconds'] * 1000),
                    description: exhibition.description,
                })
                exhibition.artists.forEach((artist: Artist) => {
                    console.log(artist)
                    const artistGroup = this.fb.group({
                        ...artist
                    })

                    this.artists().push(artistGroup)
                })
            }
            // this.downloadUrls = exhibition.downloadUrls
        })

    }
    setForm(exhibition: Exhibition) {

        if (exhibition) {
            this.exStore.initExhibitionUC(exhibition)
            // console.log(exhibition)

            this.exhibitionId = exhibition.id;
            this.editmode = true;
            this.form.patchValue({
                title: exhibition.title,
                startDate: exhibition.startDate ? new Date(exhibition.startDate['seconds'] * 1000) : null,
                endDate: exhibition.endDate ? new Date(exhibition.endDate['seconds'] * 1000) : null,
                // description: exhibition.description,
            })
            this.artists().clear();
            exhibition.artists.forEach((artist: Artist) => {
                const artistGroup = this.fb.group({
                    ...artist
                })

                this.artists().push(artistGroup)
            })
        }
    }
    onCancel() {
        if (this.exhibitionAltered) {
            const dialogRef = this.dialog.open(WarnDialogComponent, {
                data: {
                    message: `The changed you have made will not be saved`
                }
            })
            dialogRef.afterClosed().subscribe((res: boolean) => {
                if (res) {
                    this.editmode = false;
                    this.ebService.exhibitionChanged.emit(null);
                    this.exStore.editNothing();
                    this.resetExhibitionSelectedForEditToNull.emit();
                } else {
                    return;
                }
            })
        } else {
            this.resetExhibitionSelectedForEditToNull.emit();
            this.editmode = false;
            this.ebService.exhibitionChanged.emit(null);
            this.exStore.editNothing()
            // this.exStore.toggleExhibitionsAdminDetailVisible(false);
            // this.exStore.toggleImagesAdminVisible(false);
            // this.exStore.toggleExhibitionsListVisible(true);
        }
    }
}
