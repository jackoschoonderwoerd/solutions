import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../../shared/firestore.service';
import { arrayRemove, DocumentReference } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Observable, take } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { WarnDialogComponent } from '../../../../../shared/warn-dialog/warn-dialog.component';
import { ArrayRemoveService } from './../array-remove.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

export interface HobbyPerson {
    personName: string;
    hobbyNames: string[];
}

@Component({
    selector: 'app-hobbies',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatInput,
        NgFor,
        CommonModule,
        MatIconModule,
        MatToolbarModule,
        RouterModule
    ],
    templateUrl: './hobbies.component.html',
    styleUrl: './hobbies.component.scss'
})
export class HobbiesComponent {
    fb = inject(FormBuilder)
    fsService = inject(FirestoreService);
    fsArrayRemoveService = inject(ArrayRemoveService)
    firestoreId: string = '';
    form: FormGroup;
    empForm: FormGroup;
    pathToFirebaseFirestoreArrayRemove: string = ''

    cds$: Observable<any>
    editmode: boolean = false;
    cdId: string = '';
    hobbyPersons$: Observable<HobbyPerson[]>
    dialog = inject(MatDialog);
    hobbyNameForm: FormGroup;
    editHobbyNameMode: boolean = false;
    originalHobbyName: string = ''

    ngOnInit(): void {
        this.initHobbyNameForm()
        this.empForm = this.fb.group(
            {
                name: new FormControl(null, [Validators.required]),
                hobbies: this.fb.array([])
            });
        const pathToFirebae = `firebase`
        this.fsService.collection(pathToFirebae).subscribe((data: any[]) => {
            console.log(data);
            const firestore = data.find((element: any) => {
                return element.name === 'firestore'
            })
            if (firestore) {
                this.firestoreId = firestore.id;
                this.pathToFirebaseFirestoreArrayRemove = `firebase/${this.firestoreId}/array-remove`;
                const pathToArrayRemove = `firebase/${this.firestoreId}/array-remove`;
                this.hobbyPersons$ = this.fsService.collection(pathToArrayRemove);
                this.fsService.collection(pathToArrayRemove).subscribe((data: any[]) => {
                    console.log(data);
                    if (data.length === 0) {
                        const pathToArrayRemove = `firebase/${this.firestoreId}/array-remove`;
                        const doc = {
                            name: 'array-remove'
                        }
                        this.fsService.addDoc(pathToArrayRemove, doc)
                            .then((docRef: DocumentReference) => {
                                console.log(`collection array-remove added; ${docRef.path}`)
                            })
                            .catch((err: FirebaseError) => {
                                console.log(`failed to add collection; ${err.message}`)
                            })
                    }
                })
            }

        })
    }
    onEditPerson() {

    }

    onHobbyNameKeyDown(event, personId) {
        if (event.keyCode === 13) {
            const newHobbyName = event.target.value;
            const pathToDocument = `${this.pathToFirebaseFirestoreArrayRemove}/${personId}`
            if (this.editHobbyNameMode) {
                this.fsArrayRemoveService.removeElementFormHobbyNamesArray(pathToDocument, this.originalHobbyName)
                    .then((res: any) => {
                        console.log(`element removed from array; ${res}`)
                    })
                    .then(() => {
                        return this.fsArrayRemoveService.addElementToHobbyNamesArray(pathToDocument, newHobbyName)
                    })
                    .then((res: any) => {
                        console.log(`hobbyName updated; ${res}`)
                        this.hobbyNameForm.reset()
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to update hobbyName; ${err.message}`)
                    })
            } else {
                this.fsArrayRemoveService.addElementToHobbyNamesArray(pathToDocument, newHobbyName)
                    .then((res: any) => {
                        console.log(`added hobbyName to array; ${res}`)
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failde to add hobbyName to array; ${err.message}`)
                    })
            }
        } else {
            // arrayRemove ; arrayJoin
            console.log('no cigar')
        }
    }
    onCancelEditHobbyName() {
        this.editHobbyNameMode = false;
        this.hobbyNameForm.reset()
    }

    onDeletePerson(id: string): void {
        const dialogRef = this.dialog.open(WarnDialogComponent, {
            data: {
                message: 'this will permanently delete the selected person and all of it\s properties'
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                const pathToDoc = `${this.pathToFirebaseFirestoreArrayRemove}/${id}`
                this.fsService.deleteDoc(pathToDoc)
                    .then((res: any) => {
                        console.log(`document deleted; ${res}`);
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to delete document; ${err.message}`)
                    })
            } else {
                return;
            }
        })
    }

    onDeleteHobby(personId: string, hobbyName: string): void {

        const dialogRef = this.dialog.open(WarnDialogComponent, {
            data: {
                message: `this will premanently delete the hobby name`
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                const pathToDocument = `${this.pathToFirebaseFirestoreArrayRemove}/${personId}`;
                this.fsArrayRemoveService.removeElementFormHobbyNamesArray(pathToDocument, hobbyName)
            } else {
                return;
            }
        })


    }

    // onEditCd(id: string) {
    //     this.cdId = id;
    //     this.editmode = true;
    //     console.log(id)
    //     const pathToCd = `simple-test-instr/${id}`
    //     this.fsService.getDoc(pathToCd).pipe(take(1)).subscribe((cd: any) => {
    //         console.log(cd)
    //         this.empForm.patchValue({
    //             name: cd.name
    //         })
    //         cd.hobbies.forEach((employee: any) => {
    //             const existingSkills = []
    //             employee.skills.forEach((skill: any) => {
    //                 existingSkills.push(this.existingSkill(skill.skill, skill.exp))
    //             })
    //             console.log(existingSkills)
    //             this.hobbies().push(this.existingHobby(employee.hobbyName, employee.lastName, existingSkills));
    //         })
    //         console.log(this.empForm)

    //     })
    // }
    onDeleteCd(id: string) {
        const pathToCd = `simple-test-instr/${id}`
        this.fsService.deleteDoc(pathToCd)
            .then((res: any) => {
                console.log(`document deleted;${res}`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to delete document; ${err.message}`)
            })
    }

    hobbies(): FormArray {
        return this.empForm.get('hobbies') as FormArray;
    }

    existingHobby(
        hobbyName: string,
        // lastName: string,
        // skills: any[]
    ): FormGroup {

        return this.fb.group({
            hobbyName,
            // lastName,
            // skills: this.fb.array(skills)
        })
    }
    // existingSkill(skill: string, exp: number): FormGroup {
    //     console.log(skill, exp)
    //     return this.fb.group({
    //         skill: skill,
    //         exp: exp
    //     })
    // }

    initHobbyNameForm() {
        this.hobbyNameForm = this.fb.group({
            hobbyName: new FormControl(null)
        })
    }

    newHobby(): FormGroup {
        return this.fb.group({
            hobbyName: '',
            // lastName: '',
            // skills: this.fb.array([])
        });
    }

    addHobby() {
        this.hobbies().push(this.newHobby());
    }

    removeHobby(hobbyIndex: number) {
        this.hobbies().removeAt(hobbyIndex);
    }
    onEditHobbyName(personId: string, hobbyName: string) {
        this.editHobbyNameMode = true;
        this.originalHobbyName = hobbyName
        this.hobbyNameForm.setValue({
            hobbyName
        })
    }

    // employeeSkills(hobbyIndex: number): FormArray {
    //     return this.hobbies()
    //         .at(hobbyIndex)
    //         .get('skills') as FormArray;
    // }

    // newSkill(): FormGroup {
    //     return this.fb.group({
    //         skill: '',
    //         exp: ''
    //     });
    // }

    // addEmployeeSkill(hobbyIndex: number) {
    //     this.employeeSkills(hobbyIndex).push(this.newSkill());
    // }

    // removeEmployeeSkill(hobbyIndex: number, skillIndex: number) {
    //     this.employeeSkills(hobbyIndex).removeAt(skillIndex);
    // }

    onSubmit() {
        console.log(this.empForm.value);
        const formValue = this.empForm.value;
        const hobbyNames: string[] = []
        formValue.hobbies.forEach(hobby => {
            hobbyNames.push(hobby.hobbyName)
        });
        const hobbyPerson: HobbyPerson = {
            personName: formValue.name,
            hobbyNames: hobbyNames
        }
        console.log(hobbyPerson);
        this.fsService.addDoc(this.pathToFirebaseFirestoreArrayRemove, hobbyPerson)
            .then((docRef: DocumentReference) => {
                console.log(`document added; ${docRef.path}`);
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to add document; ${err.message}`)
            })

        // if (!this.editmode) {

        //     this.fsService.addDoc(this.pathToFirebaseFirestoreArrayRemove, this.empForm.value)
        //         .then((res: DocumentReference) => {
        //             console.log(`document added; ${res.id}`)
        //             this.resetForm();
        //         })
        //         .catch((err: FirebaseError) => {
        //             console.log(`failed to add document; ${err.message}`)
        //         })
        // } else {
        //     const pathToSimpleTestInstr = `${this.pathToFirebaseFirestoreArrayRemove}/${this.cdId}`
        //     this.fsService.updateDoc(pathToSimpleTestInstr, this.empForm.value)
        //         .then((res: any) => {
        //             console.log(`document updated; ${res}`)
        //             this.resetForm();
        //         })
        //         .catch((err: FirebaseError) => {
        //             console.log(`failed to update document; ${err.message}`)
        //         })
        // }

    }
    resetForm() {
        this.empForm.reset();
        this.hobbies().controls.length = 0;
        this.editmode = false;
    }
}
