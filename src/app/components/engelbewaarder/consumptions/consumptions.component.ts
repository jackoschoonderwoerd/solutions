import { Component, inject, OnInit } from '@angular/core';
import { EngelbewaarderStore } from '../store/engelbewaarder.store';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { EngelbewaarderService } from '../services/engelbewaarder.service';
import { FirestoreService } from '../../../shared/firestore.service';
import { FirebaseError } from '@angular/fire/app';
import { Consumption, ConsumptionType } from '../types/models';
import { take } from 'rxjs';

@Component({
    selector: 'app-consumptions',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule
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


    ngOnInit(): void {
        this.baseUrl = this.ebService.getBaseUrl();
        this.ebService.consumptionTypeChanged.subscribe((consumptionType: ConsumptionType) => {
            console.log(consumptionType)

        })
    }

    onDelete(consumption) {
        const path = `${this.baseUrl}/consumptions/${this.store.selectedConsumptionType().name}/details`
        this.fsService.removeElementFromArray(path, 'consumptionDetailsArray', consumption)
            .then((res: any) => console.log(res))
            .catch((err: FirebaseError) => console.error(err.message))
    }

    onEdit(index: number, consumption: Consumption) {

        this.store.toggleConsumptionDetailsComponentVisible(true)
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
        const path = `${this.baseUrl}/consumptions/${this.store.selectedConsumptionType().name}/details`
        this.fsService.getDoc(path).pipe(take(1)).subscribe((data: any) => {
            console.log(data.consumptionDetailsArray);
            const array = data.consumptionDetailsArray;
            if (index != 0) {
                this.swapElements(array, index, index - 1)
            }
        })
    }


    onMove(direction: string, consumption: Consumption, index: number) {
        console.log(consumption, index)
        const path = `${this.baseUrl}/consumptions/${this.store.selectedConsumptionType().name}/details`
        this.fsService.getDoc(path).pipe(take(1)).subscribe((data: any) => {
            console.log(data.consumptionDetailsArray);
            const array = data.consumptionDetailsArray;
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
        const path = `${this.baseUrl}/consumptions/${this.store.selectedConsumptionType().name}/details`;

        this.fsService.updateDoc(path, object)
            .then((res: any) => {
                // this.form.reset()
                this.indexForEdit = null;
                // this.ed = false;
                console.log(`array updated`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to update array; ${err.message}`)
            })
    }

    onCancel() {

        this.store.consumptionTypeSelected(null);
        this.store.consumptionSelected(null)
        this.store.toggleConsumptionsComponentVisible(false);
        this.store.toggleConsumptionDetailsComponentVisible(false)
        this.ebService.consumptionChanged.emit(null);
    }


}
