import { Component, OnInit, inject } from '@angular/core';
import { NestedNavigationService } from './nested-navigation.service';
import { Subject } from '../navigation.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { Book } from './navigation.models';

@Component({
    selector: 'app-nested-navigation',
    standalone: true,
    imports: [
        MatMenuModule,
        MatButtonModule,
        NavigationMenuComponent
    ],
    templateUrl: './nested-navigation.component.html',
    styleUrl: './nested-navigation.component.scss'
})
export class NestedNavigationComponent implements OnInit {

    title = "mat-menu-dynamic-data";
    initialData: string[] = [];
    constructor(private database: NestedNavigationService) {
        this.initialData = this.database.getRootLevelNodes();
    }

    // database = inject(NestedNavigationService)
    books: Book[]
    ngOnInit(): void {
        this.books = [];
        this.database.getBook()
            .then((book: []) => {
                // console.log(subjects)
            })

    }
}
