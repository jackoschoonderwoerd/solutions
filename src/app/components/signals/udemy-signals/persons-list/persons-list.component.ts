import { Component, EventEmitter, inject, Input, input, Output, signal } from '@angular/core';
import { Person } from '../signals-firestore.service';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ConfirmService } from '../../../../shared/confirm-dialog/confirm.service';

@Component({
    selector: 'app-persons-list',
    imports: [JsonPipe, MatIconModule, MatCardModule],
    templateUrl: './persons-list.component.html',
    styleUrl: './persons-list.component.scss'
})



export class PersonsListComponent {



    header = input<string>();
    persionIdForDeletion = input<(id: string) => void>();
    personIdForEdit = input<(id: string) => void>();
    persons = input.required<Person[]>();
    cs = inject(ConfirmService)

    onDeletePerson(id) {
        // this.idPersonDeleted.emit(id);
        this.persionIdForDeletion()?.(id);
    }
    onEditPerson(id) {
        this.personIdForEdit()?.(id)
    }
}
