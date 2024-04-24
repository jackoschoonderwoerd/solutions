import { Component, inject, OnInit } from '@angular/core';
import { EngelbewaarderStore } from '../../store/engelbewaarder.store';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FirestoreService } from '../../../../shared/firestore.service';
import { EngelbewaarderService } from '../../services/engelbewaarder.service';
import { FirebaseError } from '@angular/fire/app';
import { Consumption } from '../../models';
import { Course } from '../../types/models';
import { MatDialog } from '@angular/material/dialog';
import { WarnDialogComponent } from '../../../../shared/warn-dialog/warn-dialog.component';


@Component({
    selector: 'app-course-details',
    standalone: true,
    imports: [
        JsonPipe,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule],
    templateUrl: './course-details.component.html',
    styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {
    store = inject(EngelbewaarderStore)
    fb = inject(FormBuilder)
    form: FormGroup;
    fsService = inject(FirestoreService);
    ebService = inject(EngelbewaarderService)
    dialog = inject(MatDialog)

    baseUrl: string;
    editmode: boolean = false;
    consumption: Consumption;

    ngOnInit(): void {
        this.baseUrl = this.ebService.getBaseUrl();
        this.initForm();
        if (this.store.course()) {
            this.editmode = true;
            this.patchForm(this.store.course())
        }
    }

    initForm() {
        this.form = this.fb.group({

            nameDutch: new FormControl(null, [Validators.required]),
            nameEnglish: new FormControl(null),
            showNameDutch: new FormControl(true),
            showNameEnglish: new FormControl(false),
            showDescriptionDutch: new FormControl(false),
            showDescriptionEnglish: new FormControl(false),
            showAlcoholPercentage: new FormControl(false),
            showVolume: new FormControl(false),
            showVessel: new FormControl(false),
            showPrice: new FormControl(true)
        })

    }
    onSubmitForm() {
        const formValue = this.form.value
        const course: Partial<Course> = {
            id: formValue.nameDutch,
            nameDutch: formValue.nameDutch,
            nameEnglish: formValue.nameEnglish,
            nameDutchVisible: (formValue.showNameDutch),
            nameEnglishVisible: formValue.showNameEnglish,
            descriptionDutchVisible: formValue.showDescriptionDutch,
            descriptionEnglishVisible: formValue.showDescriptionEnglish,
            alcoholPercentageVisible: formValue.showAlcoholPercentage,
            volumeVisible: formValue.showVolume,
            vesselVisible: formValue.showVessel,
            priceVisible: formValue.showPrice
        }
        if (!this.store.course()) {
            this.addCourse(course)
        } else {
            this.updateCourse(course)
        }

    }
    private patchForm(course: Course) {
        this.form.patchValue({
            id: course ? course.id : null,
            nameEnglish: course ? course.nameEnglish : 'tba',
            nameDutch: course ? course.nameDutch : 'nnb',
            shownameDutch: course ? course.nameDutchVisible : true,
            showNameEnglish: course ? course.nameEnglishVisible : false,
            showDescriptionDutch: course ? course.descriptionDutchVisible : false,
            showDescriptionEnglish: course ? course.descriptionEnglishVisible : false,
            showAlcoholPercentage: course ? course.alcoholPercentageVisible : false,
            showVolume: course ? course.volumeVisible : false,
            showVessel: course ? course.vesselVisible : false,
            showPrice: course ? course.priceVisible : true
        })
    }



    addCourse(course: Partial<Course>) {
        this.checkForExistingCourseName(course.id).then((res: boolean) => {
            console.log(res);
            if (!res) {
                this.dialog.open(WarnDialogComponent, {
                    data: {
                        message: 'name already taken'
                    }
                })
            } else {
                console.log(' go ahead')
                const path = `${this.baseUrl}/${course.id}`
                this.fsService.setDoc(path, course)
                    .then((res: any) => {
                        console.log(`document ${course.id} set`)
                        this.store.toggleCourseDetailsVisible(false)
                        this.store.toggleCoursesVisible(true)
                    })
                    .catch((err: FirebaseError) => console.log(`failed to set doc; ${err.message}`))
            }
        })
    }

    private checkForExistingCourseName(courseId: string) {
        const path = `${this.baseUrl}`;
        const promise = new Promise((resolve, reject) => {

            this.fsService.collection(path).subscribe((courses: Course[]) => {
                console.log(courses)
                const x = courses.find((course: Course) => {
                    return course.id === courseId
                })
                if (x) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
        return promise
    }

    updateCourse(course: Partial<Course>) {
        const path = `${this.baseUrl}/${course.id}`
        this.fsService.updateDoc(path, course)
            .then((res: any) => {
                console.log(`document ${course.id} updated`)
                this.store.toggleCourseDetailsVisible(false);
                this.store.toggleCoursesVisible(true)
            })
            .catch((err: FirebaseError) => console.log(`failed to update doc; ${err.message}`))
    }

    updateConsumptionTypesArray(course: Partial<Course>) {
        const path = `${this.baseUrl}/${course.id}`
        if (!this.store.course()) {
            console.log('!editmode; add!')
            this.fsService.setDoc(path, course)
                .then((res: any) => {
                    console.log(res)
                    // create collection / with empty consumptionsArray
                    const doc = { consumptionsDetails: [] }
                    this.fsService.setDoc(path, doc)
                    this.store.toggleCourseDetailsVisible(false);

                })
                .catch((err: FirebaseError) => {
                    console.error(err.message)
                    return err.message
                })
                .then((res: any) => {
                    console.log(res)
                    this.fsService.setDoc(path, course)
                })
                .catch((err: FirebaseError) => console.error(err.message))
            // } else {
            //     console.log('editmode; update')
            //     const doomedConsumptionType = this.store.selectedConsumptionType();
            //     const path = `${this.baseUrl}/consumptions`
            //     this.fsService.removeElementFromArray(path, 'consumptionTypes', doomedConsumptionType)
            //         .then((res) => {
            //             console.log(res)
            //             this.fsService.addElementToArray(path, 'consumptionTypes', consumptionType)
            //         })
            //         .catch((err: FirebaseError) => {
            //             console.error((err.message))
            //             return err.message;
            //         })
            //         .then((res: any) => {
            //             console.log(res)
            //             this.store.toggleConsumptionTypeDetailsComponentVisible(false)
            //         })
            //         .catch((err: FirebaseError) => {
            //             console.error(err.message)
            //         })
        }
    }

    onCancel() {
        // this.ebService.consumptionTypeChanged.emit(null)
        this.store.toggleCourseDetailsVisible(false);
        this.store.toggleCoursesVisible(true);
        this.store.clearCourse();
    }
    // onSubmitForm() {
    //     console.log(this.form.value)
    // }
}
