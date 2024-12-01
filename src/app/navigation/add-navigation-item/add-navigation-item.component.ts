import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from '../../shared/firestore.service';
import { Observable, take } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Item, Subject, Topic } from '../navigation.service';
import { WarnDialogComponent } from '../../shared/warn-dialog/warn-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-add-navigation-item',
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        NgFor,
        MatButtonModule,
        CommonModule,
        WarnDialogComponent
    ],
    templateUrl: './add-navigation-item.component.html',
    styleUrl: './add-navigation-item.component.scss'
})
export class AddNavigationItemComponent implements OnInit {
    subjectForm: FormGroup;
    editForm: FormGroup;
    fsService = inject(FirestoreService)
    constructor(private fb: FormBuilder) { }
    cds$: Observable<any>
    editmode: boolean = false;
    baseUrl: string = 'navigation';
    subjects$: Observable<any>;
    subjectId: string;
    dialog = inject(MatDialog)






    ngOnInit() {
        const pathToCds = this.baseUrl;
        this.cds$ = this.fsService.collection(pathToCds);
        this.initSubjectForm();
        // this.onEdit('GIQPmaLrwnUDdOW76g2P')
        this.subjects$ = this.fsService.collection(this.baseUrl)
    }

    initSubjectForm() {
        this.subjectForm = this.fb.group({
            subjectName: new FormControl('', Validators.required),
            topicsArray: this.fb.array([]),
        });

    }
    // ============ EDIT ==============

    get musicianControls() {
        return (this.subjectForm.get('topicsArray') as FormArray).controls;
    }


    // onEdit(id) {
    //     const pathToCd = `cds/${id}`
    //     this.fsService.getDoc(pathToCd).pipe(take(1)).subscribe((cd: any) => {

    //         console.log(cd)
    //         this.subjectForm.patchValue({
    //             title: cd.title
    //         })

    //         for (let i = 0; i < cd.musicians.length; i++) {
    //             this.musicianControls.push(this.fb.control(''));
    //         }
    //         this.musicianControls.forEach((control, index) => {
    //             console.log(control.value)
    //             control.setValue(
    //                 cd.musicians[index]
    //             )
    //             console.log(control.value)
    //         })
    //     })
    // }

    // ============ musician ============

    topics(): FormArray {
        return this.subjectForm.get('topicsArray') as FormArray;
    }

    addTopic() {
        this.topics().push(this.newTopic());
    }

    get musiciansControls() {
        return (this.subjectForm.get('topicsArray') as FormArray).controls;
    }

    newTopic(): FormGroup {
        return this.fb.group({
            topicName: '',
            itemsArray: this.fb.array([])
        });
    }


    removeTopic(empIndex: number) {
        this.topics().removeAt(empIndex);
    }

    // ========== item ============

    itemsArray(empIndex: number): FormArray {
        return this.topics()
            .at(empIndex)
            .get('itemsArray') as FormArray;
    }

    newItem(): FormGroup {
        return this.fb.group({
            itemName: '',
        });
    }

    addItem(empIndex: number) {
        console.log(typeof (this.itemsArray))
        console.log(empIndex)
        this.itemsArray(empIndex).push(this.newItem());
    }

    removeItem(empIndex: number, skillIndex: number) {
        this.itemsArray(empIndex).removeAt(skillIndex);
    }


    onStoreSubject() {
        console.log(this.subjectForm.value);
        const formValue = this.subjectForm.value

        const subject: Subject = {
            ...formValue
        }
        if (!this.editmode) {
            const pathToCollection = `${this.baseUrl}`;
            this.fsService.addDoc(pathToCollection, subject)
                .then((res: DocumentReference) => {
                    console.log(`navigation subject stored; ${res.id}`);
                    this.resetForm();
                })
                .catch((err: FirebaseError) => {
                    console.log(`failed to store navigation subject; ${err.message}`)
                })
        } else {
            console.log(subject)
            const pathToDocument = `${this.baseUrl}/${this.subjectId}`
            this.fsService.updateDoc(pathToDocument, subject)
                .then((res: any) => {
                    console.log(`subject updated; ${res}`)
                    this.resetForm()

                })
                .catch((err: FirebaseError) => {
                    console.log(`failed to update subject; ${err.message}`)
                })
        }
    }

    onEditSubject(subjectId: string) {
        this.subjectForm.reset()
        this.topics().controls.length = 0;
        this.subjectId = subjectId
        this.editmode = true;
        console.log(subjectId)
        const pathToSubject = `${this.baseUrl}/${subjectId}`;
        this.fsService.getDoc(pathToSubject).pipe(take(1)).subscribe((subject: Subject) => {
            console.log(subject)
            this.populateForm(subject)
        })
    }

    existingItem(item: Item): FormGroup {
        return this.fb.group({
            itemName: item.itemName
        })
    }
    existingTopic(topicName: string, items: Item[]): FormGroup {
        return this.fb.group({
            topicName: topicName,
            itemsArray: this.fb.array(items)
        })
    }


    populateForm(subject: Subject) {
        this.subjectForm.patchValue({
            subjectName: subject.subjectName
        });
        subject.topicsArray.forEach((topic: Topic) => {
            const existingItems = [];
            topic.itemsArray.forEach((item: Item) => {
                existingItems.push(this.existingItem(item))
            })
            console.log(existingItems)
            this.topics().push(this.existingTopic(topic.topicName, existingItems))
            console.log(this.subjectForm.value)

        })
    }
    resetForm() {
        this.subjectForm.reset();
        this.topics().controls.length = 0;
        this.editmode = false;
    }
    onDeleteSubject(subjectId: string) {
        const dialogRef = this.dialog.open(WarnDialogComponent, {
            data: {
                message: `this will permanently delete the complete subject`
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                const pathToDocument = `${this.baseUrl}/${subjectId}`
                this.fsService.deleteDoc(pathToDocument)
                    .then((res: any) => {
                        console.log(`subject deleted; ${res}`)
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to delete subject; ${err.message}`)
                    })
            } else {
                console.log(`aborted`);
            }
        })
    }
}
