import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AlertComponent } from '../../../../../../../../shared/alert/alert.component';
import { EbImage, Exhibition } from '../../../../../../types/eb-models';
import { FirestoreService } from '../../../../../../../../shared/firestore.service';
import { take } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';

@Component({
    selector: 'app-image-details',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    templateUrl: './image-details.component.html',
    styleUrl: './image-details.component.scss'
})
export class ImageDetailsComponent implements OnInit {
    form: FormGroup;
    fb = inject(FormBuilder);
    data = inject(MAT_DIALOG_DATA);
    dialog = inject(MatDialog);
    fs = inject(FirestoreService)
    ebImage: EbImage;

    constructor(public matDialogRef: MatDialogRef<ImageDetailsComponent>) { }

    ngOnInit(): void {
        this.initForm()
        if (this.data) {
            this.ebImage = this.data.ebImage;
            this.patchForm();
        }
    }

    initForm() {
        this.form = this.fb.group({
            title: new FormControl(null),
            price: new FormControl(null),
            artist: new FormControl(null),
            sold: new FormControl(false)
        })
    }

    patchForm() {
        this.form.patchValue({
            title: this.ebImage.title,
            artist: this.ebImage.artist,
            price: this.ebImage.price,
            sold: this.ebImage.sold
        })
    }

    onConfirm() {
        console.log(this.form.value)
        const formValue = this.form.value;
        const ebImage: EbImage = {
            url: this.data.ebImage.url,
            filename: this.data.ebImage.filename,
            title: formValue.title.toLowerCase(),
            artist: formValue.artist.toLowerCase(),
            price: formValue.price,
            sold: formValue.sold ? formValue.sold : false
        }
        this.matDialogRef.close(ebImage)
    }

    onCancel() {
        const dialogRef = this.dialog.open(AlertComponent, {
            data: {
                message: 'Aborted by user'
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            this.matDialogRef.close()
        })
    }
}
