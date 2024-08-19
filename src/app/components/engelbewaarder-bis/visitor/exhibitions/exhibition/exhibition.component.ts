import { Component, inject, Input } from '@angular/core';
import { Exhibition } from '../../../types/eb-models';
import { DatePipe, JsonPipe } from '@angular/common';
import { ExhibitionDetailsComponent } from './exhibition-details/exhibition-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VisitorStore } from '../../../stores/visitor.store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-exhibition',
    standalone: true,
    imports: [
        JsonPipe,
        DatePipe,
        ExhibitionDetailsComponent,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        MatDialogModule
    ],
    templateUrl: './exhibition.component.html',
    styleUrl: './exhibition.component.scss'
})
export class ExhibitionComponent {
    @Input() exhibition: Exhibition;
    router = inject(Router)
    route = inject(ActivatedRoute)
    // viStore = inject(VisitorStore);
    dialog = inject(MatDialog)

    onInfo() {

        this.dialog.open(ExhibitionDetailsComponent, {
            data: { exhibition: this.exhibition },
            height: "calc(100% - 30px)",
            width: "calc(100% - 30px)",
            maxWidth: "30rem",
            maxHeight: "100%",
        })
    }
}
