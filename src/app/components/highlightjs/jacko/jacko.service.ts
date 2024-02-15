import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JackoService {

    constructor() { }

    snippets = [
        `export const appConfig: ApplicationConfig = {
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
                    coreLibraryLoader: () => import('highlight.js/lib/core'),
                    languages: {
                        xml: () => import('highlight.js/lib/languages/xml'),
                        typescript: () => import('highlight.js/lib/languages/typescript'),
                        scss: () => import('highlight.js/lib/languages/scss'),
                    },
                    themePath: 'path-to-theme.css'
                }
            }
        ],
    };`
        ,
        `import { Component, OnInit, inject } from '@angular/core';
import { JackoService } from './jacko.service';
import { HighlightModule, HighlightResult } from 'ngx-highlightjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-jacko',
    standalone: true,
    imports: [MatButtonModule, HighlightModule],
    templateUrl: './jacko.component.html',
    styleUrl: './jacko.component.scss'
})
export class JackoComponent implements OnInit {

    response: HighlightResult;
    jackoService = inject(JackoService)
    snippets: string[] = []
    ngOnInit(): void {
        this.snippets = this.jackoService.getSnippets()
    }
}`,
        `@for(snippet of snippets;track snippet) {
        <pre><code>{{snippet}}</code></pre>
    }`
        ,
    ]
    getSnippets() {
        return this.snippets;
    }

}
