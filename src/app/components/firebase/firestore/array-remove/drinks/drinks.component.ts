import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from '../../../../../shared/firestore.service';
import { FirebaseError } from '@angular/fire/app';
import { DocumentReference } from '@angular/fire/firestore';

interface DrinkType {
    name: string;
    drinks: string[]
}

@Component({
    selector: 'app-drinks',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule
    ],
    templateUrl: './drinks.component.html',
    styleUrl: './drinks.component.scss'
})
export class DrinksComponent implements OnInit {
    fb = inject(FormBuilder)
    drinkTypesForm: FormGroup
    editmode: boolean = false;
    fsService = inject(FirestoreService)

    constructor() {

    }
    ngOnInit(): void {
        const path = `firebase`
        this.getDocumentIdOfDoucmentThatContainsSubCollection(path, 'firestore')
            .then((id: string) => {
                console.log(id)
                return id
            })
            .then((id: string) => {
                console.log(id)
                const path = `firebase/${id}/firestore`
                return this.getDocumentIdOfDoucmentThatContainsSubCollection(path, 'array-remove')
            })
        // .then((id: string) => {
        //     console.log(id)
        // })
        // this.fsService.collection('firebase').subscribe(((documents: any[]) => {
        //     console.log(documents)
        //     const firestoreDocument = documents.find((document: any) => {
        //         return document.name === 'firestore'
        //     })
        //     this.fsService.collection(`firebase/${firestoreDocument.id}/array-remove`)
        //         .subscribe((data: any) => {
        //             if (data) {
        //                 console.log(data)
        //                 console.log(`collection "array-remove" exists`)
        //             }
        //         })
        // }))

        this.initDrinkTypeForm()
    }

    getDocumentIdOfDoucmentThatContainsSubCollection(path, subCollectionName) {
        const promise = new Promise((resolve, reject) => {
            this.fsService.collection(path).subscribe((documents: any) => {
                console.log(documents)
                const subCollection = documents.find(document => {
                    return document.name === subCollectionName

                });
                resolve(subCollection.id)
            })
        })
        return promise
    }

    initDrinkTypeForm() {
        this.drinkTypesForm = this.fb.group({
            name: new FormControl('spirits', [Validators.required])
        })
    }
    onAddDrinkType() {
        const pathToArrayRemoveCollection = `firebase/mlOmwZiN8extVXSo2YBp/array-remove/FT3s6vqZwvvLZI8nmnTR `
        // this.fsService.addSubcollection(pathToArrayRemoveCollection)
        const formValue = this.drinkTypesForm.value
        const drinkType: DrinkType = {
            name: formValue.name,
            drinks: []
        }
        console.log(drinkType);
        const path = `firebase/mlOmwZiN8extVXSo2YBp/array-remove/`
        this.fsService.addDoc(path, drinkType)
            .then((docRef: DocumentReference) => {
                console.log(`document added ;${docRef.path}`)
            })
            .catch((err: FirebaseError) => console.log(`failed to add document; ${err.message}`))
        // this.fsService.setDoc(path, drinkType)
        //     .then((docRef: any) => {
        //         console.log(`document added ;${docRef.path}`)
        //     })
        //     .catch((err: FirebaseError) => console.log(`failed to add document; ${err.message}`))
    }
}
