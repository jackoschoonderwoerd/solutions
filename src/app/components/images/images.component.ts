import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-images',
    imports: [MatToolbar, RouterModule],
    templateUrl: './images.component.html',
    styleUrl: './images.component.scss'
})
export class ImagesComponent {

}
