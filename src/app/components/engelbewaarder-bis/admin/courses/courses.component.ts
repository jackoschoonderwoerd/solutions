import { Component, ElementRef, inject, OnInit, Signal, viewChild, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import { FirestoreService } from '../../../../shared/firestore.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { WarnDialogComponent } from '../../../../shared/warn-dialog/warn-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FirebaseError } from '@angular/fire/app';
import { EngelbewaarderStore } from '../../stores/engelbewaarder.store';
import { TodosService } from '../../../ngrx-signals/vasco/services/todos.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { EngelbewaarderService } from '../../services/engelbewaarder.service';
import { collection } from '@angular/fire/firestore';
import { EbConsumption, Course } from '../../types/eb-models';
import { AlertComponent } from '../../../../shared/alert/alert.component';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIcon,
        WarnDialogComponent,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
    consumptionTypes$: Observable<any>;

    baseUrl: string;
    fsService = inject(FirestoreService);
    dialog = inject(MatDialog);
    store = inject(EngelbewaarderStore)
    ebService = inject(EngelbewaarderService)
    indexSelected: number;






    ngOnInit(): void {
        this.store.loadCourses();
        this.baseUrl = this.ebService.getBaseUrl()
    }

    onAdd() {
        this.store.toggleCourseDetailsVisible(true)
        this.store.toggleCoursesVisible();
    }

    onCourseSelected(index, course: Course) {

        this.indexSelected = index;
        this.store.courseSelected(course);
        this.store.toggleConsumptionsVisible(true);
        this.store.toggleCourseDetailsVisible(false);
        // this.ebService.changeConsumptionType(consumptionType)
    }

    onEdit(course: Course) {

        this.store.courseSelected(course);
        this.store.toggleCoursesVisible();
        this.store.toggleCourseDetailsVisible(true);
        this.store.toggleConsumptionsVisible(false);
        this.store.toggleConsumptionDetailsVisible(false)
    }


    onDeleteCourse(course: Course) {
        if (!course.consumptions.length) {

            const path = `${this.baseUrl}/${course.id}`
            const diaologRef = this.dialog.open(WarnDialogComponent, {
                data: {
                    message: `This will permanently delete ${course.id}`
                }
            })
            diaologRef.afterClosed().subscribe((res: boolean) => {
                if (res) {
                    this.fsService.deleteDoc(path)
                        .then((res: any) => console.log(`doc ${course.id} deleted`))
                        .catch((err: FirebaseError) => { console.error(`failed to delete ${course.id}`) });
                }
            })
        } else {
            this.dialog.open(AlertComponent, {
                data: {
                    message: 'Aborted; course consumptions not empty'
                }
            })
        }
    }


}
