import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-google-translate',
    standalone: true,
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './google-translate.component.html',
    styleUrl: './google-translate.component.scss'
})
export class GoogleTranslateComponent {

}
