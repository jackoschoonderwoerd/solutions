import { AfterViewChecked, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { AtmanService } from './atman.service';



@Component({
    selector: 'app-atman',
    imports: [CommonModule, SharedModule],
    templateUrl: './atman.component.html',
    styleUrl: './atman.component.scss'
})
export class AtmanComponent implements OnInit, AfterViewChecked {
    name = 'Angular';

    highlighted = false;

    code = `
        <p>Here's how you can customize the appearance of an Angular Material toggle button. Although the method is unique, I'll explain it in this article.</p>\n
        <h2>1. How to use Angular Material button-toggle</h2>\n
        <h3>Install Angular Material</h3>\n
        <pre><code class=\"language-bash\">
            ng add @angular/material\n
        </code></pre>\n
        <h3>Import Angular Material button-toggle to Module file</h3>\n
        <pre><code class=\"language-ts\">
            import {MatButtonToggleModule} from '@angular/material/button-toggle'\n
        </code></pre>\n
        <h3>Html</h3>\n
        <pre><code class=\"language-html\">
            &lt;mat-button-toggle [aria-label]=&quot;alertsEnabled ? 'Disable alerts' : 'Enable alerts'&quot;&gt;\n
              &lt;mat-icon&gt;notifications&lt;/mat-icon&gt;\n
              &lt;/mat-button-toggle&gt;\n
        </code></pre>\n
        <p>For more details, refer to the official documentation:<br>\n
        <a href=\"https://material.angular.io/components/button-toggle\">Angular Material Official Documentation</a></p>
        `;

    constructor(private readonly atmanService: AtmanService) { }

    ngOnInit() {
        // this.code = HtmlUtils.addClassToHtml(this.code, 'line-numbers', 'pre');
        this.code = this.code;
    }

    ngAfterViewChecked() {
        if (!this.highlighted && this.code) {
            this.atmanService.highlightAll();
            this.highlighted = true;
        }
    }
}
