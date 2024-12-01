import { Component } from '@angular/core';
import { AddressFormComponent } from './address-form/address-form.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JsonPipe, NgFor } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-control-value-accessor',
    imports: [
        AddressFormComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgFor,
        MatDatepickerModule,
        MatCheckboxModule,
        JsonPipe
    ],
    templateUrl: './control-value-accessor.component.html',
    styleUrl: './control-value-accessor.component.scss'
})
export class ControlValueAccessorComponent {

    releaseDatePicker;

    courseCategories = [
        {
            code: '1',
            description: 'course 1'
        },
        {
            code: '2',
            description: 'course 2'
        },
        {
            code: '3',
            description: 'course 3'
        },

    ]

    constructor(private fb: FormBuilder) { }

    form = this.fb.group({
        title: ['', {
            validators: [
                Validators.required
            ]
        }],
        releasedAt: [new Date(), Validators.required],
        category: ['BEGINNER', Validators.requiredTrue],
        downloadsAllowed: [false, Validators.required],
        longDescription: ['', [Validators.required]],
        address: [null, Validators.required]
    })
}
