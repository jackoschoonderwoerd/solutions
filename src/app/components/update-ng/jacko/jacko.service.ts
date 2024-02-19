import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JackoService {

    constructor() { }

    snippets: string[] = [
        `ng version`,
        `npm install -g @angular/cli`,
        'ng update @angular/core',
        'ng update'
    ]
    getSnippets() {
        return this.snippets;
    }
}
