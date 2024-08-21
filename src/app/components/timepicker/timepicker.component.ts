

// https://tonysamperi.github.io/ngx-mat-timepicker/
// https://github.com/tonysamperi/ngx-mat-timepicker/blob/master/projects/ngx-mat-timepicker-repo/src/app/components/demo/demo.component.ts

import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
    NgxMatTimepickerComponent,
    NgxMatTimepickerLocaleService,
    NgxMatTimepickerToggleComponent,
    NgxMatTimepickerFieldComponent,
    NgxMatTimepickerDirective
} from "ngx-mat-timepicker";


@Component({
    selector: 'app-timepicker',
    standalone: true,
    imports: [
        MatFormFieldModule,
        FormsModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        NgFor,
        NgIf,
        FormsModule,
        // CodeViewerComponent,

        MatInputModule,
        NgxMatTimepickerDirective,
        NgxMatTimepickerComponent,
        NgxMatTimepickerFieldComponent,
        MatDatepickerModule,
        NgxMatTimepickerToggleComponent

    ],
    templateUrl: './timepicker.component.html',
    styleUrl: './timepicker.component.scss'
})
export class TimepickerComponent {

    start: string = '';
    end: string = '';


    onTimeSet(e) {
        console.log(e, typeof (e))
    }
    onPopulateTimepicker() {
        this.start = '15:00 AM';
        this.end = '19:00 AM';
    }
    onClearTimepicker() {
        this.start = '';
        this.end = '';
    }
}
