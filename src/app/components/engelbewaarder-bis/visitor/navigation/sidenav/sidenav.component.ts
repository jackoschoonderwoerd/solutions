import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [MatListModule, MatIconModule, RouterModule],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

    @Output() closeSidenav = new EventEmitter<void>

    toggleSidenav() {
        console.log('toogle')
        this.closeSidenav.emit()
    }
}
