import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { VisitorStore } from '../../../stores/visitor.store';
import { EbConsumptionComponent } from '../eb-consumption/eb-consumption.component';

@Component({
    selector: 'app-vegetarian',
    standalone: true,
    imports: [JsonPipe, EbConsumptionComponent],
    templateUrl: './vegetarian.component.html',
    styleUrl: './vegetarian.component.scss'
})
export class VegetarianComponent implements OnInit {
    viStore = inject(VisitorStore)

    ngOnInit(): void {
        this.viStore.loadVegetarianDishesByLanguage()
    }
}
