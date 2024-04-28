import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { FirestoreService } from "../../../../shared/firestore.service";
import { Exhibition } from "../../types/models";
import { take } from "rxjs";


type ExhibitionsAdminState = {

    exhibitions: Exhibition[];
    showExhibitions: boolean,
    showExhibitionsAdminDetail: boolean,
    showExhibitionsList: boolean,
    showImagesAdmin: boolean,
    showImageAdminDetail: boolean,
    showDescriptionEditor: boolean,
    exhibitionUC: Exhibition;
}

const initialState: ExhibitionsAdminState = {

    exhibitions: [],
    showExhibitions: true,
    showExhibitionsAdminDetail: false,
    showExhibitionsList: true,
    showImagesAdmin: false,
    showImageAdminDetail: false,
    showDescriptionEditor: false,
    exhibitionUC: null,
}

export const ExhibitionsAdminStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withMethods(
        (store, fs = inject(FirestoreService)) => ({

            async loadExhibitions() {
                const path = `engelbewaarder-exhibitions`;
                // fs.collection(path).subscribe((exhibitions: Exhibition[]) => {
                //     console.log(exhibitions)
                //     patchState(store, { exhibitions: exhibitions })
                // })


                fs.sortedCollection(path, 'startDate', 'asc').pipe(take(1)).subscribe((exhibitions: Exhibition[]) => {
                    console.log(exhibitions)
                    var sortedExhibitions = exhibitions.sort((a: Exhibition, b: Exhibition) =>
                        b.startDate['seconds'] * 1000 + a.startDate['seconds'] * 1000
                    )
                    // sortedExhibitions.forEach((ex: Exhibition) => {
                    //     if (ex.startDate) {
                    //         console.log(ex.startDate['seconds'] * 1000)
                    //         console.log(new Date(ex.startDate['seconds'] * 1000))
                    //     }
                    // })
                    patchState(store, { exhibitions: sortedExhibitions })

                })
            },
            initExhibitionUC(exhibition: Exhibition) {
                return patchState(store, { exhibitionUC: exhibition })
            },

            //& COMPONENT VISIBILITY

            editNothing() {
                return patchState(store, {
                    showExhibitions: true,
                    showExhibitionsAdminDetail: false,
                    showDescriptionEditor: false,
                    showImagesAdmin: false
                })
            },
            async editDetail() {
                return patchState(store, {
                    showExhibitions: false,
                    showExhibitionsList: false,
                    showExhibitionsAdminDetail: true,
                    showDescriptionEditor: false,
                    showImagesAdmin: false
                })
            },
            editDescription() {
                return patchState(store, {
                    showExhibitions: false,
                    showExhibitionsAdminDetail: false,
                    showDescriptionEditor: true,
                    showImagesAdmin: false
                })
            },
            editImages() {
                return patchState(store, {
                    showExhibitions: false,
                    showExhibitionsAdminDetail: false,
                    showDescriptionEditor: false,
                    showImagesAdmin: true
                })
            },
            editImage() {
                return patchState(store, {
                    showExhibitions: false,
                    showExhibitionsAdminDetail: false,
                    showDescriptionEditor: false,
                    showImagesAdmin: true,
                    showImageAdminDetail: true
                })
            },


            toggleExhibitionsVisible() {
                return patchState(store, { showExhibitions: !store.showExhibitions() })
            },
            toggleExhibitionsListVisible(status: boolean) {
                return patchState(store, { showExhibitionsList: status });
            },
            toggleDescriptionEditorVisible(status: boolean) {
                return patchState(store, { showDescriptionEditor: status })
            },

            async toggleImagesAdminVisible(status: boolean) {
                return patchState(store, { showImagesAdmin: status })
            },
            async toggleExhibitionsAdminDetailVisible(status: boolean) {
                return patchState(store, { showExhibitionsAdminDetail: status })
            },

        })
    ),
);

