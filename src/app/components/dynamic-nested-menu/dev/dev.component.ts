import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './menu/menu.component';
import { DevService } from './dev.service';


@Component({
    selector: 'app-dev',
    standalone: true,
    imports: [
        MatMenuModule,
        MatButtonModule,
        MenuComponent
    ],
    templateUrl: './dev.component.html',
    styleUrl: './dev.component.scss'
})
export class DevComponent implements OnInit {
    title = "mat-menu-dynamic-data";
    initialData: string[] = [];
    dataMap
    stringifiedDataMap
    constructor(public database: DevService) {
        this.initialData = this.database.rootLevelNodes.slice();
    }
    ngOnInit(): void {
        this.stringifiedDataMap = JSON.stringify(Array.from(this.database.dataMap.entries()))
    }
}
