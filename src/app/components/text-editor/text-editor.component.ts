import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-text-editor',
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './text-editor.component.html',
    styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {

}
