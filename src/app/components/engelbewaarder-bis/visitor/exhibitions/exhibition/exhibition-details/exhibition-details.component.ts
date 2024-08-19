import { Component, ElementRef, HostListener, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Exhibition } from '../../../../types/eb-models';
import { fromEvent } from "rxjs";
import { VisitorStore } from '../../../../stores/visitor.store';






@Component({
    selector: 'app-exhibition-details',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        JsonPipe,
        DatePipe,
        CurrencyPipe,
        MatDialogModule,

    ],
    templateUrl: './exhibition-details.component.html',
    styleUrl: './exhibition-details.component.scss',

})
export class ExhibitionDetailsComponent implements OnInit {
    router = inject(Router);
    data = inject(MAT_DIALOG_DATA);
    exhibition: Exhibition;
    viStore = inject(VisitorStore)

    public clicked: string = 'none';
    @ViewChild('wrapper') public wrapper: ElementRef;



    @HostListener("window:scroll", ['$event'])
    onWindowScroll() {
        const offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
        console.log(offset);
    }




    constructor(public matDialogRef: MatDialogRef<ExhibitionDetailsComponent>) { }

    ngOnInit(): void {
        this.exhibition = this.data.exhibition;
        this.viStore.loadExhibitionByLanguage(this.exhibition)
        addEventListener("scroll", (event) => { console.log(event) });


    }

    onBackToExhibitionsOverview() {
        // this.router.navigateByUrl('engelbewaarder-bis/exhibitions')
    }
    onClose() {
        this.matDialogRef.close();
    }
    onChangeLanguage(languageAbbr: string) {
        this.viStore.languageSelected(languageAbbr);
    }
}
