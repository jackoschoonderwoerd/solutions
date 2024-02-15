import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

// importing prismjs order is important!
import 'prismjs';

import 'prismjs/plugins/toolbar/prism-toolbar';

import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/show-language/prism-show-language';

import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-visual-basic';
import 'prismjs/components/prism-xml-doc';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Prism: any;

@Injectable({
    providedIn: 'root'
})
export class AtmanService {

    constructor(@Inject(PLATFORM_ID) private platformId: object) { }

    highlightAll() {
        if (isPlatformBrowser(this.platformId)) {
            Prism.highlightAll();
        }
    }

    highlightHtml(html: string): string {
        const div = document.createElement('div');
        div.innerHTML = html;
        const codeElements = div.querySelectorAll('code');
        codeElements.forEach((el) => {
            const lang =
                el.getAttribute('class')?.replace('language-', '') || 'javascript';
            el.innerHTML = Prism.highlight(
                el.textContent || '',
                Prism.languages[lang],
                lang
            );
        });
        return div.innerHTML;
    }
}
