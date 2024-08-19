import { Component, inject, Input, OnInit } from '@angular/core';
import { EbImage, Exhibition } from '../../../../../types/eb-models';
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
import { ImageDetailsComponent } from './image-details/image-details.component';

@Component({
    selector: 'app-edit-image-details',
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
    templateUrl: './edit-ex-image.component.html',
    styleUrl: './edit-ex-image.component.scss'
})
export class EditImageDetails implements OnInit {
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

        const path = `engelbewaarder-exhibitions/${this.exhibitionId}`
        this.fs.getDoc(path).subscribe((exhibition: Exhibition) => {
            this.ebImages = exhibition.ebImages;
        })
    }


    onEditDetails() {
        console.log(' hi')
        const dialogRef = this.dialog.open(ImageDetailsComponent, {
            data: {
                ebImage: this.ebImage,
            },
            // height: "calc(100% - 30px)",
            // width: "calc(100% - 30px)",
            // maxWidth: "20rem",
            // maxHeight: "100%"
        })
        dialogRef.afterClosed().subscribe((ebImage: EbImage) => {
            console.log(ebImage)
            if (ebImage) {
                this.updateDetails(ebImage);
            }
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


    updateDetails(ebImage: EbImage) {
        // console.log(this.form.value)
        // const formValue = this.form.value;
        // const ebImage: EbImage = {
        //     url: formValue.url,
        //     filename: formValue.filename,
        //     title: formValue.title.toLowerCase(),
        //     artist: formValue.artist.toLowerCase(),
        //     price: formValue.price,
        //     sold: formValue.sold
        // }
        const path = `engelbewaarder-exhibitions/${this.exhibitionId}`
        this.fs.getDoc(path).pipe(take(1)).subscribe((exhibition: Exhibition) => {
            const ebImages = exhibition.ebImages
            ebImages[this.index] = ebImage;
            this.updateArray(ebImages)
        })
    }

}
