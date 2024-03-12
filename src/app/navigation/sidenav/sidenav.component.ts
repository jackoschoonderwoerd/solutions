import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavigationService, Subject } from '../navigation.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../shared/firestore.service';
import { CommonModule, JsonPipe } from '@angular/common';



@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [
        RouterModule,
        RouterOutlet,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        JsonPipe,
        CommonModule
    ],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
    navigationService = inject(NavigationService);
    router = inject(Router)
    menuItems;
    subjects: Subject[] = [];
    subjects$: Observable<any>;

    fsService = inject(FirestoreService)
    baseUrl = 'navigation'



    ngOnInit(): void {

        this.menuItems = this.navigationService.getMenuItems().sort();
        // this.menuItems = this.menuItems.sort();
        this.subjects = this.navigationService.getSubjects();
        const pathToSubjects = `${this.baseUrl}`
        this.subjects$ = this.fsService.collection(pathToSubjects)
    }

    addNaviagionSubject() {
        this.router.navigateByUrl('add-navigation-item')
    }
    disableExpansionPanel() {
        // return true
        console.log('hi ther')
    }
}
