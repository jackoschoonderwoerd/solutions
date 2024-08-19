import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../shared/firestore.service';

import { CurrencyPipe, JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { BeerInfoDialogComponent } from './beer-info-dialog/beer-info-dialog.component';
import { VisitorStore } from '../../stores/visitor.store';

@Component({
    selector: 'app-beer',
    standalone: true,
    imports: [
        JsonPipe,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        CurrencyPipe
    ],
    templateUrl: './beer.component.html',
    styleUrl: './beer.component.scss'
})
export class BeerComponent implements OnInit {
    fsService = inject(FirestoreService);

    viStore = inject(VisitorStore)
    dialog = inject(MatDialog)

    ngOnInit(): void {
        // this.store.loadBeer();
        this.viStore.loadBeersByLanguage();
    }
    onInfo(beer) {
        console.log(beer)
        this.dialog.open(BeerInfoDialogComponent, { data: { beer } })
    }
}
