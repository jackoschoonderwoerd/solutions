import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { VascoSignalsService } from './vasco-signals.service';
import { MatButtonModule } from '@angular/material/button'

@Component({
    selector: 'app-vasco',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './vasco.component.html',
    styleUrl: './vasco.component.scss'
})
export class VascoComponent implements OnInit {



    derivedCounter = computed(() => {
        const counter = this.vascoSignalsService.counter();

        return counter * 10;
    })

    constructor(
        public vascoSignalsService: VascoSignalsService
    ) {
        console.log(`counter value ${this.vascoSignalsService.counter()}`);
        this.list().push("Again");

        this.object().title = "overwriting title";

        effect(() => {

            // We just have to use the source signals
            // somewhere inside this effect
            // const currentCount = this.counter();

            const derivedCounter = this.derivedCounter();

            console.log(`current values: ${derivedCounter}`);

        });
    }

    ngOnInit(): void {
        console.log('oninit')
    }

    increment() {
        this.vascoSignalsService.increment();
        console.log(`counter value ${this.vascoSignalsService.counter()}`)

        //The effect will be re-run whenever any
        // of the signals that it uses changes value.

    }



    // ----------

    list = signal([
        "Hello",
        "World"
    ]);

    object = signal({
        id: 1,
        title: "Angular For Beginners"
    });


}
