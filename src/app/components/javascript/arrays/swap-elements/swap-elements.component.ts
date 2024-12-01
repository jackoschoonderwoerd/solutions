import { Component } from '@angular/core';
import { ShowCodeComponent } from '../../../../shared/show-code/show-code.component';

@Component({
    selector: 'app-swap-elements',
    imports: [ShowCodeComponent],
    templateUrl: './swap-elements.component.html',
    styleUrl: './swap-elements.component.scss'
})
export class SwapElementsComponent {
    snippets: string[] = [
        `
    private swapElements(i, j): void {
        console.log(i, j)
        const newArray: Spirit[] = [...this.spiritsArray];
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        return newArray
    }
    `
    ]
}
