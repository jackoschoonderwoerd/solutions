import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { VascoService } from './vasco/vasco.service';
import { ShowCodeComponent } from '../../shared/show-code/show-code.component';

@Component({
    selector: 'app-loading-indicator',
    imports: [MatToolbarModule, RouterModule, ShowCodeComponent],
    templateUrl: './loading-indicator.component.html',
    styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent {
    snippets: string[] = [
        `
        if (this.detectRouteTransitions) {
            this.router.events
                .pipe(
                    tap((event) => {
                        if (event instanceof RouteConfigLoadStart) {
                            this.vascoService.loadingOn();
                        } else if (event instanceof RouteConfigLoadEnd) {
                            this.vascoService.loadingOff();
                        }
                    })
                )
                .subscribe();
        }`
        ,
        `
        CURRENTLY SET TO FALSE IN APP COMPONENT:
        <app-vasco-loading-indicator [detectRouteTransitions]="false" />
        `
    ]
}
