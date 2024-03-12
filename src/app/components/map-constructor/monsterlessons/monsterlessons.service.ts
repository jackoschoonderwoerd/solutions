import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MonsterlessonsService {

    constructor() { }

    snippets: string[] = [
        `this.stringifiedMap = JSON.stringify(Array.from(this.map.entries()))`,

    ]
}
