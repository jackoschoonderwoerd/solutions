import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-vasco',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './vasco.component.html',
    styleUrl: './vasco.component.scss'
})
export class VascoComponent {
    showHello: boolean = true;
    showGoodbye: boolean = true

    toggleShowHello() {
        this.showHello = !this.showHello
    }
    toggleShowGoodbye() {
        this.showGoodbye = !this.showGoodbye
    }
}
