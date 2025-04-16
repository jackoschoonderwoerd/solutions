import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../../../shared/storage.service';

@Injectable({
    providedIn: 'root'
})
export class CanvasService {

    storageService = inject(StorageService)

    constructor() { }

    resizeImageToBase64(file: File, format: string, maxWidth: number, maxHeight: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                // Maintain aspect ratio
                if (width > maxWidth || height > maxHeight) {
                    const scale = Math.min(maxWidth / width, maxHeight / height);
                    width *= scale;
                    height *= scale;
                }

                // Resize image on canvas
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0, width, height);

                // Convert to Base64
                // const base64Image = canvas.toDataURL(file.type);
                const base64Image = canvas.toDataURL(`image/${format}`, 0.8);
                resolve(base64Image);
            };

            img.onerror = (error) => reject(error);
        });
    }

    uploadImage(base64String: string, filename: string) {
        const byteString = atob(base64String.split(',')[1]);
        const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: mimeString });

        return this.storageService.storeFile(`images/resize/canvas/${filename}`, blob)
    }
}
