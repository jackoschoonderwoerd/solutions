import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from '../../../../../shared/storage.service';
import { EbImage, Exhibition } from '../../../types/models';
import { FirestoreService } from '../../../../../shared/firestore.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, JsonPipe } from '@angular/common';
import { FirebaseError } from '@angular/fire/app';
import { MatDialog } from '@angular/material/dialog';
import { WarnDialogComponent } from '../../../../../shared/warn-dialog/warn-dialog.component';
import { EngelbewaarderService } from '../../../services/engelbewaarder.service';
import { EngelbewaarderStore } from '../../../store/engelbewaarder.store';
import { take } from 'rxjs';

@Component({
    selector: 'app-images-admin',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, JsonPipe, CommonModule],
    templateUrl: './images-admin.component.html',
    styleUrl: './images-admin.component.scss'
})
export class ImagesAdminComponent implements OnInit {


    @Input() exhibitionId;
    storage = inject(StorageService);
    fs = inject(FirestoreService);
    dialog = inject(MatDialog);
    store = inject(EngelbewaarderStore)
    ebImages: EbImage[];
    ebServive = inject(EngelbewaarderService);
    exhibition: Exhibition

    ngOnInit(): void {
        this.ebServive.exhibitionChanged.subscribe((exhibition: Exhibition) => {
            if (exhibition) {
                this.exhibition = exhibition;
                // console.log(exhibition)
                this.ebImages = exhibition.ebImages
            } else {
                this.ebImages = [];
            }
        })
    }

    refreshImages() {
        const exhibitionId = this.exhibition.id;
        const path = `engelbewaarder-exhibitions/${exhibitionId}`
        this.fs.getDoc(path).subscribe((exhibition: Exhibition) => {
            this.ebImages = exhibition.ebImages;
        })
    }

    onDeleteImage(ebImage: EbImage) {
        const dialogRef = this.dialog.open(WarnDialogComponent, {
            data: {
                message: `This will premanently delete image: ${ebImage.filename}`
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {

                const path = `engelbewaarder-exhibitions/${this.exhibition.id}/${ebImage.filename}`;

                this.storage.deleteObject(path)
                    .then((res: any) => {
                        console.log(`imagefile ${ebImage.filename} deleted from storage`)
                    })
                    .catch((err: FirebaseError) => {
                        console.error(`failed to delete ${ebImage.filename} from storage; ${err.message}`)
                    })
                    .then(() => {
                        return this.updateEbImagesArray(ebImage)
                    })
                    .then((res: any) => {
                        console.log(`ebImageData removed from firestore; ${res}`)
                        this.refreshImages()

                    })
                    .catch((err: FirebaseError) => {
                        console.error(`failed to remove ebImageData from firestore; ${err.message}`)
                    })

            }
        })
    }


    updateEbImagesArray(ebImage: EbImage) {
        const path = `engelbewaarder-exhibitions/${this.exhibition.id}`;
        return this.fs.removeElementFromArray(path, 'ebImages', ebImage)
    }



    onFileInputChange(event: any) {
        console.log(event.target.files[0])
        const file: File = event.target.files[0]
        const fileName = file.name
        const path = `engelbewaarder-exhibitions/${this.exhibition.id}/${fileName}`
        this.storage.storeFile(path, file)
            .then((downloadUrl: string) => {
                const ebImage: EbImage = {
                    url: downloadUrl,
                    filename: fileName
                }
                return ebImage
            })
            .then((ebImage: EbImage) => {
                const path = `engelbewaarder-exhibitions/${this.exhibition.id}`
                this.fs.addElementToArray(path, 'ebImages', {
                    filename: ebImage.filename,
                    url: ebImage.url
                }
                )
            })
            .then(() => {
                console.log('loading ex');
                this.refreshImages()
                this.store.loadExhibitions();
            })
    }
    onMove(direction: string, index: number) {

        const path = `engelbewaarder-exhibitions/${this.exhibition.id}`;
        this.fs.getDoc(path).pipe(take(1)).subscribe((exhibition: Exhibition) => {
            const array = exhibition.ebImages
            if (direction === 'up') {
                if (index != 0) {
                    this.swapElements(array, index, index - 1)
                }
            } else if (direction === 'down') {
                if (index !== array.length - 1) {
                    this.swapElements(array, index, index + 1)
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
        console.log(newArray)
        const object = { ebImages: newArray }
        const path = `engelbewaarder-exhibitions/${this.exhibition.id}`;

        this.fs.updateDoc(path, object)
            .then((res: any) => {
                // this.indexSelected = null;
                console.log(`array updated`);
                this.fs.getDoc(path).subscribe((exhibition: Exhibition) => {
                    this.store.initExhibitionUC(exhibition)
                })
                this.store.loadExhibitions()
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to update array; ${err.message}`)
            })
    }
    // onMove(direction: string, index: number) {
    //     console.log(direction, index)
    //     console.log(this.ebImages);
    // }
}
