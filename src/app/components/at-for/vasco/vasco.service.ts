import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VascoService {

    constructor() { }

    snippets: string[] = [
        `
    <ul>
        @for (color of colors; track color) {
            <li>{{ color }}</li>
        }
    </ul>
    `
    ]
    getSnippets() {
        return this.snippets;
    }
}
