// https://www.positronx.io/angular-image-upload-preview-crop-zoom-and-scale-example/
// https://www.npmjs.com/package/ngx-image-cropper
// https://www.youtube.com/watch?v=MgWDSSLjhkQ
// https://zoaibkhan.com/blog/how-to-build-an-image-cropper-control-in-angular/

// https://www.youtube.com/watch?v=wrDKVgeGWnw

import { Component, EventEmitter, Input, OnInit, Output, computed, effect, inject, signal } from '@angular/core';

import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CropperDialogComponent } from './cropper-dialog/cropper-dialog.component';
import { Observable, filter, tap } from 'rxjs';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage'
import { StorageService } from '../../../shared/storage.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../../shared/firestore.service';
import { DocumentReference, FirestoreError } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon'
import { FirebaseError } from '@angular/fire/app';
import { WarnDialogComponent } from '../../../shared/warn-dialog/warn-dialog.component';

export type ImageData = {
    downloadUrl: string;
    fileName: string
}

@Component({
    selector: 'app-zoaib',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule, WarnDialogComponent],
    templateUrl: './zoaib.component.html',
    styleUrl: './zoaib.component.scss'
})
export class ZoaibComponent implements OnInit {
    imageWidth = signal(200);
    @Input() set width(val: number) {
        this.imageWidth.set(val)
    };

    imageHeight = signal(200);
    @Input() set height(val: number) {
        this.imageHeight.set(val);
    };

    imagePath = signal('')
    @Input({ required: true }) set path(val: string) {
        this.imagePath.set(val)
    }

    imagesPresent = signal(false)

    imagesData$: Observable<any[]>

    filename: string;


    placeholder = computed(() => `https://placehold.co/${this.imageWidth()}x${this.imageHeight()}`);

    croppedImageUrl = signal<string | undefined>(undefined);

    imageSource = computed(() => this.croppedImageUrl() ?? this.placeholder());

    baseUrl = signal('')

    dialog = inject(MatDialog)



    ngOnInit(): void {
        console.log(this.imagesPresent())
        const path = `${this.router.url}/images`
        this.baseUrl.set(this.router.url)
        this.imagesData$ = this.fsService.collection(path).pipe(tap((imagesDataArray) => {
            console.log(imagesDataArray)
            if (imagesDataArray.length > 0) {
                this.imagesPresent.set(true)
            } else {
                this.imagesPresent.set(false)
            }

        }))
    }

    fileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            console.log(file.name)
            this.filename = file.name;
            const dialogRef = this.dialog.open(CropperDialogComponent, {
                data: {
                    image: file,
                    width: this.imageWidth(),
                    height: this.imageHeight()
                },
                width: '500px'
            })
            dialogRef
                .afterClosed()
                .pipe(filter(result => !!result))
                .subscribe((result) => {
                    this.uploadImage(result.blob);
                });
        }
    }
    @Output() imageReady = new EventEmitter<string>();

    constructor(

    ) {
        effect(() => {
            if (this.croppedImageUrl()) {
                this.imageReady.emit(this.croppedImageUrl())
            }
        })
    }

    storage = inject(Storage)
    storageService = inject(StorageService)

    router = inject(Router)

    uploadImage(blob: Blob) {
        console.log(this.router.url)

        const imagePath = `${this.router.url}/${this.filename}`

        this.storageService.storeFile(imagePath, blob)
            .then((downloadUrl: string) => {
                console.log(downloadUrl)
                this.croppedImageUrl.set(downloadUrl)
                this.saveDownloadUrl(downloadUrl);
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to store file; ${err.message}`)
            })
    }
    fsService = inject(FirestoreService)

    saveDownloadUrl(downloadUrl) {
        console.log(downloadUrl)
        const downloadData = {
            fileName: this.filename,
            downloadUrl
        }
        const path = `${this.baseUrl()}/images`
        this.fsService.addDoc(path, downloadData)
            .then((res: DocumentReference) => {
                console.log(`document added, ${res.id}`)
            })
            .catch((err: FirestoreError) => {
                console.log(`failed to add document: ${err.message}`)
            })
    }



    onDelete(id, fileName) {
        console.log(id, fileName);
        const dialogRef = this.dialog.open(WarnDialogComponent, {
            data: {
                message: `this.will permanently delete the image`
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                this.deleteFromStorage(id, fileName)
                    .then((res: any) => {
                        console.log(`object deleted; ${res}`)
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to delete object; ${err.message}`)
                    })
                    .then(() => {
                        this.deleteFromFirestore(id)
                    })
                    .then((res: any) => {
                        console.log(`document deleted; ${res}`)
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to delete document; ${err.message}`)
                    })
            }
        })
    }

    deleteFromStorage(id, fileName) {
        const path = `${this.baseUrl()}/${fileName}`;
        return this.storageService.deleteObject(path)

    }
    deleteFromFirestore(id: String) {
        const path = `${this.router.url}/images/${id}`
        return this.fsService.deleteDoc(path)

    }

}
