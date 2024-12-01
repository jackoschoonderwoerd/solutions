import { Component, inject, OnInit } from '@angular/core';
import { VisitorStore } from '../../../stores/visitor.store';
import { JsonPipe } from '@angular/common';
import { EbConsumptionComponent } from '../eb-consumption/eb-consumption.component';

@Component({
    selector: 'app-side',
    imports: [JsonPipe, EbConsumptionComponent],
    templateUrl: './side.component.html',
    styleUrl: './side.component.scss'
})
export class SideComponent implements OnInit {
    viStore = inject(VisitorStore)

    ngOnInit(): void {
        this.viStore.loadSideDishesConsumptionsByLanguage()
    }
}
