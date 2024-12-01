import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MainStore } from '../../../../../main.store';

@Component({
    selector: 'app-sidenav',
    imports: [MatListModule, MatIconModule, RouterModule],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

    @Output() closeSidenav = new EventEmitter<void>

    mainStore = inject(MainStore)

    toggleSidenav() {
        console.log('toogle')
        this.closeSidenav.emit()
    }
    toggleMainSidenav() {

    }
}
