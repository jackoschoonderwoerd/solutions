import { AlertComponent } from '../../../../../../shared/alert/alert.component';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { EbImage, Exhibition } from '../../../../types/eb-models';
import { ExhibitionsAdminStore } from '../../../../stores/exhibitions-admin.store';
import { FirebaseError } from '@angular/fire/app';
import { FirestoreService } from '../../../../../../shared/firestore.service';
import { EditImageDetails } from './edit-ex-image/edit-ex-image.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from '../../../../../../shared/storage.service';
import { WarnDialogComponent } from '../../../../../../shared/warn-dialog/warn-dialog.component';

@Component({
    selector: 'app-images-admin',
    imports: [
        MatButtonModule,
        EditImageDetails
    ],
    templateUrl: './edit-ex-images.component.html',
    styleUrl: './edit-ex-images.component.scss'
})
export class EditExImages implements OnInit {


    // @Input() exhibitionId;
    @Output() resetExhibitionSelectedForEditToNull = new EventEmitter<void>;
    storage = inject(StorageService);
    fs = inject(FirestoreService);
    dialog = inject(MatDialog);
    exStore = inject(ExhibitionsAdminStore)
    ebImages: EbImage[];
    exhibition: Exhibition;
    exhibitionId: string;
    editmode: boolean = false;

    data = inject(MAT_DIALOG_DATA)

    constructor(public matDialogRef: MatDialogRef<EditExImages>) { }

    ngOnInit(): void {
        if (this.data && this.data.exhibitionId) {
            this.exhibitionId = this.data.exhibitionId;
            const path = `engelbewaarder-exhibitions/${this.exhibitionId}`
            this.fs.getDoc(path).subscribe((exhibition: Exhibition) => {
                this.editmode = true;
                this.exhibition = exhibition;
            })
        }
    }

    updateEbImagesArray(ebImage: EbImage) {
        const path = `engelbewaarder-exhibitions/${this.exhibition.id}`;
        return this.fs.removeElementFromArray(path, 'ebImages', ebImage)
    }

    onFileInputChange(event: any) {
        console.log(event.target.files[0])
        const file: File = event.target.files[0]
        const fileName = file.name
        const path = `engelbewaarder-exhibitions/${this.exhibition.id}/${fileName}`;
        this.checkForExistingFilenameInStorage(path).then((res: boolean) => {
            if (res) {
                console.log(res);

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

            } else {
                this.dialog.open(AlertComponent, {
                    data: {
                        message: `image upload aborted by user`
                    }
                })
            }
        })
    }

    checkForExistingFilenameInStorage(path) {
        const promise = new Promise((resolve, reject) => {

            this.storage.checkForExistingFilename(path)
                .then((downloadUrl: string) => {
                    const dialogRef = this.dialog.open(WarnDialogComponent, {
                        data: {
                            message: `An image with this filename already exists. <br> Do you want to replace it with the selected image?`
                        }
                    })
                    dialogRef.afterClosed().subscribe((res: boolean) => {
                        if (res) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    })
                })
                .catch((err: FirebaseError) => {
                    console.log(`No file with already existing filename found. Good to go; ${err.message}`)
                    resolve(true)
                })
        })
        return promise
    }


    onDoneEditing() {
        this.matDialogRef.close();
        // this.exStore.editNothing();
        // this.resetExhibitionSelectedForEditToNull.emit()
    }
}
