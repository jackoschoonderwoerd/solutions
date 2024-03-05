import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as LR from '@uploadcare/blocks';

LR.registerBlocks(LR);

declare var uploadcare: any



@Component({
    selector: 'app-monsterlessons',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './monsterlessons.component.html',
    styleUrl: './monsterlessons.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonsterlessonsComponent implements OnInit {
    @ViewChild('ctxProvider', { static: true }) ctxProvider: ElementRef<
        typeof LR.UploadCtxProvider.prototype
    >;



    uploadedFiles: LR.OutputFileEntry[] = [];


    ngOnInit(): void {
        this.ctxProvider.nativeElement.addEventListener(
            'data-output',
            this.handleUploadEvent
        );
        this.ctxProvider.nativeElement.addEventListener(
            'done-flow',
            this.handleDoneFlow
        );
    }

    handleUploadEvent = (e: Event) => {
        if (!(e instanceof CustomEvent)) {
            return;
        }

        if (e.detail) {
            console.log(e.detail)
            this.uploadedFiles = e.detail as LR.OutputFileEntry[];
        }
    };

    handleDoneFlow = () => {
        console.log('handleDoneFlow');
    };
}

