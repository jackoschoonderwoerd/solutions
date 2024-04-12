import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FirestoreService } from '../../../shared/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { Consumption } from '../models';
import { Observable, take } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EngelbewaarderStore } from '../store/engelbewaarder.store';
import { JsonPipe } from '@angular/common';
import { STATE_SIGNAL } from '@ngrx/signals/src/state-signal';
import { signalState, signalStore } from '@ngrx/signals';
import { EngelbewaarderService } from '../services/engelbewaarder.service';
import { ConsumptionType } from '../types/models';

@Component({
    selector: 'app-consumption-details',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        JsonPipe,
        MatLabel
    ],
    templateUrl: './consumption-details.component.html',
    styleUrl: './consumption-details.component.scss'
})
export class ConsumptionDetailsComponent implements OnInit {
    fb = inject(FormBuilder);
    fsService = inject(FirestoreService)
    dialog = inject(MatDialog);
    store = inject(EngelbewaarderStore)
    ebService = inject(EngelbewaarderService)

    form: FormGroup;
    editConsumptionMode: boolean = false;


    // baseUrl = `firebase/firestore/array-remove/engelbewaarder`;
    baseUrl: string

    pathToConsumptionArray: string;
    consumptionsArray: Consumption[];


    indexForEdit: number;
    consumptionTypes: string[];
    consumptionTypes$: Observable<any>;
    consumptions$: Observable<any>;
    doomedConsumption: Consumption;


    selectedConsumptionTypeName: string;
    @ViewChild('consumptionTypeInput') public consumptionTypeInput: ElementRef;
    @ViewChild('consumption') public consumption: ElementRef

    ngOnInit(): void {
        this.baseUrl = this.ebService.getBaseUrl()
        this.initForm();
        if (this.store.selectedConsumption()) {
            this.setConsumptionForm(this.store.selectedConsumption())
        }
    }

    setConsumptionForm(consumption: Consumption) {
        this.doomedConsumption = consumption;
        this.form.setValue({
            ...consumption
        })
    }


    private initForm(): void {
        this.form = this.fb.group({
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
        this.store.toggleConsumptionDetailsComponentVisible(true)
        const formValue = this.form.value;
        const consumption: Consumption = {
            ...formValue
        }
        if (!this.editConsumptionMode) {
            this.addConsumption(consumption)

        } else {
            this.deleteConumption(this.doomedConsumption)
            this.addConsumption(consumption)
        }

    }

    onCancel() {
        console.log('cancel')
        this.store.toggleConsumptionDetailsComponentVisible(false)
        this.indexForEdit = null;
        this.form.reset();
        // this.store.showConsumptionDetailsComponentF(false)
        this.store.toggleConsumptionDetailsComponentVisible(false);
        this.store.consumptionSelected(null)
        // this.store.addingNewConsumptionF(false)
    }

    private addConsumption(consumption: Consumption): void {
        console.log(consumption)
        this.fsService.addElementToArray(`${this.baseUrl}/consumptions/${this.store.selectedConsumptionType().name}/details`, `consumptionDetailsArray`, consumption)
            .then((res: any) => {
                console.log(`element added to consumptionsArray`)
                this.form.reset();
            })
            .catch((err: FirebaseError) => console.log(`${err.message}`))
    }


    private updateConsuption(consumption: Consumption): void {
        // this.consumptionsArray[this.indexForEdit] = consumption;
        this.deleteConumption(consumption)
            .then((res: any) => {
                console.log(`consumption deleted; ${consumption.nameDutch}`)
                this.addConsumption(consumption);
            })
            .catch((err: FirebaseError) => console.error(err.message))
        // add new
        // this.updateArray(this.consumptionsArray);
    }

    private updateArray(newArray: Consumption[]): void {
        console.log(newArray)
        const object = { consumptionsArray: newArray }
        this.fsService.updateDoc(this.pathToConsumptionArray, object)
            .then((res: any) => {
                this.form.reset()
                this.indexForEdit = null;
                this.editConsumptionMode = false;
                console.log(`array updated`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to update array; ${err.message}`)
            })
    }
    private deleteConumption(consumption) {
        const path = `${this.baseUrl}/consumptions/${this.store.selectedConsumptionType().name}/details`
        return this.fsService.removeElementFromArray(path, 'consumptionDetailsArray', consumption)

    }

}
