import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dynamic-nested-menu',
    standalone: true,
    imports: [MatToolbar, RouterModule],
    templateUrl: './dynamic-nested-menu.component.html',
    styleUrl: './dynamic-nested-menu.component.scss'
})
export class DynamicNestedMenuComponent {

}
