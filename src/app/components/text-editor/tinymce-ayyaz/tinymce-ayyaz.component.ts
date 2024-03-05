import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
// import tinymce from 'tinymce';
// import 'tinymce/icons/default';
// import 'tinymce/themes/silver';

// Import any plugins you need
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/link';



@Component({
    selector: 'app-tinymce-ayyaz',
    standalone: true,
    imports: [EditorModule, ReactiveFormsModule],
    templateUrl: './tinymce-ayyaz.component.html',
    styleUrl: './tinymce-ayyaz.component.scss'
})
export class TinymceAyyazComponent implements OnInit {

    form: FormGroup;
    fb = inject(FormBuilder)
    submittedText: string = ''

    tinymceInit =
        {
            plugins: 'lists link image table code help wordcount save',
            selector: 'textarea',  // change this value according to your HTML

        }


    ngOnInit(): void {
        this.initForm()
    }

    initForm() {
        this.form = this.fb.group({
            editor: new FormControl()
        })
    }
    onSubmit() {
        console.log(this.form.value);
        this.submittedText = this.form.value.editor;
    }
}
