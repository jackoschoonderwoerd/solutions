import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-viewchild',
    standalone: true,
    imports: [MatToolbarModule, RouterModule],
    templateUrl: './viewchild.component.html',
    styleUrl: './viewchild.component.scss'
})
export class ViewchildComponent {

}
