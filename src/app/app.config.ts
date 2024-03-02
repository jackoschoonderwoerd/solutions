import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from './../environments/environment';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/ngx-translate/i18n/', '.json');
}


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
        importProvidersFrom(
            provideAuth(() => getAuth())),
        importProvidersFrom(
            provideFirestore(() => getFirestore())
        ),
        importProvidersFrom(
            provideFunctions(() => getFunctions())),
        importProvidersFrom(
            provideStorage(() => getStorage())),
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                // themePath: 'assets/styles/solarized-dark.css',
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
                languages: {
                    xml: () => import('highlight.js/lib/languages/xml'),
                    typescript: () => import('highlight.js/lib/languages/typescript'),
                    scss: () => import('highlight.js/lib/languages/scss'),
                },
                // themePath: 'path-to-theme.css'
                themePath: 'assets/styles/solarized-dark.css',

            },


        },
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

        TranslateStore, provideAnimationsAsync()
    ],
};
