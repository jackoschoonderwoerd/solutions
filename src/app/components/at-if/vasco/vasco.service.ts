import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VascoService {

    snippets: string[] = [
        `
    @if(showHello) {
    <h2>Hello</h2>
    }
    `,
        `
    @else if (showGoodbye) {
    <h2>Goodbye</h2>
    }
    `,
        `
    @else {
    <h2>See you later</h2>
    }
    `
    ]
    getSnippets() {
        return this.snippets;
    }

    constructor() { }

}
