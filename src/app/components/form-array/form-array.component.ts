import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-form-array',
    standalone: true,
    imports: [MatToolbar, RouterModule],
    templateUrl: './form-array.component.html',
    styleUrl: './form-array.component.scss'
})
export class FormArrayComponent {

}
