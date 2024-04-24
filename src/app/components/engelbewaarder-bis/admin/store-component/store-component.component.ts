import { Component, inject } from '@angular/core';
import { EngelbewaarderStore } from '../../store/engelbewaarder.store';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-store-component',
    standalone: true,
    imports: [JsonPipe],
    templateUrl: './store-component.component.html',
    styleUrl: './store-component.component.scss'
})
export class StoreComponentComponent {
    store = inject(EngelbewaarderStore)
}
