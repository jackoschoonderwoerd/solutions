import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../shared/firestore.service';
import { EngelbewaarderStore } from '../../store/engelbewaarder.store';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-beer',
    standalone: true,
    imports: [JsonPipe],
    templateUrl: './beer.component.html',
    styleUrl: './beer.component.scss'
})
export class BeerComponent implements OnInit {
    fsService = inject(FirestoreService);
    store = inject(EngelbewaarderStore)

    ngOnInit(): void {
        this.store.loadBeer();
    }
}
