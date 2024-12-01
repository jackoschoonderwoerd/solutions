import { Component, inject, OnInit } from '@angular/core';
import { VisitorStore } from '../../../stores/visitor.store';
import { SnackComponent } from '../snack/snack.component';

@Component({
    selector: 'app-snacks-savory',
    imports: [SnackComponent],
    templateUrl: './snacks-savory.component.html',
    styleUrl: './snacks-savory.component.scss'
})
export class SnacksSavoryComponent implements OnInit {



    viStore = inject(VisitorStore)

    ngOnInit(): void {
        this.viStore.loadSavorySnacksByLanguage();
    }
}
