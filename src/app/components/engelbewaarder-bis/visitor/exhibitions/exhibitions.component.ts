import { Component, inject, OnInit } from '@angular/core';
import { VisitorStore } from '../../stores/visitor.store';
import { JsonPipe } from '@angular/common';
import { ExhibitionComponent } from './exhibition/exhibition.component';
import { Language } from '../../../ngx-translate/hano/navbar/navbar.component';

@Component({
    selector: 'app-exhibitions',
    standalone: true,
    imports: [
        JsonPipe,
        ExhibitionComponent
    ],
    templateUrl: './exhibitions.component.html',
    styleUrl: './exhibitions.component.scss'
})
export class ExhibitionsComponent implements OnInit {
    viStore = inject(VisitorStore)

    ngOnInit(): void {
        const languageAbbr = this.viStore.selectedLanguage();
        this.viStore.loadExhibitions()
    }
}
