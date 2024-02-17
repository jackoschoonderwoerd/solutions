import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { VascoService } from './vasco.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { ShowCodeComponent } from '../../../shared/show-code/show-code.component';

@Component({
    selector: 'app-vasco-loading-indicator',
    standalone: true,
    imports: [MatProgressSpinnerModule, AsyncPipe, NgIf, NgTemplateOutlet, ShowCodeComponent],
    templateUrl: './vasco.component.html',
    styleUrl: './vasco.component.scss'
})
export class VascoComponent {
    loading$: Observable<boolean>;
    snippets$: Observable<string[]>

    @Input()
    detectRouteTransitions = false;

    @ContentChild("loading")
    customLoadingIndicator: TemplateRef<any> | null = null;

    constructor(
        public vascoService: VascoService,
        private router: Router) {
        // this.loading$ = this.vascoService.loading$;
    }

    ngOnInit() {

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
        }
    }

}
