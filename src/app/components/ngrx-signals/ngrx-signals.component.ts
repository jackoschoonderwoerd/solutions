import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-ngrx-signals',
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './ngrx-signals.component.html',
    styleUrl: './ngrx-signals.component.scss'
})
export class NgrxSignalsComponent {

}
