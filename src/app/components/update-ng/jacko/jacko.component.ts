import { Component, OnInit, inject } from '@angular/core';
import { JackoService } from './jacko.service';
import { ShowCodeComponent } from '../../../shared/show-code/show-code.component';

@Component({
    selector: 'app-jacko',
    standalone: true,
    imports: [ShowCodeComponent],
    templateUrl: './jacko.component.html',
    styleUrl: './jacko.component.scss'
})
export class JackoComponent {
    jackoService = inject(JackoService)
    snippets = this.jackoService.getSnippets();

}
