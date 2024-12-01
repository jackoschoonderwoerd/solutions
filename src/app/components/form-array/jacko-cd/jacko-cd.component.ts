import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FirestoreService } from '../../../shared/firestore.service';
import { Cd, Instrument, Musician } from './types/cd.types';
import { FirebaseError } from '@angular/fire/app';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';

@Component({
    selector: 'app-jacko-cd',
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        NgFor,
        MatButtonModule,
        CommonModule
    ],
    templateUrl: './jacko-cd.component.html',
    styleUrl: './jacko-cd.component.scss'
})
export class JackoCdComponent {

    cdForm: FormGroup;
    editForm: FormGroup;
    fsService = inject(FirestoreService)
    constructor(private fb: FormBuilder) { }
    cds$: Observable<any>





    ngOnInit() {
        const pathToCds = `cds`
        this.cds$ = this.fsService.collection(pathToCds);
        this.initCdForm();
        // this.onEdit('GIQPmaLrwnUDdOW76g2P')
    }
    initEditForm() {
        this.editForm = this.fb.group({
            title: new FormControl(null)
        })
    }

    initCdForm() {
        this.cdForm = this.fb.group({
            title: new FormControl('', Validators.required),
            musiciansArray: this.fb.array([]),
            // musicians: new FormArray([]),
            reviews: this.fb.array([])
        });

    }
    // ============ EDIT ==============

    get musicianControls() {
        return (this.cdForm.get('musiciansArray') as FormArray).controls;
    }


    onEdit(id) {
        const pathToCd = `cds/${id}`
        this.fsService.getDoc(pathToCd).pipe(take(1)).subscribe((cd: Cd) => {

            console.log(cd)
            this.cdForm.patchValue({
                title: cd.title
            })
            // return;
            // initialize array
            for (let i = 0; i < cd.musicians.length; i++) {
                this.musicianControls.push(this.fb.control(''));
            }
            // const musicians = cd.musicians
            this.musicianControls.forEach((control, index) => {
                console.log(control.value)
                control.setValue(
                    cd.musicians[index]
                )
                console.log(control.value)
            })
        })
    }

    // ============ musician ============

    musicians(): FormArray {
        return this.cdForm.get('musiciansArray') as FormArray;
    }

    addMusician() {
        this.musicians().push(this.newMusician());
    }

    get musiciansControls() {
        return (this.cdForm.get('musiciansArray') as FormArray).controls;
    }

    newMusician(): FormGroup {
        return this.fb.group({
            firstName: '',
            lastName: '',
            seqNr: '',
            instruments: this.fb.array([])
        });
    }


    removeMusician(empIndex: number) {
        this.musicians().removeAt(empIndex);
    }

    // ========== instrument ============

    instruments(empIndex: number): FormArray {
        // console.log(empIndex)
        return this.musicians()
            .at(empIndex)
            .get('instruments') as FormArray;
    }

    newInstrument(): FormGroup {
        return this.fb.group({
            instrument: '',
            seqNr: ''
        });
    }

    addInstrument(empIndex: number) {
        console.log(typeof (this.instruments))
        console.log(empIndex)
        this.instruments(empIndex).push(this.newInstrument());
    }

    removeInstrument(empIndex: number, skillIndex: number) {
        this.instruments(empIndex).removeAt(skillIndex);
    }

    // ========= reviews ==========

    reviews(): FormArray {
        return this.cdForm.get('reviews') as FormArray;
    }

    newReview(): FormGroup {
        return this.fb.group({
            review: '',
            seqNr: ''
        })
    }
    removeReview(index) {
        this.reviews().removeAt(index)
    }

    addReview() {
        this.reviews().push(this.newReview());
    }

    // ============ image ===============

    fileInputChange(event: any) {
        const imageFile: File = event.target.files[0]
        console.log(imageFile)
    }

    onStoreCd() {
        console.log(this.cdForm);
        const cd: Cd = {
            ...this.cdForm.value
        }
        const pathToCd = `cds`;
        this.fsService.addDoc(pathToCd, cd)
            .then((res: DocumentReference) => {
                console.log(`cd stored; ${res.id}`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to store cd; ${err.message}`)
            })
    }





}
