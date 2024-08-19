import { Component, inject, OnInit } from '@angular/core';
import { VisitorStore } from '../../../stores/visitor.store';
import { JsonPipe } from '@angular/common';
import { EbConsumptionComponent } from '../eb-consumption/eb-consumption.component';

@Component({
    selector: 'app-starters',
    standalone: true,
    imports: [JsonPipe, EbConsumptionComponent],
    templateUrl: './starters.component.html',
    styleUrl: './starters.component.scss'
})
export class StartersComponent implements OnInit {
    viStore = inject(VisitorStore)

    ngOnInit(): void {
        this.viStore.loadStarterDishesByLanguage()
    }
}
