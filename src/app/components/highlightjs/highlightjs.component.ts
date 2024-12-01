import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';




@Component({
    selector: 'app-highlightjs',
    imports: [RouterModule, MatToolbarModule],
    templateUrl: './highlightjs.component.html',
    styleUrl: './highlightjs.component.scss'
})
export class HighlightjsComponent {

}
