import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe, JsonPipe, NgFor } from '@angular/common';
import { FirestoreService } from '../../../../shared/firestore.service';
import { Artist, Exhibition } from '../../types/models';
import { FirebaseError } from '@angular/fire/app';
import { DocumentReference } from '@angular/fire/firestore';
import { StorageService } from '../../../../shared/storage.service';
import { EngelbewaarderStore } from '../../store/engelbewaarder.store';
import { MatExpansionModule } from '@angular/material/expansion';
import { take } from 'rxjs';
import { ImagesAdminComponent } from './images-admin/images-admin.component';
import { ExhibitionsAdminDetailsComponent } from './exhibitions-admin-details/exhibitions-admin-details.component';
import { EngelbewaarderService } from '../../services/engelbewaarder.service';

@Component({
    selector: 'app-exhibitions-admin',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatLabel,
        MatDatepickerModule,
        NgFor,
        JsonPipe,
        MatExpansionModule,
        DatePipe,
        ImagesAdminComponent,
        ExhibitionsAdminDetailsComponent
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './exhibitions-admin.component.html',
    styleUrl: './exhibitions-admin.component.scss'
})
export class ExhibitionsAdminComponent implements OnInit {
    fb = inject(FormBuilder);
    fs = inject(FirestoreService);
    store = inject(EngelbewaarderStore);
    ebService = inject(EngelbewaarderService)
    form: FormGroup;
    editmode: boolean = false;
    imageFiles: File[] = [];
    urls: File[] = [];
    storage = inject(StorageService);
    downloadUrls: string[] = [];
    exhibitionId: string;
    exhibitionUC: Exhibition;


    ngOnInit(): void {
        // this.initForm();
        this.store.loadExhibitions();


    }



    onDeleteExhibition(event: MouseEvent, exhibitionId: string) {
        event.stopPropagation();
    }
    onEditExhibition(event: MouseEvent, exhibitionId: string) {
        this.store.toggleExhibitionsListVisible(false);
        event.stopPropagation()
        const path = `engelbewaarder-exhibitions/${exhibitionId}`
        this.fs.getDoc(path).pipe(take(1)).subscribe((exhibition: Exhibition) => {
            if (exhibition) {
                this.store.initExhibitionUC(exhibition)
                this.store.toggleExhibitionsAdminDetailVisible(true)
                    .then(() => {
                        this.store.toggleImagesAdminVisible(true)
                            .then((res) => {
                                console.log(res)
                                setTimeout(() => {
                                    this.ebService.exhibitionChanged.emit(exhibition);
                                }, 0);
                            })

                    })
            }
        })

    }
    onAddExhibition() {
        this.store.toggleExhibitionsListVisible(false);
        this.store.toggleExhibitionsAdminDetailVisible(true);
        this.ebService.exhibitionChanged.emit(null);
        this.store.toggleImagesAdminVisible(false);
    }
}
