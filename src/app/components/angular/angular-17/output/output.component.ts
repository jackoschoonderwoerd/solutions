import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-output',
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './output.component.html',
    styleUrl: './output.component.scss'
})
export class OutputComponent {

}
