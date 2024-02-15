import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { JsUaService } from './js-ua.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-js-ua',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, MatButtonModule],
    templateUrl: './js-ua.component.html',
    styleUrl: './js-ua.component.scss'
})
export class JsUaComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {
    @ViewChild('textArea', { static: true })
    textArea!: ElementRef;

    @ViewChild('codeContent', { static: true })
    codeContent!: ElementRef;

    @ViewChild('pre', { static: true })
    pre!: ElementRef;

    sub!: Subscription;
    highlighted = false;
    codeType = 'javascript';

    form = this.fb.group({
        content: ''
    });

    get contentControl() {
        return this.form.get('content');
    }

    constructor(
        private jsUaService: JsUaService,
        private fb: FormBuilder,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        this.listenForm()
        this.synchronizeScroll();
    }

    ngAfterViewInit() {
        this.jsUaService.highlightAll();
    }

    ngAfterViewChecked() {
        if (this.highlighted) {
            this.jsUaService.highlightAll();
            this.highlighted = false;
        }
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

    private listenForm() {
        this.sub = this.form.valueChanges.subscribe((val) => {
            const modifiedContent = this.jsUaService.convertHtmlIntoString(val.content);

            this.renderer.setProperty(this.codeContent.nativeElement, 'innerHTML', modifiedContent);

            this.highlighted = true;
        });
    }

    private synchronizeScroll() {
        const localSub = fromEvent(this.textArea.nativeElement, 'scroll').subscribe(() => {
            const toTop = this.textArea.nativeElement.scrollTop;
            const toLeft = this.textArea.nativeElement.scrollLeft;

            this.renderer.setProperty(this.pre.nativeElement, 'scrollTop', toTop);
            this.renderer.setProperty(this.pre.nativeElement, 'scrollLeft', toLeft + 0.2);
        });

        this.sub.add(localSub);
    }
    onSaveCode() {
        const codeContentValue = this.form.get('content').value;
        const languageClass = `language-${this.codeType}`
        const snippetData: SnippetData = {
            languageClass,
            codeContentValue
        }
    }
    onInsertContent() {

    }

}

export interface SnippetData {
    languageClass: string;
    codeContentValue: string;
}
