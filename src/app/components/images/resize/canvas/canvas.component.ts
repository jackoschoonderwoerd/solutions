import { Component, inject } from '@angular/core';
import { CanvasService } from './canvas.service';
import { FirestoreService } from '../../../../shared/firestore.service';
import { StorageService } from '../../../../shared/storage.service';
import { DocumentReference } from '@angular/fire/firestore';
import { MatRadioModule } from '@angular/material/radio';


@Component({
    selector: 'app-canvas',
    imports: [MatRadioModule],
    templateUrl: './canvas.component.html',
    styleUrl: './canvas.component.scss'
})
export class CanvasComponent {

    canvasService = inject(CanvasService)
    fs = inject(FirestoreService)
    storageService = inject(StorageService)
    selectedMaxHeight: number;
    selectedMaxWidth: number;
    selectedFormat: string;
    filename: string

    resizedImageBase64: string | null = null;

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        // console.log(file.name.split('.')[0] + '.jpeg');
        this.filename = file.name.split('.')[0] + `_${this.selectedMaxWidth}_X_${this.selectedMaxHeight}` + `.${this.selectedFormat}`

        if (file) {
            this.canvasService.resizeImageToBase64(file, this.selectedFormat, this.selectedMaxWidth, this.selectedMaxHeight)
                .then((resizedBase64) => {
                    console.log(resizedBase64)

                    this.resizedImageBase64 = resizedBase64; // Store resized image
                    return this.canvasService.uploadImage(this.resizedImageBase64, this.filename)
                })
                .then((downloadUrl: string) => {
                    console.log(downloadUrl)
                    return this.fs.addDoc(`images/resize/canvas`, { downloadUrl })
                })
                .then((docRef: DocumentReference) => {
                    console.log(docRef.id)
                })
        }
    }

    onMaxHeightSelected(selectedMaxHeight: number) {
        this.selectedMaxHeight = selectedMaxHeight
    }

    onMaxWidthSelected(selectedMaxWidth: number) {
        this.selectedMaxWidth = selectedMaxWidth
    }


    onFormatSelected(selectedFormat: string) {
        this.selectedFormat = selectedFormat
    }



}
