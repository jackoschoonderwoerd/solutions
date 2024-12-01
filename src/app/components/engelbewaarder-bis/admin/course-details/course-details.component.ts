import { Component, inject, OnInit } from '@angular/core';
import { EngelbewaarderStore } from '../../stores/engelbewaarder.store';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FirestoreService } from '../../../../shared/firestore.service';
import { EngelbewaarderService } from '../../services/engelbewaarder.service';
import { FirebaseError } from '@angular/fire/app';

import { EbConsumption, Course } from '../../types/eb-models';
import { MatDialog } from '@angular/material/dialog';
import { WarnDialogComponent } from '../../../../shared/warn-dialog/warn-dialog.component';
import { DocumentReference } from '@angular/fire/firestore';
import { AlertComponent } from '../../../../shared/alert/alert.component';


@Component({
    selector: 'app-course-details',
    imports: [
        JsonPipe,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule
    ],
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
    consumption: EbConsumption;
    courseUC: Course;

    ngOnInit(): void {
        this.baseUrl = this.ebService.getBaseUrl();
        this.initForm();

        if (this.store.course()) {
            this.courseUC = this.store.course()
            this.editmode = true;
            this.patchForm(this.store.course())
        }
    }

    initForm() {
        this.form = this.fb.group({
            id: new FormControl(null),
            nameDutch: new FormControl(null, [Validators.required]),
            nameEnglish: new FormControl(null),
            nameSelectedLanguage: new FormControl(null),
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
            // id: this.store.course()? this.courseUC.id : null,
            nameDutch: formValue.nameDutch,
            nameEnglish: formValue.nameEnglish,
            nameSelectedLanguage: null,
            nameDutchVisible: (formValue.showNameDutch),
            nameEnglishVisible: formValue.showNameEnglish,
            descriptionDutchVisible: formValue.showDescriptionDutch,
            descriptionEnglishVisible: formValue.showDescriptionEnglish,
            alcoholPercentageVisible: formValue.showAlcoholPercentage,
            volumeVisible: formValue.showVolume,
            vesselVisible: formValue.showVessel,
            priceVisible: formValue.showPrice,
            // consumptions: this.store.course() ? this.courseUC.consumptions : []
        }
        if (!this.editmode) {
            course.consumptions = []
            this.addCourse(course)
        } else {
            this.updateCourse(course)
        }

    }

    private patchForm(course: Course) {
        console.log(course)
        this.form.patchValue({
            nameEnglish: course ? course.nameEnglish : null,
            nameDutch: course ? course.nameDutch : null,
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
        this.checkForExistingCourseName(course.nameDutch).then((res: boolean) => {
            console.log(res);
            if (!res) {
                this.dialog.open(AlertComponent, {
                    data: {
                        message: 'Aborted; this is name already taken'
                    }
                })
            } else {
                console.log('name does not yet exist; go ahead')
                const path = `${this.baseUrl}`
                this.fsService.addDoc(path, course)
                    .then((docRef: DocumentReference) => {
                        console.log(`course ${docRef.id} added`)
                        this.store.toggleCourseDetailsVisible(false)
                        this.store.toggleCoursesVisible()
                        this.form.reset();
                    })
                    .catch((err: FirebaseError) => console.log(`failed to set doc; ${err.message}`))
            }
        })
    }

    updateCourse(course: Partial<Course>) {
        console.log(course)
        const path = `${this.baseUrl}/${this.courseUC.id}`
        this.fsService.updateDoc(path, course)
            .then((res: any) => {
                console.log(`document ${course.nameDutch} updated`)
                this.store.toggleCourseDetailsVisible(false);
                this.store.toggleCoursesVisible();
                this.form.reset();
            })
            .catch((err: FirebaseError) => console.log(`failed to update doc; ${err.message}`))
    }

    private checkForExistingCourseName(courseNameDutch: string) {
        const path = `${this.baseUrl}`;
        const promise = new Promise((resolve, reject) => {

            this.fsService.collection(path).subscribe((courses: Course[]) => {
                console.log(courses)
                const x = courses.find((course: Course) => {
                    return course.nameDutch === courseNameDutch
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


    onCancel() {

        this.store.toggleCourseDetailsVisible(false);
        this.store.toggleCoursesVisible();
        this.store.clearCourse();
    }

}
