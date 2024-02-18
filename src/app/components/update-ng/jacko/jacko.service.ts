import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JackoService {

    constructor() { }

    snippets: string[] = [
        `npm install -g @angular/cli`,
        'ng update @angular/core',
        'ng update'
    ]
    getSnippets() {
        return this.snippets;
    }
}
