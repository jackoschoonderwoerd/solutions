import { Component, ElementRef, inject, OnInit, Signal, viewChild, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import { FirestoreService } from '../../../shared/firestore.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { WarnDialogComponent } from '../../../shared/warn-dialog/warn-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConsumptionType, InputName } from '../types/models';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FirebaseError } from '@angular/fire/app';
import { EngelbewaarderStore } from '../store/engelbewaarder.store';
import { TodosService } from '../../ngrx-signals/vasco/services/todos.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { EngelbewaarderService } from '../services/engelbewaarder.service';
import { collection } from '@angular/fire/firestore';

@Component({
    selector: 'app-consumption-types',
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
    templateUrl: './consumption-types.component.html',
    styleUrl: './consumption-types.component.scss'
})
export class ConsumptionTypesComponent implements OnInit {
    consumptionTypes$: Observable<any>;
    consumptionTypesArray: ConsumptionType[];
    // baseUrl: string = `firebase/firestore/array-remove/engelbewaarder`
    baseUrl: string;
    fsService = inject(FirestoreService);
    dialog = inject(MatDialog);
    store = inject(EngelbewaarderStore)
    ebService = inject(EngelbewaarderService)
    // @ViewChild('input') public input: ElementRef





    ngOnInit(): void {
        this.store.loadTypes();
        this.baseUrl = this.ebService.getBaseUrl()
    }


    onConsumptionTypeSelected(consumptionType: ConsumptionType) {
        this.store.consumptionTypeSelected(consumptionType);
        this.store.toggleConsumptionsComponentVisible(true);
        this.store.toggleConsumptionTypeDetailsComponentVisible(false);
        // this.ebService.changeConsumptionType(consumptionType)
    }

    onEdit(consumptionType: ConsumptionType) {
        this.store.toggleConsumptionTypeDetailsComponentVisible(true);
        this.store.consumptionTypeSelected(consumptionType);
        this.store.toggleConsumptionsComponentVisible(false);
        this.store.toggleConsumptionDetailsComponentVisible(false)
    }


    onDeleteConsumptionType(event: MouseEvent, consumptionType) {
        this.checkForExistingConsumptions(consumptionType)
            .then((res: boolean) => {
                console.log(res)
                if (res) {
                    event.preventDefault();
                    const dialogRef = this.dialog.open(WarnDialogComponent, {
                        data: {
                            message: `This will permanently delete ${consumptionType.name} `
                        }
                    })
                    dialogRef.afterClosed().subscribe((res: boolean) => {
                        if (res) {
                            this.deleteConsumptionTypeFromArray(consumptionType)
                                .then((res: boolean) => {
                                    console.log(`consumptionType ${consumptionType.name} removed from consumptionTypes array`)
                                    this.deleteConsumptionDetailsArray(consumptionType)
                                })
                                .catch((err: FirebaseError) => {
                                    console.log(`failed to remove ${consumptionType.name} from consumptionTypes array; ${err.message}`)
                                })
                                .then((res: unknown) => {
                                    console.log(`consumptionDetailsArray ${consumptionType.name} deleted`)
                                    this.store.toggleConsumptionTypeDetailsComponentVisible(false)
                                })
                                .catch((err: FirebaseError) => {
                                    console.log(`failed to delete ${consumptionType.name} consumptionDetailsArray; ${err.message}`)
                                })
                        }
                        return
                    })
                } else {
                    alert(`consumptionType contains consumptions`)
                }
            });
    }


    onClear() {
        this.store.consumptionTypeSelected(null)
    }


    deleteConsumptionTypeFromArray(consumptionType: ConsumptionType) {

        const dialogRef = this.dialog.open(WarnDialogComponent, {
            data: {
                message: `This will permanently delete ${consumptionType.name} from the consumptionTypes array`
            }
        })
        const promise = new Promise((resolve, reject) => {
            dialogRef.afterClosed().subscribe((res: boolean) => {
                if (res) {
                    this.fsService.removeElementFromArray(`${this.baseUrl}/consumptions`, 'consumptionTypes', consumptionType)
                        .then((res: any) => {
                            console.log(res)
                            resolve(true)
                        })
                        .catch((err: FirebaseError) => {
                            console.error(err.message)
                            resolve(err)
                        })
                }
            })

        })
        return promise
    }

    deleteConsumptionDetailsArray(consumptionType: ConsumptionType) {
        const path = `${this.baseUrl}/consumptions/${consumptionType.name}/details`;
        return this.fsService.deleteDoc(path);
    }

    checkForExistingConsumptions(consumtionType: ConsumptionType) {
        const path = `${this.baseUrl}/consumptions/${consumtionType.name}/details`
        const promise = new Promise((resolve, reject) => {

            this.fsService.getDoc(path).subscribe(((data: any) => {
                if (data && !data.consumptionDetailsArray.length) {
                    resolve(true)
                } else {
                    // console.log(data.consumptionDetailsArray)
                    // console.log(data.consumptionDetailsArray.length)
                    resolve(false)
                }
            }))
        })
        return promise;
    }
}
