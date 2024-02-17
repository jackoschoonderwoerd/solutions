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
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { VascoComponent } from './components/loading-indicator/vasco/vasco.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, SidenavComponent, HighlightModule, VascoComponent],
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
