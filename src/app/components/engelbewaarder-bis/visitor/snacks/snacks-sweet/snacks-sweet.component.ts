import { Component, inject, OnInit } from '@angular/core';
import { VisitorStore } from '../../../stores/visitor.store';
import { SnackComponent } from '../snack/snack.component';

@Component({
    selector: 'app-snacks-sweet',
    standalone: true,
    imports: [SnackComponent],
    templateUrl: './snacks-sweet.component.html',
    styleUrl: './snacks-sweet.component.scss'
})
export class SnacksSweetComponent implements OnInit {

    viStore = inject(VisitorStore)

    ngOnInit(): void {
        this.viStore.loadSweetSnacksByLanguage();
    }
}
