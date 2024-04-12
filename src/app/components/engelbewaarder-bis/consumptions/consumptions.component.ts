import { Component, inject, OnInit } from '@angular/core';
import { EngelbewaarderStore } from '../store/engelbewaarder.store';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Consumption } from '../models';
import { MatButtonModule } from '@angular/material/button';
import { EngelbewaarderService } from '../services/engelbewaarder.service';
import { FirestoreService } from '../../../shared/firestore.service';
import { FirebaseError } from '@angular/fire/app';

import { take } from 'rxjs';
import { Course } from '../types/models';

@Component({
    selector: 'app-consumptions',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        AsyncPipe
    ],
    templateUrl: './consumptions.component.html',
    styleUrl: './consumptions.component.scss'
})
export class ConsumptionsComponent implements OnInit {
    store = inject(EngelbewaarderStore)
    indexForEdit: number;
    ebService = inject(EngelbewaarderService);
    fsService = inject(FirestoreService);
    baseUrl: string;
    course: Course;


    ngOnInit(): void {
        this.baseUrl = this.ebService.getBaseUrl();
        this.course = this.store.course()
    }

    onDelete(consumption) {
        const path = `${this.baseUrl}/${this.store.course().id}`
        this.fsService.removeElementFromArray(path, 'consumptions', consumption)
            .then((res: any) => {
                // this.store.loadCourses();
                this.store.updateCourse(this.course);

            })
            .catch((err: FirebaseError) => console.error(err.message))
    }

    onEdit(index: number, consumption: Consumption) {
        this.store.toggleConsumptionDetailsVisible(true)
        // this.store.openAddConsumptionTypeDetails(true)
        this.store.consumptionSelected(consumption);
        // this.ebService.consumptionChanged.emit(consumption);
        // this.store.showConsumptionsComponentF(true).then(() => {
        //     setTimeout(() => {

        //     });
        // })
    }
    onMoveUp(consumption: Consumption, index: number) {
        console.log(consumption, index)
        // const path = `${this.baseUrl}/consumptions/${this.store.selectedConsumptionType().id}/details`
        // this.fsService.getDoc(path).pipe(take(1)).subscribe((data: any) => {
        //     console.log(data.consumptionDetailsArray);
        //     const array = data.consumptionDetailsArray;
        //     if (index != 0) {
        //         this.swapElements(array, index, index - 1)
        //     }
        // })
    }


    onMove(direction: string, consumption: Consumption, index: number) {
        console.log(consumption, index)
        // const path = `${this.baseUrl}/consumptions/${this.store.selectedConsumptionType().id}/details`
        // this.fsService.getDoc(path).pipe(take(1)).subscribe((data: any) => {
        //     console.log(data.consumptionDetailsArray);
        //     const array = data.consumptionDetailsArray;
        //     if (direction === 'up') {
        //         if (index != 0) {
        //             this.swapElements(array, index, index - 1)
        //         }
        //     } else if (direction === 'down') {
        //         if (index !== array.length - 1) {
        //             this.swapElements(array, index, index + 1)
        //         }
        //     }
        // })
    }

    private swapElements(array, i, j): void {
        console.log(i, j)
        const newArray: Consumption[] = [...array];
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        this.updateArray(newArray)
    }

    onAddConsumption() {
        // this.showConsumptionDetails(true)
        // this.store.addingNewConsumptionF(true)
    }

    private updateArray(newArray: Consumption[]): void {
        console.log(newArray)
        const object = { consumptionDetailsArray: newArray }
        // const path = `${this.baseUrl}/consumptions/${this.store.selectedConsumptionType().id}/details`;

        // this.fsService.updateDoc(path, object)
        //     .then((res: any) => {
        //         // this.form.reset()
        //         this.indexForEdit = null;
        //         // this.ed = false;
        //         console.log(`array updated`)
        //     })
        //     .catch((err: FirebaseError) => {
        //         console.log(`failed to update array; ${err.message}`)
        //     })
    }

    onCancel() {

        this.store.courseSelected(null);
        this.store.consumptionSelected(null)
        this.store.toggleConsumptionsVisible(false);
        this.store.toggleConsumptionDetailsVisible(false)
        this.ebService.consumptionChanged.emit(null);
    }


}
