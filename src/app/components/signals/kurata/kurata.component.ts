import { Component, OnInit, computed, effect, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KurataSignalsService } from './kurata-signals.service';

@Component({
    selector: 'app-kurata',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './kurata.component.html',
    styleUrl: './kurata.component.scss'
})
export class KurataComponent {
    quantity = signal<number>(1);
    qtyAvailable = signal<number[]>([1, 2, 3, 4, 5, 6])

    selectedVehicle = signal<Vehicle>({ id: 1, name: 'AT-AT', price: 10000 });

    vehicles = signal<Vehicle[]>([])

    exPrice = computed(() => this.selectedVehicle().price * this.quantity())

    constructor(
        private kurataSignalsService: KurataSignalsService
    ) {
        console.log(this.quantity());
        this.quantity.update(qty => qty * 2);

        this.selectedVehicle.update((v) => {
            v.price = v.price + (v.price * .2);
            return v
        })
    }

    qtyEff = effect(() => {
        console.log('Latest quantity', this.quantity());
    })



    onQuantitySelected(qty: number) {
        this.quantity.set(qty);
    }
}
export interface Vehicle {
    id: number,
    name: string,
    price: number
}

