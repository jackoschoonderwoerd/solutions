import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { EditPersonDialogData } from './models/edit-person-dialog-data.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { openEditPersonDialog } from './edit-person-dialog/edit-person-dialog.component';
import { Person } from './models/person.model';
import { PersonsListComponent } from './persons-list/persons-list.component';

import { SnackbarService } from '../../../shared/snackbar.service';
import { TemporaryModalComponent } from '../../../shared/temporary-modal/temporary-modal.component';
import { LoadingService } from '../../../shared/loading/loading.service';
import { MessagesComponent } from './messages/messages.component';
import { MessagesService } from './messages/messages.service';
import { SignalsFirestoreService } from './signals-firestore.service';



@Component({
    selector: 'app-udemy-signals',
    imports: [
        MatButtonModule,
        MatProgressSpinnerModule,
        PersonsListComponent,
        TemporaryModalComponent,
        MessagesComponent
    ],
    templateUrl: './udemy-signals.component.html',
    styleUrl: './udemy-signals.component.scss'


})
export class UdemySignalsComponent implements OnInit {

    sfs = inject(SignalsFirestoreService)
    sb = inject(SnackbarService)
    isLoading = signal<boolean>(false);
    #persons = signal<Person[]>([]);
    person = signal<Person>(null);
    personToEdit = signal<Person>(null);
    dialog = inject(MatDialog);
    loadingService = inject(LoadingService);
    messagesService = inject(MessagesService)


    protestant = computed(() => {
        const persons = this.#persons();
        return persons.filter(person => person.religion === 'PROTESTANT');
    })
    catholic = computed(() => {
        const persons = this.#persons();
        return persons.filter(person => person.religion === 'CATHOLIC');
    })

    ngOnInit(): void {
        // this.isLoading.set(true)
        this.loadPersons();
    }

    constructor() {
        // effect(() => {
        //     console.log(this.personToEdit());
        // })
    }

    async loadPersons() {
        // this.isLoading.set(true)
        this.loadingService.loadingOn();
        try {
            const persons = await this.sfs.collectionAsPromise(`persons`, 'age', 'asc');
            console.log(persons)
            this.#persons.set(persons);
            setTimeout(() => {

                this.loadingService.loadingOff();
            }, 1000);
            this.sb.show('persons loaded')
        } catch (err) {
            this.messagesService.showMessage(`error loading persons`, 'error')
            console.error(err)
            this.sb.show(`action failed due to: ${err}`)
        } finally {
        }
    }

    async onAddPerson() {
        const data: EditPersonDialogData = {
            mode: 'create',
        }

        const newPerson = await openEditPersonDialog(this.dialog, data)
        const newPersons = [
            ...this.#persons(),
            newPerson
        ];

        this.#persons.set(newPersons);
    }

    onPersonUpdated(updatedPerson: Person) {
        console.log(updatedPerson)
        const persons = this.#persons();
        const newPersons = persons.map(person => (
            person.id === updatedPerson.id ? updatedPerson : person
        ));
        this.#persons.set(newPersons)
    }

    async onPersonDeleted(personId: string) {
        console.log(personId)
        try {
            await this.sfs.deleteDoc(`persons/${personId}`)
            const persons = this.#persons();
            const newPersons = persons.filter(person => {
                return person.id !== personId
            })
            this.#persons.set(newPersons)
        } catch (err) {
            console.log(err);
            this.sb.openSnackbar(`error deleting course`)
        }
    }
}
