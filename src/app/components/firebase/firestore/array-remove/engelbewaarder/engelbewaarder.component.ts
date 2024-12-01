import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from '../../../../../shared/firestore.service';
import { FirebaseError } from '@angular/fire/app';
import { Cons, Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { WarnDialogComponent } from '../../../../../shared/warn-dialog/warn-dialog.component';

import { MatSelectModule } from '@angular/material/select';
import { Consumption } from './models';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Spirit {
    name: string;
    price: number;
}

@Component({
    selector: 'app-engelbewaarder',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        CommonModule,
        MatSelectModule
    ],
    templateUrl: './engelbewaarder.component.html',
    styleUrl: './engelbewaarder.component.scss'
})
export class EngelbewaarderComponent implements OnInit {
    fb = inject(FormBuilder);
    fs = inject(FirestoreService)
    dialog = inject(MatDialog);

    consumptionForm: FormGroup;
    editConsumptionMode: boolean = false;


    baseUrl = `firebase/firestore/array-remove/engelbewaarder`;

    pathToConsumptionArray: string;
    consumptionsArray: Consumption[];
    // consumptionArray: Consumption[];

    indexForEdit: number;
    consumptionTypes: string[];
    consumptionTypes$: Observable<any>;
    consumptions$: Observable<any>

    selectedConsumptionTypeName: string;
    @ViewChild('consumptionTypeInput') public consumptionTypeInput: ElementRef


    ngOnInit(): void {
        this.getConsumptionTypes();
        this.initConsumptionsForm();
    }

    onSelectConsumptionType(selectedConsumptionTypeName: string) {
        this.indexForEdit = null;
        this.consumptionForm.reset()
        this.selectedConsumptionTypeName = selectedConsumptionTypeName
        this.pathToConsumptionArray = `${this.baseUrl}/drinks/${this.selectedConsumptionTypeName}`
        this.fs.getDoc(this.pathToConsumptionArray).subscribe((data: any) => {
            if (data) {
                this.consumptionsArray = data.consumptionsArray;
                console.log(this.consumptionsArray)
                this.consumptions$ = this.fs.getDoc(this.pathToConsumptionArray);
            } else {
                console.log('no data')
            }
        })

    }

    onConsumptionTypeInputChange(e: any) {
        if (e.key === 'Enter') {
            const arrayName = 'consumptionTypesArray'
            const value = { name: e.target.value }
            console.log(value)
            this.fs.addElementToArray(this.baseUrl, arrayName, value)
                .then((res: any) => {
                    console.log(res)
                    this.consumptionTypeInput.nativeElement.value = null
                    // add document to 'drinks'
                    const doc = { consumptionsArray: [] }
                    this.fs.setDoc(`${this.baseUrl}/drinks/${value.name}`, doc)
                        .then((res: any) => console.log(res))
                        .catch((err: FirebaseError) => console.log(`failed to add doc ${err.message}`))
                })
                .catch((err: FirebaseError) => console.log(`failure; ${err.message}`));
        } else {
            return;
        }
    }

    onDeleteConsuptionType(consumptionType) {
        const dialogRef = this.dialog.open(WarnDialogComponent, {
            data: {
                message: `this will premanently delete <p><strong>${consumptionType.name}</strong></p> from de database`
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {


                const arrayName = 'consumptionTypesArray'
                this.fs.removeElementFromArray(this.baseUrl, arrayName, consumptionType)
                    .then((res: any) => console.log(`element removed from array`))
                    .catch((err: FirebaseError) => console.log(`failed to remove element from array; ${err.message}`))
            } else {
                return
            }
        })
    }

    getConsumptionTypes() {
        this.consumptionTypes$ = this.fs.getDoc(this.baseUrl)
    }


    private initConsumptionsForm(): void {
        this.consumptionForm = this.fb.group({
            nameDutch: new FormControl(null, [Validators.required]),
            nameEnglish: new FormControl(null),
            descriptionDutch: new FormControl(null),
            descriptionEnglish: new FormControl(null),
            alcoholPercentage: new FormControl(null),
            vessel: new FormControl(null),
            volume: new FormControl(null),
            price: new FormControl(null, [Validators.required, Validators.pattern("\^([\\d]{0,4})(\\.|$)([\\d]{2,2}|)$")])
        })
    }

    onAddOrUpdateConsumption(): void {
        const formValue = this.consumptionForm.value;
        const consumption: Consumption = {
            ...formValue
        }
        if (!this.editConsumptionMode) {
            this.addConsumption(consumption)

        } else {
            this.updateConsuption(consumption)
        }
    }

    onCancel() {
        this.indexForEdit = null;
        this.consumptionForm.reset();
    }

    private addConsumption(consumption: Consumption): void {

        this.fs.addElementToArray(this.pathToConsumptionArray, `consumptionsArray`, consumption)
            .then((res: any) => {
                console.log(`element added to consumptionsArray`)
                this.consumptionForm.reset();
            })
            .catch((err: FirebaseError) => console.log(`${err.message}`))
    }

    private updateConsuption(consumption: Consumption): void {
        this.consumptionsArray[this.indexForEdit] = consumption;
        this.updateArray(this.consumptionsArray);
    }

    onDelete(consumption: Consumption): void {
        const dialogRef = this.dialog.open(WarnDialogComponent, {
            data: {
                message: `This will permanently remove the consumption from de db`
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                this.fs.removeElementFromArray(this.pathToConsumptionArray, 'consumptionsArray', consumption)
                    .then((res: any) => {
                        console.log(`element removed from array; ${res}`);
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to remove element from array ${err.message}`);
                    })

            } else {
                return;
            }
        })
    }

    onEdit(consumption: Consumption, index: number): void {
        this.indexForEdit = index
        this.editConsumptionMode = true;
        this.consumptionForm.setValue({
            ...consumption
        })
    }

    onMoveUp(selectedConsumption: Consumption): void {
        const index = this.consumptionsArray.findIndex((consumption: Consumption) => {
            return consumption.nameDutch === selectedConsumption.nameDutch
        })
        if (index != 0) {
            this.swapElements(index, index - 1)
        }
    }

    onMoveDown(selectedConsumption: Consumption): void {
        const index = this.consumptionsArray.findIndex((consumption: Consumption) => {
            return consumption.nameDutch === selectedConsumption.nameDutch
        })
        if (index !== this.consumptionsArray.length - 1) {
            this.swapElements(index, index + 1)
        }
    }

    private swapElements(i, j): void {
        console.log(i, j)
        const newArray: Consumption[] = [...this.consumptionsArray];
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        this.updateArray(newArray)
    }

    private updateArray(newArray: Consumption[]): void {
        console.log(newArray)
        const object = { consumptionsArray: newArray }
        this.fs.updateDoc(this.pathToConsumptionArray, object)
            .then((res: any) => {
                this.consumptionForm.reset()
                this.indexForEdit = null;
                this.editConsumptionMode = false;
                console.log(`array updated`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to update array; ${err.message}`)
            })
    }
}
