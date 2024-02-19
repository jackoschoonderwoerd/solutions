import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HanoService {

    constructor() { }

    selectedLanguage = signal<string>('')

    snipptes: string[] = [
        `
        APP.CONFIG.TS:

        importProvidersFrom(HttpClientModule), // or provideHttpClient() in Angular v15
        importProvidersFrom(
            TranslateModule.forChild({
                loader: {
                    provide: TranslateLoader,
                    useFactory: createTranslateLoader,
                    deps: [HttpClient],
                },
            })
        ),
        HttpClient,
        TranslateStore
        `
        ,
        `
        APP.CONFIG.TS:

        export function createTranslateLoader(http: HttpClient) {
            return new TranslateHttpLoader(http, './assets/ngx-translate/i18n/', '.json');
        }
        `
    ]
    getSnippets() {
        return this.snipptes;
    }

}
