import { Component, inject, OnInit } from '@angular/core';
import { EngelbewaarderStore } from '../store/engelbewaarder.store';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { EngelbewaarderService } from '../services/engelbewaarder.service';
import { FirestoreService } from '../../../shared/firestore.service';
import { FirebaseError } from '@angular/fire/app';

import { take } from 'rxjs';
import { Consumption, Course } from '../types/models';
import { MatDialog } from '@angular/material/dialog';
import { WarnDialogComponent } from '../../../shared/warn-dialog/warn-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-consumptions',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        AsyncPipe,
        MatExpansionModule,

    ],
    templateUrl: './consumptions.component.html',
    styleUrl: './consumptions.component.scss'
})
export class ConsumptionsComponent implements OnInit {
    store = inject(EngelbewaarderStore)
    ebService = inject(EngelbewaarderService);
    fsService = inject(FirestoreService);
    dialog = inject(MatDialog);
    baseUrl: string;
    course: Course;
    indexSelected: number;


    ngOnInit(): void {
        this.baseUrl = this.ebService.getBaseUrl();
        this.course = this.store.course()
    }

    onDelete(event: MouseEvent, consumption: Consumption) {
        event.stopPropagation()
        const dialogRef = this.dialog.open(WarnDialogComponent, {
            data: {
                message: `This will permanently delete ${consumption.nameDutch}`
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                const path = `${this.baseUrl}/${this.store.course().id}`
                this.fsService.removeElementFromArray(path, 'consumptions', consumption)
                    .then((res: any) => {
                        console.log(`consumption ${consumption.nameDutch} removed`)

                    })
                    .catch((err: FirebaseError) => {
                        console.error(`failed to remove ${consumption.nameDutch}; ${err.message}`)
                    })
            }
            return;
        })
    }

    onEdit(event: MouseEvent, index: number, consumption: Consumption) {
        event.stopPropagation();
        const path = `${this.baseUrl}/${this.store.course().id}`
        this.fsService.getDoc(path)
            .pipe(take(1))
            .subscribe((course: Course) => {
                console.log(course)
                this.ebService.courseChanged.emit(course)
            })

        this.ebService.consumptionChanged.emit(consumption)
        this.indexSelected = index;
        this.store.toggleConsumptionDetailsVisible(true)
        this.store.consumptionSelected(consumption);

    }



    onMove(event: MouseEvent, direction: string, consumption: Consumption, index: number) {
        event.stopPropagation()
        const path = `${this.baseUrl}/${this.store.course().id}`;
        this.fsService.getDoc(path).pipe(take(1)).subscribe((course: Course) => {
            const array = course.consumptions;
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
        const newArray: Consumption[] = [...array];
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        this.updateArray(newArray)
    }


    private updateArray(newArray: Consumption[]): void {

        const object = { consumptions: newArray }
        const path = `${this.baseUrl}/${this.store.course().id}`;

        this.fsService.updateDoc(path, object)
            .then((res: any) => {
                this.indexSelected = null;
                console.log(`array updated`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to update array; ${err.message}`)
            })
    }

    onCancel() {
        this.store.toggleConsumptionsVisible(false);
        this.store.toggleConsumptionDetailsVisible(false);
        this.store.clearCourse();

    }


}
