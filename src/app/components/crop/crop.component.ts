import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-crop',
    imports: [RouterModule, MatToolbarModule],
    templateUrl: './crop.component.html',
    styleUrl: './crop.component.scss'
})
export class CropComponent {

}
