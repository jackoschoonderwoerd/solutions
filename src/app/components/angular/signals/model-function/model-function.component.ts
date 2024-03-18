import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-model-function',
    standalone: true,
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './model-function.component.html',
    styleUrl: './model-function.component.scss'
})
export class ModelFunctionComponent {

}
