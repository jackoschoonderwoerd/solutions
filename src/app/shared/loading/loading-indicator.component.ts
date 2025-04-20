import { Component, inject, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loading-indicator',
    imports: [MatProgressSpinnerModule],
    templateUrl: './loading-indicator.component.html',
    styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent {

    loadingService = inject(LoadingService)

    loading: Signal<boolean> = this.loadingService.loading

}
