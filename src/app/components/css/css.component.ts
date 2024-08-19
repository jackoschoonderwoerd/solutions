import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-css',
    standalone: true,
    imports: [
        RouterModule,
        MatToolbarModule
    ],
    templateUrl: './css.component.html',
    styleUrl: './css.component.scss'
})
export class CssComponent {

}
