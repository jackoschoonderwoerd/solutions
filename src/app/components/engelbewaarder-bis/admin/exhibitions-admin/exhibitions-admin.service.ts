import { EventEmitter, Injectable, Output } from '@angular/core';
import { Exhibition } from '../../types/eb-models';


@Injectable({
    providedIn: 'root'
})
export class ExhibitionsAdminService {

    @Output() addingExhibition = new EventEmitter<void>;
    exhibitionSelected = new EventEmitter<Exhibition>;

    constructor() { }

    // exhibitionSelectedF(exhibition) {
    //     console.log(exhibition)
    //     this.exhibitionSelected.emit(exhibition)
    // }
}
