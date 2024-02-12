import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-camera',
    standalone: true,
    imports: [RouterModule, MatToolbar],
    templateUrl: './camera.component.html',
    styleUrl: './camera.component.scss'
})
export class CameraComponent {

}
