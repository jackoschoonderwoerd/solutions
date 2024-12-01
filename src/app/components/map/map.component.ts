import { Component, OnInit } from '@angular/core';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-map',
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss'
})
export class MapComponent {



}
