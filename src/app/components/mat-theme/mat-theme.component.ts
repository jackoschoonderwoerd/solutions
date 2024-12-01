import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-mat-theme',
    imports: [RouterModule, MatToolbarModule],
    templateUrl: './mat-theme.component.html',
    styleUrl: './mat-theme.component.scss'
})
export class MatThemeComponent {

}
