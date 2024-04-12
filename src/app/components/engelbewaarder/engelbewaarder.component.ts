import { Component, inject, OnInit } from '@angular/core';
import { ConsumptionDetailsComponent } from './consumption-details/consumption-details.component';
import { ConsumptionsComponent } from './consumptions/consumptions.component';

import { EngelbewaarderService } from './services/engelbewaarder.service';
import { EngelbewaarderStore } from './store/engelbewaarder.store';
import { FirebaseError } from '@angular/fire/app';
import { FirestoreService } from '../../shared/firestore.service';
import { DocumentReference } from '@angular/fire/firestore';

import { StoreComponentComponent } from './store-component/store-component.component';
import { MatButtonModule } from '@angular/material/button';
import { CoursesComponent } from '../engelbewaarder-bis/courses/courses.component';
import { CourseDetailsComponent } from '../engelbewaarder-bis/consumption-type-details/course-details.component';
import { JsonPipe } from '@angular/common';


export interface Spirit {
    name: string;
    price: number;
}

@Component({
    selector: 'app-engelbewaarder',
    standalone: true,
    imports: [
        CoursesComponent,
        CourseDetailsComponent,
        ConsumptionsComponent,
        ConsumptionDetailsComponent,
        StoreComponentComponent,
        MatButtonModule,
        JsonPipe
    ],
    templateUrl: './engelbewaarder.component.html',
    styleUrl: './engelbewaarder.component.scss'
})
export class EngelbewaarderComponent implements OnInit {

    store = inject(EngelbewaarderStore);
    ebService = inject(EngelbewaarderService);
    fsService = inject(FirestoreService);
    baseUrl: string;

    ngOnInit(): void {
        this.baseUrl = this.ebService.getBaseUrl();
        this.checkForExistingCollection();
    }

    private checkForExistingCollection() {
        const path = `${this.baseUrl}/consumptions`
        this.fsService.getDoc(path)
            .subscribe((docRef: DocumentReference) => {
                if (docRef) {
                    console.log(docRef)
                }
                else {
                    console.log('no doc')

                    const doc = { consumptionTypes: [] }
                    this.fsService.setDoc(path, doc)
                        .then((res: any) => {
                            console.log(res);
                        })
                        .catch((err: FirebaseError) => {
                            alert(err.message)
                        })
                }
            })
    }
}
