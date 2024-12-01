import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EngelbewaarderStore } from '../../../stores/engelbewaarder.store';
import { NgClass, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { VisitorStore } from '../../../stores/visitor.store';

@Component({
    selector: 'app-header',
    imports: [
        MatToolbarModule,
        MatIconModule, NgClass, NgStyle
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {


    viStore = inject(VisitorStore)
    router = inject(Router)

    @Output() sidenavToggle = new EventEmitter<void>

    toggleSidenav() {
        this.sidenavToggle.emit();
    }
    onSelectLanguage(language: string) {
        this.viStore.languageSelected(language)
        this.viStore.loadBeersByLanguage();
    }
    onLogin() {
        this.router.navigate(['login', { provenance: 'engelbewaarder-bis' }])
    }
}
