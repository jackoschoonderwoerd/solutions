import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-async-await',
    standalone: true,
    imports: [RouterModule, MatToolbarModule],
    templateUrl: './async-await.component.html',
    styleUrl: './async-await.component.scss'
})
export class AsyncAwaitComponent {

}
