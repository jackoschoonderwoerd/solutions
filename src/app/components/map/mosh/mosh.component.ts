import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-mosh',
    imports: [JsonPipe],
    templateUrl: './mosh.component.html',
    styleUrl: './mosh.component.scss'
})
export class MoshComponent implements OnInit {

    numbers = [1, -1, 2, 3];

    newNumbers = [1, -1, 2, 3];

    filtered = this.numbers.filter(n => n >= 0)

    items: any;

    joinedItems: any;

    itemsHtml: any;

    mappedObjects: any;

    mappedNewNumbers: any

    ngOnInit(): void {

        this.items = this.filtered.map(n => '<li>' + n + '</li>')
        this.joinedItems = this.items.join('')
        this.itemsHtml = '<ul>' + this.joinedItems + '</ul>'

        this.mappedObjects = this.filtered.map(n => ({ value: n }));

        console.log(this.mappedObjects)

        this.mappedNewNumbers = this.newNumbers
            .filter(n => n >= 0)
            .map(n => ({ value: n + 20 }))
            .filter(n => n.value > 21);
    }

}
