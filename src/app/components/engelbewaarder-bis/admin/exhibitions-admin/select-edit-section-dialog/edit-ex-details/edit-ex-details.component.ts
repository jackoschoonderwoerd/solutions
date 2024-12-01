import { JsonPipe, NgClass, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Artist, Exhibition } from '../../../../types/eb-models';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FirestoreService } from '../../../../../../shared/firestore.service';
import { DocumentReference } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-ex-admin-details',
    imports: [

        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLabel,
        NgClass,

        ReactiveFormsModule,
    ],
    templateUrl: './edit-ex-details.component.html',
    standalone: true,
    styleUrl: './edit-ex-details.component.scss',
    providers: [provideNativeDateAdapter()]
})
export class EditExDetails implements OnInit {
    data: any = inject(MAT_DIALOG_DATA);
    editmode: boolean = false;
    exhibition: Exhibition;
    fb = inject(FormBuilder);
    form: FormGroup;
    fs = inject(FirestoreService)
    exhibitionAltered: boolean = false;

    constructor(
        public matDialogRef: MatDialogRef<EditExDetails>) { }

    ngOnInit(): void {
        this.initForm()
        if (this.data) {
            this.exhibition = this.data.exhibition
            console.log(this.exhibition.title)
            this.editmode = true;
            this.setForm()
        }
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
            this.fs.updateDoc(`engelbewaarder-exhibitions/${this.exhibition.id}`, {
                title: formValue.title,
                startDate: formValue.startDate,
                endDate: formValue.endDate,
                artists: formValue.artists
            })
                .then((res: any) => {
                    console.log(`exhibition admin details updated`)
                    this.exhibitionAltered = false;
                    this.form.reset();
                    this.matDialogRef.close()
                })
        } else {
            const newExhibition: Exhibition = {
                title: formValue.title,
                startDate: formValue.startDate,
                endDate: formValue.endDate,
                artists: formValue.artists,
                descriptionDutch: null,
                descriptionEnglish: null,
                descriptionSelectedLanguage: null,
                ebImages: []
            }
            this.saveExhibition(newExhibition)
        }
    }
    saveExhibition(exhibition) {

        const path = `engelbewaarder-exhibitions`
        this.fs.addDoc(path, exhibition)
            .then((docRef: DocumentReference) => {
                console.log(`exhibition added; ${docRef.id}`)
                // this.exStore.editNothing();
                this.form.reset();
                // this.resetExhibitionSelectedForEditToNull.emit();
                this.matDialogRef.close();
            })
            .catch((err: FirebaseError) => {
                console.error(`failed to store exhibition; ${err.message}`)
            })

    }
    onCancel() {
        this.matDialogRef.close();
    }
    alteringExhibition() {
        this.exhibitionAltered = true;
    }
    setForm() {

        if (this.exhibition) {
            this.editmode = true;
            this.form.patchValue({
                title: this.exhibition.title,
                startDate: this.exhibition.startDate ? new Date(this.exhibition.startDate['seconds'] * 1000) : null,
                endDate: this.exhibition.endDate ? new Date(this.exhibition.endDate['seconds'] * 1000) : null,
            })
            this.artists().clear();
            this.exhibition.artists.forEach((artist: Artist) => {
                const artistGroup = this.fb.group({
                    ...artist
                })

                this.artists().push(artistGroup)
            })
        }
    }
}
