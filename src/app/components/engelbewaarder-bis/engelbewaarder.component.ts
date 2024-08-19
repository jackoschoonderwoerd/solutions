import { Component, inject, OnInit } from '@angular/core';
import { ConsumptionDetailsComponent } from './admin/consumption-details/consumption-details.component';
import { ConsumptionsComponent } from './admin/consumptions/consumptions.component';
import { CoursesComponent } from './admin/courses/courses.component';
import { EngelbewaarderService } from './services/engelbewaarder.service';
import { EngelbewaarderStore } from './stores/engelbewaarder.store';
import { FirebaseError } from '@angular/fire/app';
import { FirestoreService } from '../../shared/firestore.service';
import { DocumentReference } from '@angular/fire/firestore';
import { CourseDetailsComponent } from './admin/course-details/course-details.component';
import { StoreComponentComponent } from './admin/store-component/store-component.component';
import { MatButtonModule } from '@angular/material/button';
import { LandingPageComponent } from './visitor/landing-page/landing-page.component';
import { ExhibitionsAdminComponent } from './admin/exhibitions-admin/exhibitions-admin.component';
import { ExhibitionsAdminStore } from './stores/exhibitions-admin.store';
import { LoginComponent } from '../../shared/auth/login/login.component';
import { Router } from '@angular/router';
import { AuthStore } from '../../shared/auth/auth.store';
import { MatIconModule } from '@angular/material/icon';
import { VisitorStore } from './stores/visitor.store';


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
        LandingPageComponent,
        ExhibitionsAdminComponent,
        LoginComponent,
        MatIconModule
    ],

    templateUrl: './engelbewaarder.component.html',
    styleUrl: './engelbewaarder.component.scss'
})
export class EngelbewaarderComponent implements OnInit {

    store = inject(EngelbewaarderStore);
    auStore = inject(AuthStore)
    exStore = inject(ExhibitionsAdminStore)
    ebService = inject(EngelbewaarderService);
    fsService = inject(FirestoreService);
    viStore = inject(VisitorStore)
    baseUrl: string;
    router = inject(Router)

    ngOnInit(): void {
        this.baseUrl = this.ebService.getBaseUrl();
        // this.checkForExistingCollection();
        this.viStore.checkLS()

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
    login() {
        this.store.changeAccess()
        this.router.navigateByUrl('login')
    }
    onLogout() {
        this.auStore.logout();
    }
}
