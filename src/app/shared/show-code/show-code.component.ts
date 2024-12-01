import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-show-code',
    imports: [],
    templateUrl: './show-code.component.html',
    styleUrl: './show-code.component.scss'
})
export class ShowCodeComponent {
    @Input() snippet: string

    constructor() {
        console.log(this.snippet)
    }
}
