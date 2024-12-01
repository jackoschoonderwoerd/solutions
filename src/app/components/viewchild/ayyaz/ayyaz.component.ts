import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TimerComponent } from './timer/timer.component';

@Component({
    selector: 'app-ayyaz',
    imports: [TimerComponent],
    templateUrl: './ayyaz.component.html',
    styleUrl: './ayyaz.component.scss'
})
export class AyyazComponent implements AfterViewInit {
    @ViewChild('myParagraph') paragraph: ElementRef;
    @ViewChild('timerComponent') timerComponent: TimerComponent;
    @ViewChild('myInput') myInput: ElementRef<HTMLInputElement>;

    ngAfterViewInit(): void {
        if (this.paragraph) {
            setTimeout(() => {

                this.paragraph.nativeElement.textContent = 'Hello world'
            }, 1000);
        }

        if (this.timerComponent) {
            this.timerComponent.startTimer();
        }
        if (this.myInput) {
            this.myInput.nativeElement.focus();
            // not working
        }
    }
}
