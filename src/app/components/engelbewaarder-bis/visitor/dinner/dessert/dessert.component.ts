import { Component, inject, OnInit } from '@angular/core';
import { EngelbewaarderStore } from '../../../stores/engelbewaarder.store';
import { JsonPipe } from '@angular/common';
import { VisitorStore } from '../../../stores/visitor.store';
import { EbConsumptionComponent } from '../eb-consumption/eb-consumption.component';

@Component({
    selector: 'app-dessert',
    imports: [JsonPipe, EbConsumptionComponent],
    templateUrl: './dessert.component.html',
    styleUrl: './dessert.component.scss'
})
export class DessertComponent implements OnInit {
    viStore = inject(VisitorStore);

    ngOnInit(): void {
        this.viStore.loadDesertsByLanguage();
    }
}

