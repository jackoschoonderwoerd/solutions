import { Component, Input, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { DevService } from '../dev.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-menu',
    imports: [
        MatMenuModule,
        NgFor,
        NgIf,
        MatButtonModule,
        MatProgressSpinnerModule,
        JsonPipe
    ],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent {
    @Input() data: string[] = [];
    @Input() trigger = "Trigger";
    @Input() isRootNode = false;
    isLoading = false;
    dataLoaded = false;

    database = inject(DevService)

    isExpandable(node: string): boolean {
        return this.database.isExpandable(node);
    }
    getData(node: string) {
        if (!this.dataLoaded) {
            this.isLoading = true;
            this.database.getChildren(node).subscribe((d) => {
                console.log(d)
                this.data = d?.slice() || [];
                this.isLoading = false;
                this.dataLoaded = true;
            });
        }
    }
}
