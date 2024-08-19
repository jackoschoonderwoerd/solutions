import { Component, Input } from '@angular/core';
import { EbConsumption } from '../../../types/eb-models';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-snack',
    standalone: true,
    imports: [CurrencyPipe],
    templateUrl: './snack.component.html',
    styleUrl: './snack.component.scss'
})
export class SnackComponent {
    @Input() snack: EbConsumption
}
