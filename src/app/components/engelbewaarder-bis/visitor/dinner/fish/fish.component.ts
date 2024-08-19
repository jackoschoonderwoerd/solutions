import { Component, inject, OnInit } from '@angular/core';
import { VisitorStore } from '../../../stores/visitor.store';
import { JsonPipe } from '@angular/common';
import { EbConsumptionComponent } from '../eb-consumption/eb-consumption.component';

@Component({
    selector: 'app-fish',
    standalone: true,
    imports: [JsonPipe, EbConsumptionComponent],
    templateUrl: './fish.component.html',
    styleUrl: './fish.component.scss'
})
export class FishComponent implements OnInit {
    viStore = inject(VisitorStore)

    ngOnInit(): void {
        this.viStore.loadFishCourseByLanguage()
    }
}
