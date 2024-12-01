import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar'

@Component({
    selector: 'app-signals',
    imports: [RouterModule, RouterOutlet, MatToolbar],
    templateUrl: './signals.component.html',
    styleUrl: './signals.component.scss'
})
export class SignalsComponent {

}
