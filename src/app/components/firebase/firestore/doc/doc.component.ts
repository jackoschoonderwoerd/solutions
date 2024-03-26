import { Component } from '@angular/core';
import { ShowCodeComponent } from '../../../../shared/show-code/show-code.component';

@Component({
    selector: 'app-doc',
    standalone: true,
    imports: [ShowCodeComponent],
    templateUrl: './doc.component.html',
    styleUrl: './doc.component.scss'
})
export class DocComponent {
    snippet_1: string = `const docRef = doc(this.firestore, path)`
}
