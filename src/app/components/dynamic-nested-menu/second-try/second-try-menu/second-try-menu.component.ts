import { Component, Input, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { SecondTryService } from '../second-try.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-second-try-menu',
    standalone: true,
    imports: [
        MatMenuModule,
        NgFor,
        NgIf,
        MatButtonModule,
        MatProgressSpinnerModule,
        JsonPipe
    ],
    templateUrl: './second-try-menu.component.html',
    styleUrl: './second-try-menu.component.scss'
})
export class SecondTryMenuComponent {
    @Input() data: string[] = [];
    @Input() trigger = "Trigger";
    @Input() isRootNode = false;
    isLoading = false;
    dataLoaded = false;

    database = inject(SecondTryService)

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
            })
        }
    }
}
