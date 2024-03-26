import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-asynchronous',
    standalone: true,
    imports: [MatToolbar, RouterModule],
    templateUrl: './asynchronous.component.html',
    styleUrl: './asynchronous.component.scss'
})
export class AsynchronousComponent {

}
