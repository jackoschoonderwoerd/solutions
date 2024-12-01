import { Component, inject, OnInit } from '@angular/core';
import { VisitorStore } from '../../../stores/visitor.store';
import { JsonPipe } from '@angular/common';
import { SnackComponent } from '../snack/snack.component';

@Component({
    selector: 'app-snacks-from-oma-bobs',
    imports: [JsonPipe, SnackComponent],
    templateUrl: './snacks-from-oma-bobs.component.html',
    styleUrl: './snacks-from-oma-bobs.component.scss'
})
export class SnacksFromOmaBobsComponent implements OnInit {

    viStore = inject(VisitorStore)

    ngOnInit(): void {

        this.viStore.loadSnacksFormOmaBobsByLanguage()

    }
}
