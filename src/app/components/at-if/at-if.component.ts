import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-at-if',
    imports: [MatToolbarModule, RouterModule, RouterOutlet],
    templateUrl: './at-if.component.html',
    styleUrl: './at-if.component.scss'
})
export class AtIfComponent {

}
