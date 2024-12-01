import { Component, inject } from '@angular/core';
import { SweService } from './swe.service';
import { ShowCodeComponent } from '../../../shared/show-code/show-code.component';

@Component({
    selector: 'app-swe',
    imports: [ShowCodeComponent],
    templateUrl: './swe.component.html',
    styleUrl: './swe.component.scss'
})
export class SweComponent {
    // public sweService:
    sweService = inject(SweService)
}
