import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import {
    HighlightModule,
    HIGHLIGHT_OPTIONS,
    HighlightOptions,
} from 'ngx-highlightjs';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, SidenavComponent, HighlightModule],
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
export class AppComponent {
    title = 'solutions';

}
