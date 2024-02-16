import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamModule } from 'ngx-webcam';
import { Observable, Subject, tap } from 'rxjs';
import { FirestoreService } from '../../../shared/firestore.service';
import { StorageService } from '../../../shared/storage.service';
import { MatDialog } from '@angular/material/dialog';

import { FormGroup } from '@angular/forms';
import { FilenameDialogComponent } from './filename-dialog/filename-dialog.component';
import { FirebaseError } from '@angular/fire/app';
import { DocumentReference } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { CropComponent } from '../../crop/crop.component';
import { CropperDialogComponent, CropperDialogData } from '../../crop/zoaib/cropper-dialog/cropper-dialog.component';
import { getDownloadURL } from '@angular/fire/storage';

@Component({
    selector: 'app-techshareskk',
    standalone: true,
    imports: [CommonModule, MatButtonModule, WebcamModule, MatIconModule],
    templateUrl: './techshareskk.component.html',
    styleUrl: './techshareskk.component.scss'
})
export class TechshareskkComponent implements OnInit {
    width = 300
    status: string = null;
    stream: any = null;
    trigger: Subject<void> = new Subject();
    previewImage: string = '';
    buttonLabel: string = 'capture'
    imagesData$: Observable<any>
    webCamImage: WebcamImage;
    imageFile: File;



    get $trigger(): Observable<void> {
        return this.trigger.asObservable();
    }
    constructor(
        private fsService: FirestoreService,
        private storage: StorageService,
        private dialog: MatDialog,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.checkPermissions();
        const path = `${this.router.url}/images`
        this.imagesData$ = this.fsService.collection(path).pipe(tap((data) => {
            console.log(data)
        }))
    }

    capture() {
        this.trigger.next();
    }

    handleInitError(error: WebcamInitError) {
        if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
            console.warn("Camera access was not allowed by user!");
            this.status = "Camera access was not allowed by user!"
        }
    }

    snapshot(e: WebcamImage) {
        this.webCamImage = e
        this.previewImage = e.imageAsDataUrl;
        this.buttonLabel = 'Recapture image';
    }

    proceed() {
        this.requestFileName().then((fileName: string) => {
            if (fileName) {
                this.storeImage(fileName)
                    .then((downloadUrl: any) => {
                        console.log(`image file stored; ${downloadUrl}`);
                        return downloadUrl
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to store image; ${err.message}`)
                    })
                    .then((downloadUrl: string) => {
                        console.log(downloadUrl)
                        return this.saveDownloadUrl(fileName, downloadUrl)
                    })
                    .then((res: DocumentReference) => {
                        console.log(`document added; ${res.id}`)
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to add document; ${err.message}`)
                    })
            } else {
                alert('something went wrong')
            }
        })
    }

    checkPermissions() {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 200,
                height: 500
            }
        })
            .then((res) => {
                console.log(res)
                this.stream = res;
                this.status = 'My camera is accessing.'
            })
            .catch((err) => {
                console.log(err)
                alert('camera access denied')
                if (err?.message === 'Permission denied') {
                    this.status = 'Permission denied please try again after approving access'
                } else {
                    this.status = 'Camera not available due to unknow reason';
                }
            })
    }

    requestFileName() {
        const promise = new Promise((resolve, reject) => {

            const dialogRef = this.dialog.open(FilenameDialogComponent, {
                width: '300'
            })
            dialogRef.afterClosed().subscribe((data: any) => {
                if (data) {
                    console.log(data.fileName);
                    const fileName = data.fileName + '.jpeg'
                    resolve(fileName)

                } else {
                    return
                }
            })
        })
        return promise
    }

    private storeImage(fileName: string) {
        const imageFile = this.convertWebcamImageToImageFile();
        const path = `${this.router.url}/${fileName}`
        return this.storage.storeFile(path, imageFile)
    }
    private saveDownloadUrl(fileName: string, downloadUrl: string) {
        const downloadData = {
            fileName: fileName,
            downloadUrl: downloadUrl
        }
        const path = `${this.router.url}/images`
        return this.fsService.addDoc(path, downloadData)

    }

    private convertWebcamImageToImageFile() {
        const arr = this.webCamImage.imageAsDataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        this.imageFile = new File([u8arr], 'this.imageName', { type: 'jpeg' })
        return this.imageFile
    }
    onDeleteImage(document) {
        console.log(document)
        this.deleteImageFile(document)
            .then((res) => {
                console.log(`image file deleted; ${res}`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to delete image file; ${err.message}`)
            })
            .then(() => {
                return this.deleteImageUrl(document)
            })
            .then((res: any) => {
                console.log(`image url deleted; ${res}`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to delete image url; ${err.message}`)
            })
    }
    private deleteImageFile(document) {
        const path = `${this.router.url}/${document.imageData.fileName}`
        return this.storage.deleteObject(path)
    }
    private deleteImageUrl(document) {
        const path = `${this.router.url}/images/${document.id}`
        console.log(path);
        return this.fsService.deleteDoc(path);
    }
    onCrop(document) {
        console.log(document)
        this.getBlob(document.downloadUrl)
        // const pathToDocument = `${this.router.url}/images/${document.id}`
        // this.getDownloadUrl(pathToDocument)
        // const cropperDialogData: CropperDialogData = {
        //     image: this.imageFile,
        //     width: 300,
        //     height: 300
        // }
        // this.dialog.open(CropperDialogComponent, {
        //     data: {
        //         cropperDialogData
        //     }
        // })

    }
    getBlob(pathTofile) {
        this.storage.getBlob(pathTofile)
            .then((data: any) => {
                console.log(data)
            })
            .catch((err: FirebaseError) => {
                console.log(err.message)
            })
    }
    onImage(e) {
        console.log(e.target)
    }
}
