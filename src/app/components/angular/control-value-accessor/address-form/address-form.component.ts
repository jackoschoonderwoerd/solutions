import { JsonPipe } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-address-form',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, JsonPipe],
    templateUrl: './address-form.component.html',
    styleUrl: './address-form.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: AddressFormComponent
        }
    ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {

    @Input() legend: string;
    onTouched = () => { };

    onChangeSub: Subscription

    constructor(private fb: FormBuilder) { }

    form: FormGroup = this.fb.group({
        addressLine1: [null, [Validators.required]],
        addressLine2: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        city: [null, [Validators.required]]
    })

    registerOnChange(onChange: any): void {
        this.onChangeSub = this.form.valueChanges.subscribe(onChange);
    }

    writeValue(value: any) {
        if (value) {
            this.form.setValue(value)
        }
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    setDisabledState(disabled: boolean) {
        if (disabled) {
            this.form.disable();
        }
        else {
            this.form.enable();
        }
    }
    ngOnDestroy(): void {
        this.onChangeSub.unsubscribe();
    }



}
