import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

@Component({
    selector: 'app-webpage-in-app',
    standalone: true,
    imports: [RouterModule, MatButtonModule],
    templateUrl: './webpage-in-app.component.html',
    styleUrl: './webpage-in-app.component.scss'
})
export class WebpageInAppComponent {

    private openedWindow: Window | null = null;
    displayIframe: boolean = false;
    url: string = 'https://jazzengel.nl'

    constructor(
        private sanitizer: DomSanitizer,

    ) { }

    openWebpage() {
        this.openedWindow = window.open('https://jazzengel.nl');
    }

    closeWebPage() {
        if (this.openedWindow) {
            this.openedWindow.close();
            this.openedWindow = null; // Reset reference
        }
    }
    // goToLink(url: string) {
    //     window.open(url, "_blank");
    // }
    toggleIframe() {
        this.displayIframe = !this.displayIframe;
    }

    getSafeUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
}
