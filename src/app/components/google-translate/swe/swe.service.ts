import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SweService {

    constructor() { }

    snippets = signal([

        `
    IN INDEX.HTML:

    <div class=""
        id="google_translate_element"></div>
    <div class="notranslate">This text will not translate</div>
    <div class="">The cow jumped over the moon</div>

    <app-root></app-root>



    <span>
        <script type="text/javascript">
            //<![CDATA[
            function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                    pageLanguage: 'de',
                    includedLanguages: 'en,it,fr,ru,tr',
                    autoDisplay: false,
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
            }
            //]]>

        </script>
        <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    </span>
    `
    ])
}
