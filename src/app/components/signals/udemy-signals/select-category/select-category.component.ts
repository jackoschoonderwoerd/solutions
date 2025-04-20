import { Component } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-select-category',
    imports: [
        MatSelectModule,
        MatFormFieldModule,
        MatOptionModule
    ],
    templateUrl: './select-category.component.html',
    styleUrl: './select-category.component.scss'
})
export class SelectCategoryComponent {

}
