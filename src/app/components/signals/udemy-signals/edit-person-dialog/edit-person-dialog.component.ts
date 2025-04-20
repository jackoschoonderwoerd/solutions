import { Component, effect, inject, signal } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EditPersonDialogData } from '../models/edit-person-dialog-data.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AgeCategory } from '../models/age-category.model';
import { firstValueFrom } from 'rxjs';
import { Person } from '../models/person.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { SelectCategoryComponent } from '../select-category/select-category.component';
import { ReligionCategory } from '../models/religion-category.model';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { SnackbarService } from '../../../../shared/snackbar.service';
import { DocumentReference } from '@angular/fire/firestore';
import { SignalsFirestoreService } from '../signals-firestore.service';

@Component({
    selector: 'app-edit-person-dialog',
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatInput,
        ReactiveFormsModule,
        // SelectCategoryComponent,
        MatSelectModule,
        MatOptionModule
    ],
    templateUrl: './edit-person-dialog.component.html',
    styleUrl: './edit-person-dialog.component.scss'
})
export class EditPersonDialogComponent {

    dialogRef = inject(MatDialogRef<EditPersonDialogComponent>)

    data: EditPersonDialogData = inject(MAT_DIALOG_DATA)

    fb = inject(FormBuilder)

    sb = inject(SnackbarService)

    form = this.fb.group({
        name: [''],
        age: [0],
        religion: []
    });

    sfs = inject(SignalsFirestoreService)

    category = signal<ReligionCategory>('CATHOLIC');

    constructor() {
        console.log(this.data)
        if (this.data.person) {
            this.patchForm(this.data.person)
        }

        this.category.set(this.data?.person?.religion ?? 'CATHOLIC')
        effect(() => {
            console.log(`Person category bi-directional ${this.category()}`)
        })
    }
    onClose() {
        this.dialogRef.close({ title: 'Hello world' })
    }

    patchForm(person) {
        this.form.patchValue({
            name: person.name,
            age: person?.age,
            religion: person?.religion ? person?.religion : 'CATHOLIC'
        })
    }

    async onAddOrUpdate() {
        const personProps =
            this.form.value as Partial<Person>;
        console.log(personProps)
        if (this.data?.mode === 'update') {
            await this.updatePerson(
                this.data?.person!.id,
                personProps
            )
        } else if (this.data?.mode === 'create') {
            await this.addPerson(
                personProps
            )
        }
    }

    async updatePerson(personId: string, changes: Partial<Person>) {
        try {
            const updatedPerson = await this.sfs.updateDocReturnsUpdatedDocument(`persons/${personId}`, changes)
            this.sb.openSnackbar(`person updated: ${updatedPerson}`)
            this.dialogRef.close(updatedPerson);
        }
        catch (err) {
            console.error(err)
            this.sb.openSnackbar(`operation failed due to: ${err}`)
        }
    }
    async addPerson(personProps: Partial<Person>) {
        try {
            const addedPerson: Person = await this.sfs.addDocReturnsTheNewElement(`persons`, personProps)
            this.dialogRef.close(addedPerson)

        } catch (err) {
            console.log(err)
            this.sb.openSnackbar(`operation failed due to: ${err}`)
        }
    }

}

export async function openEditPersonDialog(
    dialog: MatDialog,
    data: EditPersonDialogData): Promise<any> {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "100vw";
    config.height = "100vh";
    config.panelClass = 'full-screen-dialog';
    config.maxWidth = "100vw";
    config.maxHeight = '100vh';
    config.data = data;

    const close$ = dialog.open(
        EditPersonDialogComponent,
        config)
        .afterClosed();

    return firstValueFrom(close$);
}
