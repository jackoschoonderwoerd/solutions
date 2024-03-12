import { Injectable } from '@angular/core';
import { delay, of } from "rxjs";
import { Observable } from 'tinymce';

@Injectable({
    providedIn: 'root'
})
export class DevService {

    dataMap = new Map<string, string[]>([
        ["Fruits", ["Apple", "Orange", "Banana"]],
        ["Vegetables", ["Tomato", "Potato", "Onion"]],
        ["Apple", ["Fuji", "Macintosh"]],
        ["Onion", ["Yellow", "White", "Purple"]],
        ["Macintosh", ["Yellow", "White", "Purple"]],

    ]);

    rootLevelNodes: string[] = ["Fruits", "Vegetables", "andSome"];

    getChildren(node: string) {
        // adding delay to mock a REST API call
        return of(this.dataMap.get(node)).pipe(delay(1000));
    }

    isExpandable(node: string): boolean {

        // console.log(this.dataMap)
        // console.log(node, '/', this.dataMap.has(node));
        // console.log(node)
        // console.log(node, '/', this.dataMap);
        return this.dataMap.has(node);
    }
    getStringifiedDataMap() {
        return JSON.stringify(Array.from(this.dataMap.entries()))
    }
}
