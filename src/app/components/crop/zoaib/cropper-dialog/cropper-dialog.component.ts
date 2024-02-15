import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';

export type CropperDialogData = {
    image: File;
    width: number;
    height: number;
}

export type CropperDialogResult = {
    blob: Blob;
    imageUrl: string;
}

@Component({
    selector: 'app-cropper-dialog',
    standalone: true,
    imports: [CommonModule, ImageCropperModule, MatDialogModule],
    templateUrl: './cropper-dialog.component.html',
    styleUrl: './cropper-dialog.component.scss'
})
export class CropperDialogComponent {
    data: CropperDialogData = inject(MAT_DIALOG_DATA);

    constructor() {
        console.log(this.data)
    }



    result = signal<CropperDialogResult | undefined>(undefined);

    imageCropped(event: ImageCroppedEvent) {
        const { blob, objectUrl } = event;
        if (blob && objectUrl) {
            this.result.set({ blob, imageUrl: objectUrl })
        }
    }
}
