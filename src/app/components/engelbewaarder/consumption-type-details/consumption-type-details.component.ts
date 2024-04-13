import { Component, inject, OnInit } from '@angular/core';
import { EngelbewaarderStore } from '../store/engelbewaarder.store';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConsumptionType } from '../types/models';
import { FirestoreService } from '../../../shared/firestore.service';
import { EngelbewaarderService } from '../services/engelbewaarder.service';
import { FirebaseError } from '@angular/fire/app';

@Component({
    selector: 'app-course-details',
    standalone: true,
    imports: [
        JsonPipe,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule],
    templateUrl: './consumption-type-details.component.html',
    styleUrl: './consumption-type-details.component.scss'
})
export class ConsumptionTypeDetailsComponent implements OnInit {
    store = inject(EngelbewaarderStore)
    fb = inject(FormBuilder)
    form: FormGroup;
    fsService = inject(FirestoreService);
    ebService = inject(EngelbewaarderService)

    baseUrl: string;
    editmode: boolean = false;
    selectedType: ConsumptionType;

    ngOnInit(): void {
        this.baseUrl = this.ebService.getBaseUrl();
        this.initForm();
        if (this.store.selectedConsumptionType()) {
            this.patchForm(this.store.selectedConsumptionType())
        }
    }

    initForm() {
        this.form = this.fb.group({
            name: new FormControl(null, [Validators.required]),
            showNameDutch: new FormControl(true),
            showNameEnglish: new FormControl(false),
            showDescriptionDutch: new FormControl(false),
            showDescriptionEnglish: new FormControl(false),
            showAlcoholPercentage: new FormControl(false),
            showVolume: new FormControl(false),
            showVessel: new FormControl(false),
            showPrice: new FormControl(true)
        })

    }
    onSubmitForm() {
        const formValue = this.form.value
        const consumptionType: ConsumptionType = {
            name: formValue.name,
            consumptionTypeInputsVisibility:
            {
                nameDutchVisible: formValue.showNameDutch,
                nameEnglishVisible: formValue.showNameEnglish,
                descriptionDutchVisible: formValue.showDescriptionDutch,
                descriptionEnglishVisible: formValue.showDescriptionEnglish,
                alcoholPercentageVisible: formValue.showAlcoholPercentage,
                volumeVisible: formValue.showVolume,
                vesselVisible: formValue.showVessel,
                priceVisible: formValue.showPrice
            }

        }
        // console.log(consumptionType)
        this.updateConsumptionTypesArray(consumptionType);
    }
    private patchForm(consumptionType: ConsumptionType) {
        console.log(consumptionType)
        this.form.patchValue({
            name: consumptionType.name,
            shownameDutch: consumptionType.consumptionTypeInputsVisibility ? consumptionType.consumptionTypeInputsVisibility.nameDutchVisible : true,
            showNameEnglish: consumptionType.consumptionTypeInputsVisibility ? consumptionType.consumptionTypeInputsVisibility.nameEnglishVisible : false,
            showDescriptionDutch: consumptionType.consumptionTypeInputsVisibility ? consumptionType.consumptionTypeInputsVisibility.descriptionDutchVisible : false,
            showDescriptionEnglish: consumptionType.consumptionTypeInputsVisibility ? consumptionType.consumptionTypeInputsVisibility.descriptionEnglishVisible : false,
            showAlcoholPercentage: consumptionType.consumptionTypeInputsVisibility ? consumptionType.consumptionTypeInputsVisibility.alcoholPercentageVisible : false,
            showVolume: consumptionType.consumptionTypeInputsVisibility ? consumptionType.consumptionTypeInputsVisibility.volumeVisible : false,
            showVessel: consumptionType.consumptionTypeInputsVisibility ? consumptionType.consumptionTypeInputsVisibility.vesselVisible : false,
            showPrice: consumptionType.consumptionTypeInputsVisibility ? consumptionType.consumptionTypeInputsVisibility.priceVisible : true
        })
    }

    updateConsumptionTypesArray(consumptionType: ConsumptionType) {
        const path = `${this.baseUrl}/consumptions`
        if (!this.store.selectedConsumptionType()) {
            console.log('!editmode; add!')
            this.fsService.addElementToArray(path, 'consumptionTypes', consumptionType)
                .then((res: any) => {
                    console.log(res)
                    // create collection / with empty consumptionsArray
                    const doc = { consumptionDetailsArray: [] }
                    this.fsService.setDoc(`${this.baseUrl}/consumptions/${consumptionType.name}/details`, doc)
                        .then((res: any) => {
                            this.form.reset();
                            console.log(res)
                            this.store.toggleConsumptionTypeDetailsComponentVisible(false);
                        })
                        .catch((err: FirebaseError) => console.error(err.message))

                })
                .catch((err: FirebaseError) => console.error(err.message))
        } else {
            console.log('editmode; update')
            const doomedConsumptionType = this.store.selectedConsumptionType();
            const path = `${this.baseUrl}/consumptions`
            this.fsService.removeElementFromArray(path, 'consumptionTypes', doomedConsumptionType)
                .then((res) => {
                    console.log(res)
                    this.fsService.addElementToArray(path, 'consumptionTypes', consumptionType)
                })
                .catch((err: FirebaseError) => {
                    console.error((err.message))
                    return err.message;
                })
                .then((res: any) => {
                    console.log(res)
                    this.store.toggleConsumptionTypeDetailsComponentVisible(false)
                })
                .catch((err: FirebaseError) => {
                    console.error(err.message)
                })
        }
    }

    onCancel() {
        // this.ebService.consumptionTypeChanged.emit(null)
        this.store.consumptionTypeSelected(null);
        this.store.toggleConsumptionTypeDetailsComponentVisible(false);
    }
    // onSubmitForm() {
    //     console.log(this.form.value)
    // }
}
