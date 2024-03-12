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

@Component({
    selector: 'app-add-navigation-item',
    standalone: true,
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        NgFor,
        MatButtonModule,
        CommonModule
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
    baseUrl: string = 'navigation'





    ngOnInit() {
        const pathToCds = this.baseUrl;
        this.cds$ = this.fsService.collection(pathToCds);
        this.initSubjectForm();
        // this.onEdit('GIQPmaLrwnUDdOW76g2P')
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


    onEdit(id) {
        const pathToCd = `cds/${id}`
        this.fsService.getDoc(pathToCd).pipe(take(1)).subscribe((cd: any) => {

            console.log(cd)
            this.subjectForm.patchValue({
                title: cd.title
            })
            // return;
            // initialize array
            for (let i = 0; i < cd.musicians.length; i++) {
                this.musicianControls.push(this.fb.control(''));
            }
            // const musicians = cd.musicians
            this.musicianControls.forEach((control, index) => {
                console.log(control.value)
                control.setValue(
                    cd.musicians[index]
                )
                console.log(control.value)
            })
        })
    }

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
        const pathToSubject = `${this.baseUrl}`;
        this.fsService.addDoc(pathToSubject, subject)
            .then((res: DocumentReference) => {
                console.log(`navigation subject stored; ${res.id}`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to store navigation subject; ${err.message}`)
            })
    }
}
