import { Component, inject, Input } from '@angular/core';
import { ExhibitionDescriptionComponent } from './exhibition-description/exhibition-description.component';
import { ImagesAdminComponent } from './images-admin/images-admin.component';
import { ExhibitionsAdminDetailsComponent } from './exhibitions-admin-details/exhibitions-admin-details.component';
import { Exhibition } from '../../../types/models';
import { ExhibitionsAdminStore } from '../exhibitions-admin.store';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-exhibition-admin',
    standalone: true,
    imports: [
        ExhibitionDescriptionComponent,
        ImagesAdminComponent,
        ExhibitionsAdminDetailsComponent,
        MatButtonModule
    ],
    templateUrl: './exhibition-admin.component.html',
    styleUrl: './exhibition-admin.component.scss'
})
export class ExhibitionAdminComponent {
    @Input() exhibitionSelectedForEdit: Exhibition;
    exStore = inject(ExhibitionsAdminStore)

    onEditDetails() {
        this.exStore.editDetail();
    }
    onEditDescription() {
        this.exStore.editDescription();
    }
    onEditImages() {
        this.exStore.editImages();
    }
    resetExhibitionSelectedForEditToNull() {
        console.log('say hi')
        this.exhibitionSelectedForEdit = null;
    }
}
