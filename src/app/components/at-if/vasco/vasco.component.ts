import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HIGHLIGHT_OPTIONS, HighlightModule, HighlightOptions, HighlightResult } from 'ngx-highlightjs';


@Component({
    selector: 'app-vasco',
    standalone: true,
    imports: [MatButtonModule, HighlightModule],
    templateUrl: './vasco.component.html',
    styleUrl: './vasco.component.scss',
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: <HighlightOptions>{
                lineNumbers: true,
            },
        },
    ],
})
export class VascoComponent {

    response: HighlightResult;

    showHello: boolean = true;
    showGoodbye: boolean = true

    toggleShowHello() {
        this.showHello = !this.showHello
    }
    toggleShowGoodbye() {
        this.showGoodbye = !this.showGoodbye
    }
    code = `
    @if(showHello) {
    <h2>Hello</h2>
    }
    @else if (showGoodbye) {
    <h2>Goodbye</h2>
    }
    @else {
    <h2>See you later</h2>
    }
    <button mat-raised-button
        (click)="toggleShowHello()">Toggle showHello</button>
    <div class="show-hello-value">'showHello value: {{showHello}}'</div>
    <button mat-raised-button
        (click)="toggleShowGoodbye()">Toogle showGoodbye</button>
    <div class="show-goodbye-value">showGoodbye value: {{showGoodbye}}</div>`;
}
