import { Component, effect, EventEmitter, inject, input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Person, SignalsFirestoreService } from '../signals-firestore.service';

@Component({
    selector: 'app-form',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInput, MatIconModule],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

    form: FormGroup
    fb = inject(FormBuilder);
    sfs = inject(SignalsFirestoreService)
    editmode: boolean = false
    person = input<Person>();

    personToEdit = input<(person: Person) => void>();
    personToUpdate = input<(person: Person) => void>();


    personToAdd = input<(person: Person) => void>()
    personId: string;



    constructor() {
        this.form = this.fb.group({
            name: new FormControl(null, [Validators.required],),
            age: new FormControl(null, [Validators.required])
        })
        this.patchForm();
        console.log(this.person());
        console.log(this.personToEdit())
        effect(() => {
            console.log(this.personToEdit())
            console.log(this.person());

            // this.patchFormAge(this.personToEdit().)
        })
    }

    ngOnInit(): void {
        this.sfs.personToEdit.subscribe((person: Person) => {
            this.editmode = true;
            console.log(person)
            this.personId = person.id
            this.patchFormName(person.name)
            this.patchFormAge(person.age)
        })
    }

    patchForm() {
        this.patchFormAge(this.createIntegerBetweenZeroAndOneHundred())
        this.patchFormName(this.generateRandomName())

    }

    onSubmit() {
        const person: Person = {
            ...this.form.value,
        }
        if (!this.editmode) {
            this.patchForm()
            this.personToAdd()?.(person)
        } else {
            person.id = this.personId
            this.personToUpdate()?.(person)
        }
        // this.personAdded.emit(person)
        // this.createIntegerBetweenZeroAndOneHundred()
    }
    createIntegerBetweenZeroAndOneHundred() {
        return Math.floor(Math.random() * 100)
    }

    patchFormAge(age: number) {
        this.form.patchValue({
            age: age
        })
    }
    patchFormName(name) {
        this.form.patchValue({
            name
        })
    }

    generateRandomName() {
        const syllables = ["la", "ne", "ri", "do", "mi", "ka", "ze", "ta", "bo", "lu"];
        const nameLength = Math.floor(Math.random() * 3) + 2; // 2 to 4 syllables
        let name = "";

        for (let i = 0; i < nameLength; i++) {
            name += syllables[Math.floor(Math.random() * syllables.length)];
        }

        return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize
    }
}
