import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from '../../../../../shared/firestore.service';
import { DocumentReference } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';
import { EngelbewaarderService } from './engelbewaarder.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '@uploadcare/blocks';
import { WarnDialogComponent } from '../../../../../shared/warn-dialog/warn-dialog.component';

export interface Spirit {
    name: string;
    price: number;
}

@Component({
    selector: 'app-engelbewaarder',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        CommonModule
    ],
    templateUrl: './engelbewaarder.component.html',
    styleUrl: './engelbewaarder.component.scss'
})
export class EngelbewaarderComponent implements OnInit {
    fb = inject(FormBuilder);
    fs = inject(FirestoreService)
    dialog = inject(MatDialog);
    // ebService = inject(EngelbewaarderService)

    spiritsForm: FormGroup;

    editSpiritMode: boolean = false;
    baseUrl = `firebase/mlOmwZiN8extVXSo2YBp/firestore/TQIvBOX9WWcuVXAOExLl/remove-array/uceQ2eZePpIpuEoWfehN/engelbewaarder`;
    documentId = `qIj9s1Kv3n37AYA5lu7E`;
    pathToDocument = `firebase/mlOmwZiN8extVXSo2YBp/firestore/TQIvBOX9WWcuVXAOExLl/remove-array/uceQ2eZePpIpuEoWfehN/engelbewaarder/qIj9s1Kv3n37AYA5lu7E`;
    spiritsObject$: Observable<any>
    spiritsArray: Spirit[];

    indexForEdit: number;


    ngOnInit(): void {
        const key = 'mykey'
        const value = 'myvalue'
        const obj = { [key]: value }
        console.log(obj)
        this.initSpiritsForm()
        const pathToCollection = this.baseUrl
        this.fs.collection(pathToCollection).subscribe((data: any) => console.log(data[0].spirits))
        this.spiritsObject$ = this.fs.getDoc(this.pathToDocument)
        this.getSpiritsArray()
    }

    private getSpiritsArray(): void {
        this.fs.getDoc(this.pathToDocument).subscribe((data: any) => {
            this.spiritsArray = data.spiritsArray;
        })
    }

    private initSpiritsForm(): void {
        this.spiritsForm = this.fb.group({
            name: new FormControl(null, [Validators.required]),
            price: new FormControl(null, [Validators.required])
        })
    }

    onAddOrUpdateSpirit(): void {
        const formValue = this.spiritsForm.value;
        const spirit: Spirit = {
            name: formValue.name,
            price: formValue.price
        }
        if (!this.editSpiritMode) {
            this.addSpirit(spirit)

        } else {
            this.updateSpirit(spirit)
        }
    }

    onCancel() {
        this.indexForEdit = null;
        this.spiritsForm.reset();
    }

    private addSpirit(spirit: Spirit): void {
        this.fs.addElementToArray(this.pathToDocument, `spiritsArray`, spirit)
            .then((res: any) => {
                console.log(`element added to spiritsArray`)
                this.spiritsForm.reset();
            })
            .catch((err: FirebaseError) => console.log(`${err.message}`))
    }

    private updateSpirit(spirit: Spirit): void {
        this.spiritsArray[this.indexForEdit] = spirit;
        this.updateArray(this.spiritsArray);
    }

    onDelete(spirit: Spirit): void {
        const dialogRef = this.dialog.open(WarnDialogComponent, {
            data: {
                message: `This will permanently remove the spririt from de db`
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                this.fs.removeElementFromArray(this.pathToDocument, 'spiritsArray', spirit)
                    .then((res: any) => {
                        console.log(`element removed from array; ${res}`);
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to remove element from array ${err.message}`);
                    })

            } else {
                return;
            }
        })
    }

    onEdit(spirit: Spirit, index: number): void {
        this.indexForEdit = index
        this.editSpiritMode = true;
        this.spiritsForm.setValue({
            ...spirit
        })
    }

    onMoveUp(selectedSpirit: Spirit): void {
        const index = this.spiritsArray.findIndex((spirit: Spirit) => {
            return spirit.name === selectedSpirit.name
        })
        if (index != 0) {
            this.swapElements(index, index - 1)
        }

    }

    onMoveDown(selectedSpirit: Spirit): void {
        const index = this.spiritsArray.findIndex((spirit: Spirit) => {
            return spirit.name === selectedSpirit.name
        })
        if (index !== this.spiritsArray.length - 1) {
            this.swapElements(index, index + 1)
        }
    }

    private swapElements(i, j): void {
        console.log(i, j)
        const newArray: Spirit[] = [...this.spiritsArray];
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        this.updateArray(newArray)
    }
    private updateArray(newArray: Spirit[]): void {
        console.log(newArray)
        const object = { spiritsArray: newArray }
        this.fs.updateDoc(this.pathToDocument, object)
            .then((res: any) => {
                console.log(`array updated`)
                this.spiritsForm.reset()
                this.indexForEdit = null;
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to update array; ${err.message}`)
            })
    }
}
