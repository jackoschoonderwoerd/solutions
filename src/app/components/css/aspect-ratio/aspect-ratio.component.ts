import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-aspect-ratio',
    imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatLabel],
    templateUrl: './aspect-ratio.component.html',
    styleUrl: './aspect-ratio.component.scss'
})
export class AspectRatioComponent {
    fb = inject(FormBuilder);

    form = this.fb.group({
        width: [12, Validators.required],
        height: [6, Validators.required]
    })
    getAspectRatio() {
        const formValue = this.form.value;
        const aspectRatio: string = `aspect-ratio: ${formValue.width} / ${formValue.height};`
        return aspectRatio
    }
}
