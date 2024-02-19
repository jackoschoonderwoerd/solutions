import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-ngx-translate',
    standalone: true,
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './ngx-translate.component.html',
    styleUrl: './ngx-translate.component.scss'
})
export class NgxTranslateComponent {

}
