import { Component, inject, OnInit } from '@angular/core';
import { VisitorStore } from '../../../stores/visitor.store';
import { JsonPipe } from '@angular/common';
import { EbConsumptionComponent } from '../eb-consumption/eb-consumption.component';

@Component({
    selector: 'app-meat',
    imports: [JsonPipe, EbConsumptionComponent],
    templateUrl: './meat.component.html',
    styleUrl: './meat.component.scss'
})
export class MeatComponent implements OnInit {
    viStore = inject(VisitorStore)

    ngOnInit(): void {
        // this.viStore.loadMeatDishesByLanguage();
        this.viStore.loadMeatCourseByLanguage();
    }
}
