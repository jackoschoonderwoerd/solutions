import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { VascoService } from './vasco.service';

@Component({
    selector: 'app-vasco',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './vasco.component.html',
    styleUrl: './vasco.component.scss'
})
export class VascoComponent {
    items: string[] = [
        'item-1',
        'item-2',
        'item-3'
    ]
    persons: Person[] = [
        {
            id: 1,
            name: 'jacko'
        },
        {
            id: 2,
            name: 'jan'
        }

    ]
    emptyArray: any[] = [];

    myMap = new Map([
        ["firstName", "Angular"],
        ["lastName", "Framework"],
    ]);
    public service = inject(VascoService)
    snippets = this.service.getSnippets()
}

export interface Person {
    id: number;
    name: string
}
