import { Component, computed, effect, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Person, SignalsFirestoreService } from './signals-firestore.service';
import { SnackbarService } from '../../../shared/snackbar.service';
import { FirebaseError } from '@angular/fire/app';
import { DocumentReference } from '@angular/fire/firestore';
import { JsonPipe } from '@angular/common';
import { FormComponent } from './form/form.component';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TemporaryModalComponent } from '../../../shared/temporary-modal/temporary-modal.component';
import { ConfirmService } from '../../../shared/confirm-dialog/confirm.service';



@Component({
    selector: 'app-udemy-signals',
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInput,
        JsonPipe,
        FormComponent,
        PersonsListComponent,
        MatProgressSpinnerModule,
        TemporaryModalComponent
    ],
    templateUrl: './udemy-signals.component.html',
    styleUrl: './udemy-signals.component.scss'


})
export class UdemySignalsComponent implements OnInit {

    form: FormGroup
    fb = inject(FormBuilder)
    sfs = inject(SignalsFirestoreService)
    sb = inject(SnackbarService)
    isLoading = signal<boolean>(false);
    cs = inject(ConfirmService)

    persons = signal<Person[]>([]);
    person = signal<Person>(null);
    personToEdit = signal<Person>(null);
    regularPerson: Person

    underFifty = computed(() => {
        const persons = this.persons();
        return persons.filter(person => person.age < 50);
    })
    fiftyAndUp = computed(() => {
        const persons = this.persons();
        return persons.filter(person => person.age >= 50);
    })

    ngOnInit(): void {
        console.log(this.person())
        this.isLoading.set(true)
        this.loadPersons()
            ;
    }

    constructor() {
        effect(() => {
            // console.log(this.underFifty()[0])
            // console.log(this.fiftyAndUp()[0])
            // console.log(this.person())
            console.log(this.personToEdit());
        })

    }

    async loadPersons() {
        this.isLoading.set(true)
        try {
            const persons = await this.sfs.collectionAsPromise(`persons`, 'age', 'asc')
            this.isLoading.set(false);

            this.persons.set(persons)

        } catch (err) {
            console.error(err)
        }
    }

    personToAdd = (person: Person) => {
        console.log(person)
        this.addPerson(person)
    }

    async addPerson(person) {
        this.isLoading.set(true)
        try {
            await this.sfs.addDoc('persons', person)
            this.sb.openSnackbar(`person added:`)
            this.isLoading.set(false)
            this.loadPersons();
        } catch (err) {
            console.error(err)
            this.sb.openSnackbar(`operation failed due to: ${err.message}`)
        }
    }

    personToUpdate = (person: Person) => {
        console.log(person);
        this.updatePerson(person);
    }

    async updatePerson(person: Person) {
        try {
            await this.sfs.setDocAsync(`persons/${person.id}`, person);
            this.loadPersons()
        } catch (err) {
            console.log(err)
        }
    }


    persionIdForDeletion = (id: string) => {
        this.deletePerson(id)
    }

    async deletePerson(id: string) {
        if (await this.getConfirmation(id)) {
            console.log('proceed');
            try {
                return await this.sfs.deleteDoc(`persons/${id}`)
                    .then((res) => {
                        console.log(res);
                        this.sb.openSnackbar(`person deleted`)
                        this.isLoading.set(false)
                        this.loadPersons()
                    })

            } catch (err) {
                this.sb.openSnackbar(`operation failed due to: ${err.message}`)
                this.isLoading.set(false)
            }
        } else {
            console.log('abort');
            this.sb.openSnackbar(`operation aborted by user`)
            this.isLoading.set(false);
        }
    }


    private async getConfirmation(doomedElement: any): Promise<boolean> {
        return this.cs.getConfirmation(doomedElement)
    }

    // async deletePerson(id: string) {
    //     this.isLoading.set(true)
    //     try {
    //         await this.sfs.deleteDoc(`persons/${id}`)
    //         this.sb.openSnackbar(`person deleted`)
    //         this.isLoading.set(false)
    //         this.loadPersons()
    //     } catch (err) {
    //         console.log(err)
    //     };
    // }

    personIdForUpdate = (id: string) => {
        this.getPersonGetDoc(id)
            // this.getPerson(id)
            .then((person: Person) => {
                console.log(person);
                this.sfs.personToEdit.emit(person);
            })
    }

    async getPerson(id: string) {
        return await this.sfs.getDocAsync(`persons/${id}`)
    }

    async getPersonGetDoc(id: string) {
        return await this.sfs.getTheDoc(`persons/${id}`)
    }
}
