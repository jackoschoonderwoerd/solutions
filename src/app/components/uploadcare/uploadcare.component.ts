import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-uploadcare',
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './uploadcare.component.html',
    styleUrl: './uploadcare.component.scss'
})
export class UploadcareComponent {

}
