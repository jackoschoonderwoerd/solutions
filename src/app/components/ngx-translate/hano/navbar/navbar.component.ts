import { Component, OnInit, effect, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { HanoService } from '../hano.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface Language {
    name: string;
    abr: string;
}

@Component({
    selector: 'app-navbar',
    imports: [MatToolbarModule, MatSelectModule, TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})


export class NavbarComponent implements OnInit {
    hanoServise = inject(HanoService)
    languages: Language[] = [
        {
            name: 'english',
            abr: 'en'
        },
        {
            name: 'french',
            abr: 'fr'
        },
        {
            name: 'spanish',
            abr: 'es'
        }
    ]

    constructor(
        private translateService: TranslateService
    ) {

    }
    ngOnInit(): void {
        console.log(localStorage.getItem('language'))
        if (localStorage.getItem('language') !== null) {
            this.hanoServise.selectedLanguage.set(localStorage.getItem('language'))
        } else {
            this.hanoServise.selectedLanguage.set('en');
        }

    }

    languageSelected(event: any) {
        this.hanoServise.selectedLanguage.set(event.value);
        localStorage.setItem('language', event.value);

        this.translateService.use(event.value)
    }
}
