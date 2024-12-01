import { Component, Input, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { SecondTryService } from '../second-try.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorPageComponent } from '../../../../shared/error-page/error-page.component';

@Component({
    selector: 'app-second-try-menu',
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
    router = inject(Router)
    dialog = inject(MatDialog)

    database = inject(SecondTryService)

    isExpandable(node: string): boolean {
        return this.database.isExpandable(node);
    }
    getData(node: string) {
        if (!this.dataLoaded) {
            this.isLoading = true;
            this.database.getChildren(node).subscribe((d) => {
                this.data = d?.slice() || [];
                this.isLoading = false;
                this.dataLoaded = true;
            })
        }
    }
    navigate(node: string) {
        console.log(node);
        this.router.navigateByUrl(node)
            .then(() => { console.log(`route exists`) })
            .catch((err: any) => {
                console.log(`route does not exist ${err}`)
            })
    }
}
