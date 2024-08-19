import { Component, OnInit, inject, HostListener, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Exhibition } from '../../../../types/eb-models';
import { FirestoreService } from '../../../../../../shared/firestore.service';
import { FirebaseError } from '@angular/fire/app';
import { ExhibitionsAdminStore } from '../../../../stores/exhibitions-admin.store';
import { NgClass } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WarnDialogComponent } from '../../../../../../shared/warn-dialog/warn-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
// import tinymce from 'tinymce';
// import 'tinymce/icons/default';
// import 'tinymce/themes/silver';

// Import any plugins you need
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/link';

export interface AvailableLanguage {
    abbr: string,
    full: string
}

@Component({
    selector: 'app-exhibition-description.',
    standalone: true,
    imports: [
        EditorModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgClass,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule
    ],
    templateUrl: './edit-ex-description.component.html',
    styleUrl: './edit-ex-description.component.scss'
})


export class EditExDescription implements OnInit {


    @Input() exhibitionSelectedForEdit: Exhibition
    form: FormGroup;
    fb = inject(FormBuilder)
    fs = inject(FirestoreService)
    exStore = inject(ExhibitionsAdminStore)
    submittedText: string = '';
    @Output() editingFinished = new EventEmitter<string>;
    @Input() descriptionHtml: string;
    editmode: boolean = false;
    @ViewChild('editor') editor
    contentChanged: boolean = false
    dialog = inject(MatDialog);
    @Output() resetExhibitionSelectedForEditToNull = new EventEmitter<void>

    data: any = inject(MAT_DIALOG_DATA);
    exhibition: Exhibition;

    availableLanguage
    availableLangages: AvailableLanguage[] = [
        { full: 'dutch', abbr: 'nl' },
        { full: 'english', abbr: 'en' }
    ];
    // selectecLanguage: AvailableLanguage = { full: 'dutch', abbr: 'nl' }
    selectecLanguage: AvailableLanguage;


    tinymceInit =
        {
            plugins: 'lists link image table code help wordcount save',
            selector: 'textarea',  // change this value according to your HTML

        }

    constructor(public matDialogRef: MatDialogRef<EditExDescription>) { }

    ngOnInit(): void {
        this.exhibition = this.data.exhibition
        this.initForm();

    }

    onSelectionChange(event) {
        console.log(event)
        this.selectecLanguage = event.value;
        if (this.exhibition) {
            if (this.selectecLanguage.abbr === 'nl') {
                if (this.exhibition.descriptionDutch) {
                    this.form.patchValue({
                        editor: this.exhibition.descriptionDutch
                    })
                }
            } else if (this.selectecLanguage.abbr === 'en') {
                if (this.exhibition.descriptionEnglish) {
                    this.form.patchValue({
                        editor: this.exhibition.descriptionEnglish
                    })
                }
            }
        }

    }

    initForm() {
        this.form = this.fb.group({
            editor: new FormControl()
        })
    }

    onChange() {
        console.log('change')
        this.contentChanged = true;
    }

    onSubmit() {
        console.log(this.form.value);
        console.log(this.selectecLanguage)
        this.submittedText = this.form.value.editor;
        let fieldName: string = ''
        const path = `engelbewaarder-exhibitions/${this.exhibition.id}`;
        if (this.selectecLanguage.abbr === 'nl') {
            fieldName = 'descriptionDutch'
        } else if (this.selectecLanguage.abbr === 'en') {
            fieldName = 'descriptionEnglish'
        }
        this.fs.updateDoc(path, { [fieldName]: this.submittedText })
            .then((res: any) => {
                console.log(`exhibition updated; ${res}`)
                this.form.reset();
                this.matDialogRef.close()
            })
            .catch((err: FirebaseError) => {
                console.error(err.message)
            })

    }
    onCancel() {
        console.log('onCancle')
        if (this.contentChanged) {
            const dialogRef = this.dialog.open(WarnDialogComponent, {
                data: {
                    message: 'There are unsaved changes in your description '
                }
            })
            dialogRef.afterClosed().subscribe((res: boolean) => {
                if (res) {
                    this.matDialogRef.close();
                } else {
                    return
                }
            })
        } else {
            this.matDialogRef.close();
        }
    }
}
