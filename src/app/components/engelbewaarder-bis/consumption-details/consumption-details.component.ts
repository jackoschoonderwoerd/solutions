import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FirestoreService } from '../../../shared/firestore.service';
import { MatDialog } from '@angular/material/dialog';
// import { Consumption } from '../models';
import { FirebaseError } from '@angular/fire/app';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EngelbewaarderStore } from '../store/engelbewaarder.store';
import { JsonPipe } from '@angular/common';
import { EngelbewaarderService } from '../services/engelbewaarder.service';
import { Consumption, Course } from '../types/models';
import { MatCheckboxModule } from '@angular/material/checkbox';


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
        MatLabel,
        MatCheckboxModule
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
    editmode: boolean = false;
    baseUrl: string;
    consumptionsArray: Consumption[];
    doomedConsumption: Consumption;
    indexDoomedConsumption: number
    course: Course;


    ngOnInit(): void {
        this.ebService.consumptionChanged.subscribe((consumption: Consumption) => {
            this.editmode = true;
            this.setConsumptionForm(consumption)
        })
        this.ebService.courseChanged.subscribe((course: Course) => {
            this.course = course;
            this.indexDoomedConsumption = course.consumptions.findIndex((consumption: Consumption) => {
                return consumption.nameDutch === this.doomedConsumption.nameDutch
            })
        })
        this.baseUrl = this.ebService.getBaseUrl()
        this.initForm();
        if (this.store.consumption()) {
            this.editmode = true;
            // this.store.consumption()
            this.setConsumptionForm(this.store.consumption())
        }
        this.course = this.store.course();

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
            price: new FormControl(null, [Validators.required, Validators.pattern("\^([\\d]{0,4})(\\.|$)([\\d]{2,2}|)$")]),
            availableOutside: new FormControl(true, [Validators.required])
        })
    }

    onAddOrUpdateConsumption(): void {
        this.store.toggleConsumptionDetailsVisible(true)
        const formValue = this.form.value;
        console.log(formValue)
        console.log(formValue.nameDutch)
        console.log((formValue.nameDutch).toLowerCase())
        // return;
        const consumption: Consumption = {
            nameDutch: (formValue.nameDutch).toLowerCase(),
            nameEnglish: formValue.nameEnglish ? formValue.nameEnglish.toLowerCase() : null,
            descriptionDutch: formValue.descriptionDutch ? formValue.descriptionDutch.toLowerCase() : null,
            descriptionEnglish: formValue.descriptionEnglish ? formValue.descriptionEnglish.toLowerCase() : null,
            alcoholPercentage: formValue.alcoholPercentage,
            vessel: formValue.vessel,
            volume: formValue.volume,
            price: formValue.price,
            availableOutside: formValue.availableOutside

        }
        if (!this.editmode) {
            this.addConsumption(consumption)

        } else {
            // ! GET THE ARRAY AND
            // ! REPLACE THE ELEMENT
            this.course.consumptions[this.indexDoomedConsumption] = consumption;
            const path = `${this.baseUrl}/${this.course.id}`
            // ! UPDATE THE ARRAY IN FIRESTORE

            this.fsService.updateField(path, 'consumptions', this.course.consumptions)
                .then((res: any) => {
                    console.log(`field updated`)
                    this.store.toggleConsumptionDetailsVisible(false);
                    this.doomedConsumption = null;
                    this.store.consumptionSelected(null);
                })
                .catch((err: FirebaseError) => {
                    console.error(`failed to update field`);
                });
        }

    }

    onCancel() {
        console.log('cancel')
        this.store.toggleConsumptionDetailsVisible(false)

        this.form.reset();
        // this.store.showConsumptionDetailsComponentF(false)
        this.store.consumptionSelected(null)
        // this.store.addingNewConsumptionF(false)
    }

    private addConsumption(consumption: Consumption): void {
        console.log(consumption)
        this.fsService.addElementToArrayF(`${this.baseUrl}/${this.store.course().id}`, `consumptions`, consumption)
            .then((res: any) => {
                this.form.reset();
                this.store.toggleConsumptionDetailsVisible(false);
                console.log(`element added to consumptionsArray`)

            })
            .catch((err: FirebaseError) => console.log(`${err.message}`))
    }


    private deleteConsumption(doomedConsumption: Consumption) {
        const path = `${this.baseUrl}/${this.store.course().id}`
        return this.fsService.removeElementFromArray(path, 'consumptions', doomedConsumption)

    }

}
