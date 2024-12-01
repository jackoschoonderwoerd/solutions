import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ShowCodeComponent } from '../../../shared/show-code/show-code.component';

@Component({
    selector: 'app-monsterlessons',
    imports: [JsonPipe, ShowCodeComponent],
    templateUrl: './monsterlessons.component.html',
    styleUrl: './monsterlessons.component.scss'
})
export class MonsterlessonsComponent implements OnInit {

    map;
    stringifiedMap;
    snippetStringifiedMap = `JSON.stringify(Array.from(this.map.entries()))`
    objectifiedMap;
    snippetObjectifiedMap = `JSON.stringify(Object.fromEntries(this.map));`
    arrayFromMap: any;

    ngOnInit(): void {
        this.map = new Map([
            ['foo', 'foofoo'],
            ['bar', 'barbar']
        ])
        this.map.set('baz', 'bazbaz')
        console.log(this.map)
        console.log(this.map.foo)
        console.log(this.map[0])
        console.log(this.map.get('foo'))

        console.log(this.map.size)

        for (const [key, value] of this.map) {
            console.log(key, value);

        }
        console.log(JSON.stringify(Array.from(this.map.entries())))
        this.stringifiedMap = JSON.stringify(Array.from(this.map.entries()))

        this.objectifiedMap = JSON.stringify(Object.fromEntries(this.map));

        // this.arrayFromMap = Array.from(this.map, ([key, value]) => `${key} ${value}`)


    }
}
