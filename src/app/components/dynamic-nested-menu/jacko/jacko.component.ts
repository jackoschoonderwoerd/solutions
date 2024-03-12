import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { JackoService } from './jacko.service';
import { Subject } from '../../../navigation/navigation.service';
import { MenuComponent } from './menu-jacko/menu-jacko.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-jacko',
    standalone: true,
    imports: [
        MatMenuModule,
        MatButtonModule,
        MenuComponent,
    ],
    templateUrl: './jacko.component.html',
    styleUrl: './jacko.component.scss'
})
export class JackoComponent {
    title = "mat-menu-dynamic-data";

    initialData: string[] = [];
    constructor(private jackoService: JackoService) {
        this.initialData = this.jackoService.rootLevelNodes.slice();
    }
}
