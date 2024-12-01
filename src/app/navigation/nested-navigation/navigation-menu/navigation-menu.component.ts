import { Component, Input, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { NestedNavigationService } from '../nested-navigation.service';
import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation-menu',
    imports: [
        MatMenuModule,
        NgIf,
        NgFor,
        MatButtonModule,
        JsonPipe,
        MatProgressSpinner,
        CommonModule
    ],
    templateUrl: './navigation-menu.component.html',
    styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent {

    @Input() data: string[] = [];
    @Input() trigger = "Trigger";
    @Input() isRootNode = false;

    router = inject(Router)
    database = inject(NestedNavigationService)
    isLoading = false;
    dataLoaded = false;


    getData(node: string) {
        console.log(node)
        this.database.addNode(node)

        if (!this.dataLoaded) {
            this.isLoading = true;
            this.database.getChildren(node).subscribe((d: any) => {
                this.data = d?.slice() || [];
                this.isLoading = false;
                this.dataLoaded = true;
            });
        }
    }

    isExpandable(node: string) {
        return this.database.isExpandable(node);
    }
    onRootNode() {
        this.database.nodes = []
    }
    onNode(node: string) {
        const nodes = this.database.getNodes()

        let path: string = ''
        if (nodes.length === 0) {
            path = `${node}`
        } else if (nodes.length === 1) {
            path = `${nodes[0]}/${node}`
        } else if (nodes.length === 2) {
            path = `${nodes[0]}/${nodes[1]}/${node}`
        }
        this.router.navigateByUrl(path);


    }
}
