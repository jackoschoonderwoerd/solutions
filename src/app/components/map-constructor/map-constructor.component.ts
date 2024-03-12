import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-map-contructor',
    standalone: true,
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './map-constructor.component.html',
    styleUrl: './map-constructor.component.scss'
})
export class MapConstructorComponent {

}
