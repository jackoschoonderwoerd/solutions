import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import {
    HighlightModule,
    HIGHLIGHT_OPTIONS,
    HighlightOptions,
} from 'ngx-highlightjs';

import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { User as FirebaseUser } from "@angular/fire/auth";


import { VascoComponent } from './components/loading-indicator/vasco/vasco.component';
import { SecondTryComponent } from './components/dynamic-nested-menu/second-try/second-try.component';
import { NestedNavigationComponent } from './navigation/nested-navigation/nested-navigation.component';
import { MainStore } from './main.store';
import { AuthStore } from './shared/auth/auth.store';




@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        SidenavComponent,
        HighlightModule,
        VascoComponent,
        SecondTryComponent,
        NestedNavigationComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: <HighlightOptions>{
                lineNumbers: true,
            },
        },
    ],
})
export class AppComponent implements OnInit {
    title = 'solutions';

    mainStore = inject(MainStore)
    afAuth = inject(Auth);
    auStore = inject(AuthStore)



    ngOnInit(): void {
        onAuthStateChanged(this.afAuth, (user: FirebaseUser) => {
            if (user) {
                console.log(user)
                this.auStore.persistLogin();

            } else {
                console.log(' no user')
            }
        })
    }

}
