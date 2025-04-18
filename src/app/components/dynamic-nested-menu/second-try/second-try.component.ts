import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { SecondTryService } from './second-try.service';
import { SecondTryMenuComponent } from './second-try-menu/second-try-menu.component';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'app-second-try',
    imports: [
        MatMenuModule,
        MatButtonModule,
        SecondTryMenuComponent,
        JsonPipe
    ],
    templateUrl: './second-try.component.html',
    styleUrl: './second-try.component.scss'
})
export class SecondTryComponent {

    title = "mat-menu-dynamic-data";
    initialData: string[] = [];
    constructor(public secondTryService: SecondTryService) {

        this.secondTryService.getSubjects()
        // this.initialData = this.secondTryService.rootLevelNodes.slice();
        this.secondTryService.getRootlevelNodes().then((nodes: string[]) => {
            this.initialData = nodes
        });
    }
}
