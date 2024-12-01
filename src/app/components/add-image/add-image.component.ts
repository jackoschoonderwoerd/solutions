import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-add-image',
    imports: [RouterModule, MatToolbarModule],
    templateUrl: './add-image.component.html',
    styleUrl: './add-image.component.scss'
})
export class AddImageComponent {

}
// https://www.youtube.com/watch?v=SIf5mFz1lWI