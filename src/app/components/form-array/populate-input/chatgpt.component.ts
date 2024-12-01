import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-chatgpt',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './chatgpt.component.html',
    styleUrl: './chatgpt.component.scss'
})
export class ChatgptComponent {

    myForm: FormGroup;
    show: boolean = false

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        // Initialize your form and form array
        this.myForm = this.fb.group({
            myFormArray: this.fb.array([]),
        });

        // Add some controls to the form array initially
        setTimeout(() => {
            // this.show = true
        }, 1000);
    }

    // Getter for the form array
    get controls() {
        return (this.myForm.get('myFormArray') as FormArray).controls;
    }

    // Function to set values for the form array
    setFormArrayValues() {
        this.show = true
        const newValues = ['XXXXXXXXXX 1', 'YYYYYYYYYY 2', 'ZZZZZZZZZZZ 33'];
        for (let i = 0; i < newValues.length; i++) {
            this.controls.push(this.fb.control(''));
        }

        // Use setValue to set values for each control in the form array
        this.controls.forEach((control, index) => {
            console.log(control.value)
            control.setValue(newValues[index]);
            console.log(control.value)
        });
    }
    onSubmit() {
        console.log(this.myForm.value)
    }
}
