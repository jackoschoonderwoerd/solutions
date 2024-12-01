import { Component, inject, OnInit } from '@angular/core';
import { SnacksSavoryComponent } from './snacks-savory/snacks-savory.component';
import { SnacksSweetComponent } from './snacks-sweet/snacks-sweet.component';
import { SnacksFromOmaBobsComponent } from './snacks-from-oma-bobs/snacks-from-oma-bobs.component';
import { VisitorStore } from '../../stores/visitor.store';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-snacks',
    imports: [
        SnacksSavoryComponent,
        SnacksSweetComponent,
        SnacksFromOmaBobsComponent,
        JsonPipe
    ],
    templateUrl: './snacks.component.html',
    styleUrl: './snacks.component.scss'
})
export class SnacksComponent {
    viStore = inject(VisitorStore)


}
