import { Component, OnInit, inject } from '@angular/core';
import { JackoService } from './jacko.service';
import { HighlightModule, HighlightResult } from 'ngx-highlightjs';
import { MatButtonModule } from '@angular/material/button';
import { HighlightLoader } from 'ngx-highlightjs';

@Component({
    selector: 'app-jacko',
    standalone: true,
    imports: [MatButtonModule, HighlightModule],
    templateUrl: './jacko.component.html',
    styleUrl: './jacko.component.scss'
})
export class JackoComponent implements OnInit {

    constructor(private hljsLoader: HighlightLoader) {
    }

    response: HighlightResult;
    jackoService = inject(JackoService)
    snippets: string[] = []
    ngOnInit(): void {
        this.snippets = this.jackoService.getSnippets()
    }
}
