import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-ng-module',
    imports: [RouterModule, RouterOutlet, MatToolbarModule],
    templateUrl: './ng-module.component.html',
    styleUrl: './ng-module.component.scss'
})
export class NgModuleComponent {

}
