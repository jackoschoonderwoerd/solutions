import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-async-await',
    standalone: true,
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './async-await.component.html',
    styleUrl: './async-await.component.scss'
})
export class AsyncAwaitComponent {

}
