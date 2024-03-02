import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-shiksha',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './shiksha.component.html',
    styleUrl: './shiksha.component.scss'
})
export class ShikshaComponent {

    url: string = '';

    onFileInputChange(event: any) {
        if (event.target.files) {
            var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.url = event.target.result
            }
        }
    }
}
