import { Component, signal } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';

@Component({
    selector: 'app-basal',
    standalone: true,
    imports: [PaginationComponent],
    templateUrl: './basal.component.html',
    styleUrl: './basal.component.scss'
})
export class BasalComponent {
    currentPage = signal(1)

    onChange(page: number) {

    }
}
