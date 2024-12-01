import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-filename-dialog',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatButtonModule, MatDialogModule],
    templateUrl: './filename-dialog.component.html',
    styleUrl: './filename-dialog.component.scss'
})
export class FilenameDialogComponent implements OnInit {
    form: FormGroup
    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.initForm()
    }
    initForm() {
        this.form = this.fb.group({
            fileName: new FormControl(null, [Validators.required])

        })
    }
}
