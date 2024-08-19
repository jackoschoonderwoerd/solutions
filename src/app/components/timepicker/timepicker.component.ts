// https://agranom.github.io/ngx-material-timepicker/
// https://www.npmjs.com/package/ngx-material-timepicker

import { Component } from '@angular/core';


@Component({
    selector: 'app-timepicker',
    standalone: true,
    imports: [NgxMaterialTimepickerModule],
    templateUrl: './timepicker.component.html',
    styleUrl: './timepicker.component.scss'
})
export class TimepickerComponent {
    onInputFromChange(e: any) {
        console.log(e)
    }
}
