import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-temporary-modal',
    imports: [MatProgressSpinnerModule],
    templateUrl: './temporary-modal.component.html',
    styleUrl: './temporary-modal.component.scss'
})
export class TemporaryModalComponent {

}
