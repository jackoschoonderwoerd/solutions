import { Component, Input } from '@angular/core';
import { EbConsumption } from '../../../types/eb-models';
import { CurrencyPipe } from '@angular/common';


@Component({
    selector: 'app-eb-consumption',
    standalone: true,
    imports: [CurrencyPipe],
    templateUrl: './eb-consumption.component.html',
    styleUrl: './eb-consumption.component.scss'
})
export class EbConsumptionComponent {
    @Input() ebConsumption: EbConsumption
}
