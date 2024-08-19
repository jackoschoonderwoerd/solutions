import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EbConsumption } from '../../../types/eb-models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-beer-info-dialog',
    standalone: true,
    imports: [JsonPipe, MatDialogModule, MatIconModule, MatButtonModule],
    templateUrl: './beer-info-dialog.component.html',
    styleUrl: './beer-info-dialog.component.scss'
})
export class BeerInfoDialogComponent implements OnInit {
    public data: any = inject(MAT_DIALOG_DATA)
    beer: EbConsumption

    ngOnInit(): void {
        this.beer = this.data.beer
    }
}
