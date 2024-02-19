import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { HanoService } from './hano.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ShowCodeComponent } from '../../../shared/show-code/show-code.component';
import { MatCardModule } from '@angular/material/card';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http)
}

@Component({
    selector: 'app-hano',
    standalone: true,
    imports: [
        MatToolbarModule,
        NavbarComponent,
        HttpClientModule,
        TranslateModule,
        ShowCodeComponent,
        MatCardModule

    ],
    templateUrl: './hano.component.html',
    styleUrl: './hano.component.scss',
    providers: [

    ]
})
export class HanoComponent implements OnInit {
    public hanoService = inject(HanoService)
    snippets: string[] = []
    person = {
        home: 'thuis',
        about: 'over ons'
    }

    constructor(
        private translateService: TranslateService
    ) {
        this.translateService.setDefaultLang('en');
        this.translateService.use(localStorage.getItem('language') || 'en')
    }

    ngOnInit(): void {
        this.snippets = this.hanoService.getSnippets();
    }
}
