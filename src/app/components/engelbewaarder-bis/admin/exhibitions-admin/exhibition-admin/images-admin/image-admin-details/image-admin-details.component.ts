import { Component, inject, Input, OnInit } from '@angular/core';
import { EbImage, Exhibition } from '../../../../../types/models';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FirestoreService } from '../../../../../../../shared/firestore.service';
import { StorageService } from '../../../../../../../shared/storage.service';
import { FirebaseError } from '@angular/fire/app';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WarnDialogComponent } from '../../../../../../../shared/warn-dialog/warn-dialog.component';

@Component({
    selector: 'app-image-admin-details',
    standalone: true,
    imports: [
        MatIconModule,
        NgStyle,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatLabel,
        MatCheckboxModule,
        MatButtonModule,
        CurrencyPipe
    ],
    templateUrl: './image-admin-details.component.html',
    styleUrl: './image-admin-details.component.scss'
})
export class ImageAdminDetailsComponent implements OnInit {
    @Input() ebImage: EbImage;
    @Input() exhibitionId: string;
    @Input() index: number
    fb = inject(FormBuilder)
    fs = inject(FirestoreService);
    dialog = inject(MatDialog)
    storage = inject(StorageService)
    form: FormGroup;
    ebImages: EbImage[];
    editmode: boolean = false;


    ngOnInit(): void {
        this.initForm();
        setTimeout(() => {
            this.patchForm()
        }, 0);
        const path = `engelbewaarder-exhibitions/${this.exhibitionId}`
        this.fs.getDoc(path).subscribe((exhibition: Exhibition) => {
            this.ebImages = exhibition.ebImages;
        })
    }

    initForm() {
        this.form = this.fb.group({
            url: new FormControl('jacko'),
            filename: new FormControl(null),
            title: new FormControl(null),
            price: new FormControl(null),
            artist: new FormControl(null),
            sold: new FormControl(false)
        })
    }
    patchForm() {
        this.form.patchValue({
            url: this.ebImage.url ? this.ebImage.url : null,
            filename: this.ebImage.filename ? this.ebImage.filename : null,
            title: this.ebImage.title ? this.ebImage.title : null,
            price: this.ebImage.price ? this.ebImage.price : null,
            artist: this.ebImage.artist ? this.ebImage.artist : null,
            sold: this.ebImage.sold ? this.ebImage.sold : null
        })
    }

    onDeleteImage() {
        const dialogRef = this.dialog.open(WarnDialogComponent, {
            data: {
                message: `this wil permanently delete the image and all it\'s properties from the storage and database`
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                const path = `engelbewaarder-exhibitions/${this.exhibitionId}/${this.ebImage.filename}`
                this.deleteFromStorage(path)
                    .then((res: any) => {
                        console.log(`file removed from storage`)
                    })
                    .catch((err: FirebaseError) => {
                        console.error(`failed to remove file from storage; ${err.message}`)
                    })
                    .then(() => {
                        return this.deleteFromFirestore()
                    })
                    .then((res: any) => {
                        console.log(`image removed from firestore`)
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to remove element from ebImagesArray; ${err.message}`)
                    })
            }
        })
    }

    deleteFromStorage(path: string) {
        return this.storage.deleteObject(path)
    }

    deleteFromFirestore() {
        const path = `engelbewaarder-exhibitions/${this.exhibitionId}`
        return this.fs.removeElementFromArray(path, 'ebImages', this.ebImage)

    }


    onMove(direction: string) {
        const path = `engelbewaarder-exhibitions/${this.exhibitionId}`;
        this.fs.getDoc(path).pipe(take(1)).subscribe((exhibition: Exhibition) => {
            const array = exhibition.ebImages
            if (direction === 'up') {
                if (this.index != 0) {
                    this.swapElements(array, this.index, this.index - 1)
                }
            } else if (direction === 'down') {
                if (this.index !== array.length - 1) {
                    this.swapElements(array, this.index, this.index + 1)
                }
            }
        })
    }

    private swapElements(array, i, j): void {
        const newArray: EbImage[] = [...array];
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        this.updateArray(newArray)
    }
    private updateArray(newArray: EbImage[]): void {
        const object = { ebImages: newArray }
        const path = `engelbewaarder-exhibitions/${this.exhibitionId}`;

        this.fs.updateDoc(path, object)
            .then((res: any) => {
                console.log('array updated')
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to update array; ${err.message}`)
            })
    }


    onSubmit() {
        console.log(this.form.value)
        const formValue = this.form.value;
        const ebImage: EbImage = {
            url: formValue.url,
            filename: formValue.filename,
            title: formValue.title.toLowerCase(),
            artist: formValue.artist.toLowerCase(),
            price: formValue.price,
            sold: formValue.sold
        }
        const path = `engelbewaarder-exhibitions/${this.exhibitionId}`
        this.fs.getDoc(path).pipe(take(1)).subscribe((exhibition: Exhibition) => {
            const ebImages = exhibition.ebImages
            ebImages[this.index] = ebImage;
            this.updateArray(ebImages)
        })
    }

}
