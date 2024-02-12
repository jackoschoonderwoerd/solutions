import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-java-brains',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './java-brains.component.html',
    styleUrl: './java-brains.component.scss'
})
export class JavaBrainsComponent {
    inputText = 'input text'
}
