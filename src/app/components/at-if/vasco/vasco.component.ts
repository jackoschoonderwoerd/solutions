import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HIGHLIGHT_OPTIONS, HighlightModule, HighlightOptions, HighlightResult } from 'ngx-highlightjs';
import { VascoService } from './vasco.service';
import { ShowCodeComponent } from '../../../shared/show-code/show-code.component';


@Component({
    selector: 'app-vasco',
    imports: [MatButtonModule, HighlightModule, ShowCodeComponent],
    templateUrl: './vasco.component.html',
    styleUrl: './vasco.component.scss',
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: <HighlightOptions>{
                lineNumbers: true,
            },
        },
    ]
})
export class VascoComponent implements OnInit {

    vascoService = inject(VascoService)
    response: HighlightResult;

    showHello: boolean = true;
    showGoodbye: boolean = true
    snippets: string[] = []


    ngOnInit(): void {
        this.snippets = this.vascoService.getSnippets()
    }

    toggleShowHello() {
        this.showHello = !this.showHello
    }
    toggleShowGoodbye() {
        this.showGoodbye = !this.showGoodbye
    }
}
