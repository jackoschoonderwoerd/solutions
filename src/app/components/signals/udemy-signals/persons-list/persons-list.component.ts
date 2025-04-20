import { Component, EventEmitter, inject, Input, input, output, Output, signal } from '@angular/core';

import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ConfirmService } from '../../../../shared/confirm-dialog/confirm.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditPersonDialogComponent, openEditPersonDialog } from '../edit-person-dialog/edit-person-dialog.component';
import { Person } from '../models/person.model';
import { EditPersonDialogData } from '../models/edit-person-dialog-data.model';
import { firstValueFrom } from 'rxjs';
import { SignalsFirestoreService } from '../signals-firestore.service';


@Component({
    selector: 'app-persons-list',
    imports: [MatIconModule, MatCardModule],
    templateUrl: './persons-list.component.html',
    styleUrl: './persons-list.component.scss'
})



export class PersonsListComponent {



    header = input<string>();
    persionIdForDeletion = input<(id: string) => void>();
    personIdForEdit = input<(id: string) => void>();

    persons = input.required<Person[]>();
    personUpdated = output<Person>();
    personDeleted = output<string>();

    cs = inject(ConfirmService)
    dialog = inject(MatDialog);
    sfs = inject(SignalsFirestoreService)

    onDeletePerson(person) {
        console.log('deleting')
        // this.idPersonDeleted.emit(id);
        // this.persionIdForDeletion()?.(person.id);
        // await this.sfs.deleteDoc(person.id)
        this.personDeleted.emit(person.id);
    }

    onEditPerson(id) {
        this.personIdForEdit()?.(id)
    }

    async onEditPersonVasco(person: Person) {
        const newPerson = await openEditPersonDialog(
            this.dialog,
            {
                mode: 'update',
                person
            }
        )
        if (!newPerson) {
            return;
        }
        console.log(`Person updated: `, newPerson)
        this.personUpdated.emit(newPerson)
    }
}


