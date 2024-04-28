import { Component, OnInit, inject, HostListener, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Exhibition } from '../../../../types/models';
import { FirestoreService } from '../../../../../../shared/firestore.service';
import { FirebaseError } from '@angular/fire/app';
import { ExhibitionsAdminStore } from '../../exhibitions-admin.store';
import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { WarnDialogComponent } from '../../../../../../shared/warn-dialog/warn-dialog.component';
// import tinymce from 'tinymce';
// import 'tinymce/icons/default';
// import 'tinymce/themes/silver';

// Import any plugins you need
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/link';



@Component({
    selector: 'app-exhibition-description.',
    standalone: true,
    imports: [
        EditorModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgClass
    ],
    templateUrl: './exhibition-description.component.html',
    styleUrl: './exhibition-description.component.scss'
})
export class ExhibitionDescriptionComponent implements OnInit {


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


    tinymceInit =
        {
            plugins: 'lists link image table code help wordcount save',
            selector: 'textarea',  // change this value according to your HTML

        }


    ngOnInit(): void {
        this.initForm();
        if (this.exhibitionSelectedForEdit) {
            this.editmode = true
            this.form.patchValue({
                editor: this.exhibitionSelectedForEdit.description
            })
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
        this.submittedText = this.form.value.editor;
        if (this.editmode) {
            const path = `engelbewaarder-exhibitions/${this.exhibitionSelectedForEdit.id}`
            this.fs.updateDoc(path, { description: this.submittedText })
                .then((res: any) => {
                    console.log(res)
                    this.exStore.editNothing();
                    this.resetExhibitionSelectedForEditToNull.emit();
                })
                .catch((err: FirebaseError) => {
                    console.error(err.message)
                })
        }
        // this.editingFinished.emit(this.form.value.editor)
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
                    this.exStore.editNothing();
                    this.resetExhibitionSelectedForEditToNull.emit();
                } else {
                    return
                }
            })
        } else {
            this.exStore.editNothing()
            this.resetExhibitionSelectedForEditToNull.emit();
        }
    }
}
