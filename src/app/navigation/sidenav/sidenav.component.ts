import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [RouterModule, RouterOutlet, MatToolbarModule],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

}
