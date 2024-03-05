import { Component } from '@angular/core';

@Component({
    selector: 'app-timer',
    standalone: true,
    imports: [],
    templateUrl: './timer.component.html',
    styleUrl: './timer.component.scss'
})
export class TimerComponent {
    timer = 0;

    startTimer() {
        setInterval(() => {
            this.timer++;
        }, 1000)
    }
}
