import { Component } from '@angular/core';
import { ShowCodeComponent } from '../../../../shared/show-code/show-code.component';

@Component({
    selector: 'app-collection',
    imports: [ShowCodeComponent],
    templateUrl: './collection.component.html',
    styleUrl: './collection.component.scss'
})
export class CollectionComponent {
    snippet_1: string = `collection(this.firestore, path)`;
}
