import { Component, Input, OnInit, inject } from '@angular/core';
import { JackoService } from '../jacko.service';
import { MatMenuModule } from '@angular/material/menu';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FirestoreService } from '../../../../shared/firestore.service';
import { Subject } from '../../../../navigation/navigation.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [
        MatMenuModule,
        NgFor,
        NgIf,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './menu-jacko.component.html',
    styleUrl: './menu-jacko.component.scss'
})
export class MenuComponent
// implements OnInit
{
    // jackoService = inject(JackoService)
    // fsService = inject(FirestoreService)
    @Input() data: string[] = [];
    @Input() trigger = "Trigger";
    @Input() isRootNode = false;
    isLoading = false;
    dataLoaded = false;
    // data: any
    dataMap: Map<string, string[]>

    jackoService = inject(JackoService)

    getData(node: string) {
        if (!this.dataLoaded) {
            this.isLoading = true;
            this.jackoService.getChildren(node).subscribe((d) => {
                this.data = d?.slice() || [];
                console.log(this.data)
                this.isLoading = false;
                this.dataLoaded = true;
            });
        }
    }

    isExpandable(node: string): boolean {
        console.log(this.jackoService.isExpandable(node))
        return this.jackoService.isExpandable(node);
    }
    // ngOnInit(): void {
    //     const pathToNavigation = `navigation`
    //     this.fsService.collection(pathToNavigation)
    //         .subscribe((subjects: any) => {
    //             console.log(subjects)
    //             this.data = this.jackoService.organizeSubjects(subjects)
    //             this.dataMap = new Map<string, string[]>(this.data)
    //         })

    // }
    // isExpandable(node: string): boolean {
    //     console.log(node)
    //     console.log(this.dataMap)
    //     console.log(this.dataMap.has(node))
    //     return this.dataMap.has(node)
    // }
}
