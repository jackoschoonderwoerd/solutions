import { JsonPipe, NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, inject, Input, input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from '../../../../../shared/firestore.service';
import { take } from 'rxjs';
import { Artist, Exhibition } from '../../../types/models';
import { DocumentReference } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';
import { EngelbewaarderStore } from '../../../store/engelbewaarder.store';
import { EngelbewaarderService } from '../../../services/engelbewaarder.service';
import { MatDialog } from '@angular/material/dialog';
import { WarnDialogComponent } from '../../../../../shared/warn-dialog/warn-dialog.component';

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
        NgClass




    ],
    templateUrl: './exhibitions-admin-details.component.html',
    styleUrl: './exhibitions-admin-details.component.scss'
})
export class ExhibitionsAdminDetailsComponent implements OnInit {
    fb = inject(FormBuilder);
    fs = inject(FirestoreService);
    store = inject(EngelbewaarderStore);
    ebService = inject(EngelbewaarderService);
    dialog = inject(MatDialog)
    exhibitionAltered: boolean = false;
    form: FormGroup;
    editmode: boolean = false;
    exhibitionId: string;
    exhibitionUC: Exhibition;


    ngOnInit(): void {
        this.initForm();

        this.ebService.exhibitionChanged.subscribe((exhibition: Exhibition) => {
            console.log(exhibition);
            if (exhibition) {
                this.exhibitionUC = exhibition;
                this.editmode = true;
                this.setForm(exhibition);
            } else {
                this.form.reset();
            }
        })
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
            description: new FormControl(null)
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
    onSaveOrUpdate() {
        const formValue = this.form.value;
        const exhibition: Exhibition = {
            title: formValue.title,
            startDate: formValue.startDate,
            endDate: formValue.endDate,
            artists: formValue.artists,
            description: formValue.description,
            downloadUrls: [],
            ebImages: []
        }
        if (!this.editmode) {
            this.saveExhibition(exhibition)
        } else {
            this.updateExhibition(exhibition)
        }
    }


    saveExhibition(exhibition) {
        if (!this.editmode) {
            const path = `engelbewaarder-exhibitions`
            this.fs.addDoc(path, exhibition)
                .then((docRef: DocumentReference) => {
                    console.log(`exhibition added; ${docRef.id}`)
                    this.resetAll();
                })
                .catch((err: FirebaseError) => {
                    console.error(`failed to store exhibition; ${err.message}`)
                })
        }
    }

    updateExhibition(exhibition: Exhibition) {
        console.log('update')
        console.log(exhibition)
        exhibition.ebImages = this.exhibitionUC.ebImages
        const path = `engelbewaarder-exhibitions/${this.exhibitionUC.id}`
        this.fs.updateDoc(path, exhibition)
            .then((res: any) => {
                this.store.loadExhibitions();
                console.log(`exhibition ${exhibition.title} is updated`);
                this.resetAll()
            })
            .catch((err: FirebaseError) => {
                console.error(`failed to update ${exhibition.title}; ${err.message}`)
            })
    }
    resetAll() {
        this.form.reset();
        this.store.toggleExhibitionsListVisible(true);
        this.ebService.exhibitionChanged.emit(null);
        this.store.toggleImagesAdminVisible(false);
        this.store.toggleExhibitionsAdminDetailVisible(false);
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
                this.store.initExhibitionUC(exhibition)
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
            this.store.initExhibitionUC(exhibition)
            // console.log(exhibition)

            this.exhibitionId = exhibition.id;
            this.editmode = true;
            this.form.patchValue({
                title: exhibition.title,
                startDate: new Date(exhibition.startDate['seconds'] * 1000),
                endDate: new Date(exhibition.endDate['seconds'] * 1000),
                description: exhibition.description,
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
                    this.store.toggleExhibitionsAdminDetailVisible(false);
                    this.store.toggleImagesAdminVisible(false);
                    this.store.toggleExhibitionsListVisible(true);
                } else {
                    return;
                }
            })
        } else {
            this.editmode = false;
            this.ebService.exhibitionChanged.emit(null);
            this.store.toggleExhibitionsAdminDetailVisible(false);
            this.store.toggleImagesAdminVisible(false);
            this.store.toggleExhibitionsListVisible(true);
        }
    }
}
