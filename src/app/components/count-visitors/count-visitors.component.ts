import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-count-visitors',
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './count-visitors.component.html',
    styleUrl: './count-visitors.component.scss'
})
export class CountVisitorsComponent {

}
