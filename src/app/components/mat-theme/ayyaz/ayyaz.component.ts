import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-ayyaz',
    imports: [MatDividerModule, MatButtonModule, MatIconModule, MatCheckboxModule],
    templateUrl: './ayyaz.component.html',
    styleUrl: './ayyaz.component.scss'
})
export class AyyazComponent {
    toggleTheme() {
        // add light-theme or dark-theme class to body
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        }
    }
}
