import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-at-for',
    standalone: true,
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './at-for.component.html',
    styleUrl: './at-for.component.scss'
})
export class AtForComponent {

}
