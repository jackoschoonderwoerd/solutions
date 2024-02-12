import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-techshareskk',
    standalone: true,
    imports: [CommonModule, MatButtonModule, WebcamModule],
    templateUrl: './techshareskk.component.html',
    styleUrl: './techshareskk.component.scss'
})
export class TechshareskkComponent implements OnInit {
    width = 300
    status: string = null;
    stream: any = null;
    trigger: Subject<void> = new Subject();
    previewImage: string = '';
    buttonLabel: string = 'capture'

    get $trigger(): Observable<void> {
        return this.trigger.asObservable();
    }

    ngOnInit(): void {
        this.checkPermissions();
    }

    capture() {
        this.trigger.next();
    }
    handleInitError(error: WebcamInitError) {
        if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
            console.warn("Camera access was not allowed by user!");
            this.status = "Camera access was not allowed by user!"
        }
    }

    snapshot(e: WebcamImage) {
        this.previewImage = e.imageAsDataUrl;
        this.buttonLabel = 'Recapture image'
    }
    save() {
        console.log(this.previewImage);
        alert('Save the image somewhere')
    }
    checkPermissions() {

        navigator.mediaDevices.getUserMedia({
            video: {
                width: 200,
                height: 500
            }
        })
            .then((res) => {
                console.log(res)
                this.stream = res;
                this.status = 'My camera is accessing.'
            })
            .catch((err) => {
                console.log(err)
                alert('camera access denied')
                if (err?.message === 'Permission denied') {
                    this.status = 'Permission denied please try again after approving access'
                } else {
                    this.status = 'Camera not available due to unknow reason';
                }
            })
    }
}
