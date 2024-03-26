import { Component, OnInit, inject } from '@angular/core';
import { FirestoreService } from '../../../../shared/firestore.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ShowCodeComponent } from '../../../../shared/show-code/show-code.component';

interface Person {
    id?: string;
    name: string;
    phone: string;
}

@Component({
    selector: 'app-update-doc',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInput,
        ShowCodeComponent
    ],
    templateUrl: './update-doc.component.html',
    styleUrl: './update-doc.component.scss'
})
export class UpdateDocComponent implements OnInit {

    fsService = inject(FirestoreService);
    baseUrl = `firebase`;
    persons$: Observable<Person[]>
    pathToUpdateDoc: string;
    fb = inject(FormBuilder)
    form: FormGroup;
    firestoreCollectionId: string;
    updateDocCollectionId: string;
    updateDocId: string;
    editmode: boolean = false;
    updatingName: boolean = false;
    updatingPhone: boolean = false;
    personId: string = ''
    snippet_1: string = `this.fsService.updateDoc(pathToPerson, { name: person.name })`;
    response: string = '';


    ngOnInit(): void {
        this.initForm()
        // check for document with the name 'firestore
        this.fsService.collection('firebase').subscribe((documents: any[]) => {
            console.log(documents);
            const firestoreCollection: any = documents.find((document: any) => {
                return document.name === 'firestore'
            })
            if (firestoreCollection) {
                console.log(firestoreCollection)
                this.firestoreCollectionId = firestoreCollection.id
                const pathToUpdateCollection = `firebase/${firestoreCollection.id}/update-doc`
                this.fsService.collection(pathToUpdateCollection).subscribe((documents: any) => {
                    if (documents.length) {
                        console.log(documents)
                        this.baseUrl = `firebase/${firestoreCollection.id}/update-doc`
                        this.getPersons(this.baseUrl)
                    } else {
                        console.log('no documents')
                        this.addUpdateDocToFirestore(firestoreCollection.id)
                            .then((res: DocumentReference) => {
                                console.log(res)
                                this.baseUrl = `firebase/${firestoreCollection.id}/update-doc`
                                this.getPersons(this.baseUrl)
                            })
                    }
                })
            }

        })
    }
    initForm() {
        this.form = this.fb.group({
            name: new FormControl(
                null, [Validators.required]),
            phone: new FormControl(
                null, [Validators.required])
        })
    }
    onSubmitForm() {
        console.log(this.form.value)
        const formValue = this.form.value;
        const person: Person = {
            name: formValue.name,
            phone: formValue.phone
        }
        this.addPerson(person)
    }

    getPersons(path) {
        this.persons$ = this.fsService.collection(path)
    }

    addPerson(person: Person) {
        this.fsService.addDoc(this.baseUrl, person)
            .then((docRef: DocumentReference) => {
                // console.log(`document added; ${JSON.stringify(docRef)}`)
            })
            .catch((err: FirebaseError) => {
                // console.log(`failed to add document; ${err.message}`)
            })
    }



    addFirestoreToFirebase() {

        const doc = { name: 'firestore' }
        return this.fsService.addDoc(this.baseUrl, doc)
    }

    addUpdateDocToFirestore(firestoreId: string) {
        console.log('adding update-doc')
        const path = `${this.baseUrl}/${firestoreId}/update-doc`
        const doc = { name: 'updateDoc' }

        return this.fsService.addDoc(path, doc)

    }

    addDoc(person) {
        const path = `${this.baseUrl}`;
        return this.fsService.addDoc(path, person)
    }
    onEdit(id: string, property) {
        this.personId = id;
        console.log(property)
        this.updatingName = false;
        this.updatingPhone = false;
        this.editmode = false
        const pathToPerson = `firebase/${this.firestoreCollectionId}/update-doc/${id}`
        this.fsService.getDoc(pathToPerson).pipe(take(1)).subscribe((person: Person) => {
            // console.log(person)
            this.patchForm(person)
        })
        if (property === 'name') {
            this.updatingName = true;
            this.updatingPhone = false;
            this.editmode = false
            this.form.get('phone').disable();
            this.form.get('name').enable()

        } else if (property === 'phone') {
            this.updatingName = false;
            this.updatingPhone = true;
            this.editmode = false
            this.form.get('name').disable();
            this.form.get('phone').enable();

        } else if (property === 'person') {
            this.updatingPhone = false;
            this.updatingName = false;
            this.editmode = true
            this.form.get('name').enable();
            this.form.get('phone').enable();
        }
    }

    onClearForm() {
        this.form.reset();
        this.editmode = false;
        this.updatingName = false;
        this.updatingPhone = false;
    }

    patchForm(person: Person) {
        // this.editmode = true;
        this.form.patchValue(person)
    }

    onDelete(personId: string) {
        const path = `firebase/${this.firestoreCollectionId}/update-doc/${personId}`;
        this.fsService.deleteDoc(path)
            .then((res: any) => {
                console.log(`document deleted; ${res}`)
                this.response = `document deleted; ${res}`
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to delete document; ${err.message}`)
                this.response = `failed to delete document; ${err.message}`
            })
    }
    onSubmit() {
        const formValue = this.form.value
        const person: Person = {
            ...formValue
        }
        const pathToPerson = `firebase/${this.firestoreCollectionId}/update-doc/${this.personId}`
        if (this.editmode) {
            console.log('editmode')
            this.fsService.updateDoc(pathToPerson, person)
                .then((res: any) => {
                    console.log(`document updated; ${res}`)
                    this.response = `document updated; ${res}`;
                    this.form.reset();
                })
                .catch((err: FirebaseError) => {
                    this.response = `failed to update document; ${err.message}`
                })
        } else if (this.updatingName) {
            console.log('update name')
            this.fsService.updateDoc(pathToPerson, { name: person.name })
                .then((res: any) => {
                    console.log(`person name updated; ${res}`)
                    this.response = `person name updated; ${res}`
                    this.form.reset();
                })
                .catch((err: FirebaseError) => {
                    this.response = `failed to update person name; ${err.message}`
                })
        } else if (this.updatingPhone) {
            console.log('update phone')
            this.fsService.updateDoc(pathToPerson, { phone: person.phone })
                .then((res: any) => {
                    console.log(`person phone updated; ${res}`)
                    this.response = `person phone updated; ${res}`
                    this.form.reset();
                })
                .catch((err: FirebaseError) => {
                    this.response = `failed to update person phone; ${err.message}`
                })
        } else {
            console.log('add person')
            const pathToUpdateDoc = `firebase/${this.firestoreCollectionId}/update-doc`
            this.fsService.addDoc(pathToUpdateDoc, person)
                .then((docRef: DocumentReference) => {
                    console.log(`person added to update-doc; ${docRef.path}`)
                    this.response = `person added to update-doc; ${docRef.path}`
                    this.form.reset();
                })
                .catch((err: FirebaseError) => {
                    this.response = `failed to add document; ${err.message}`
                })
        }
    }

}
