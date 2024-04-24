import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

import { inject } from "@angular/core";
import { FirestoreService } from "../../../shared/firestore.service";




import { Consumption, Course, Exhibition } from '../types/models';
import { EngelbewaarderService } from "../services/engelbewaarder.service";
import { take } from "rxjs";


type EngelbewaarderState = {
    consumption: Consumption;
    consumptions: Consumption[];
    course: Course;
    courses: Course[];
    exhibitions: Exhibition[];

    consumptionLoading: boolean;
    coursesLoading: boolean;

    coursesVisible: boolean,
    courseDetailsVisible: boolean,
    consumptionsVisible: boolean,
    consumptionDetailsVisible: boolean,
    exhibitionsVisible: boolean,
    exhibitionsListVisible: boolean,
    exhibitionsAdminDetailVisible: boolean,
    imagesAdminVisible: boolean,

    storeComponentVisible: boolean;
    isAdmin: boolean;
    beer: Consumption[];
    exhibitionUC: Exhibition;


}

const initialState: EngelbewaarderState = {
    consumption: null,
    consumptions: [],
    course: null,
    courses: [],
    exhibitions: [],
    coursesLoading: false,
    consumptionLoading: false,
    coursesVisible: false,
    courseDetailsVisible: false,
    consumptionsVisible: false,
    consumptionDetailsVisible: false,

    exhibitionsVisible: true,
    exhibitionsAdminDetailVisible: false,
    exhibitionsListVisible: true,
    imagesAdminVisible: false,

    storeComponentVisible: false,
    isAdmin: false,
    beer: [],
    exhibitionUC: null,

}





export const EngelbewaarderStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withMethods(
        (store, fs = inject(FirestoreService), ebService = inject(EngelbewaarderService)) => ({
            async loadCourses() {

                patchState(store, { coursesLoading: true });
                const path = `engelbewaarder-consumptions`
                fs.collection(path).subscribe((courses: Course[]) => {
                    if (store.course()) {
                        console.log('no course')
                        //& UPDATE COURSE AND CONSUMPTIONS
                        const newCoursesArray: Course[] = courses.filter((course: Course) => {
                            return course.id === store.course().id
                        })
                        const newCourse: Course = newCoursesArray[0]
                        patchState(store, { course: newCourse })
                        patchState(store, { consumptions: newCourse.consumptions })
                    }
                    patchState(store, { courses })
                    patchState(store, { coursesLoading: false });

                })
            },
            async loadExhibitions() {
                const path = `engelbewaarder-exhibitions`;
                fs.collection(path).pipe(take(1)).subscribe((exhibitions: Exhibition[]) => {
                    console.log(exhibitions)

                    patchState(store, { exhibitions: exhibitions })
                })
            },

            courseSelected(course) {
                patchState(store, { course })
                patchState(store, { consumptions: course.consumptions })
            },
            clearCourse() {
                patchState(store, { course: null })
                patchState(store, { consumptions: null })
            },
            loadBeer() {
                const path = `engelbewaarder-consumptions/beer`
                fs.getDoc(path)
                    .subscribe(data => {
                        // console.log(data)
                        patchState(store, { beer: data.consumptions })
                    })
            },
            loadStarters() {

            },


            async consumptionSelected(selectedConsumption: Consumption) {

                if (selectedConsumption) {
                    patchState(store, { consumption: selectedConsumption })
                } else {
                    patchState(store, { consumption: null })
                }
            },
            changeAccess() {
                patchState(store, { isAdmin: !store.isAdmin() })
            },

            //& COMPONENT VISIBILITY
            toggleStoreComponentVisible() {
                return patchState(store, { storeComponentVisible: !store.storeComponentVisible() })
            },

            toggleCoursesVisible(status: boolean) {
                return patchState(store, { coursesVisible: status })
            },
            toggleCourseDetailsVisible(status: boolean) {
                return patchState(store, { courseDetailsVisible: status })
            },
            toggleConsumptionsVisible(status: boolean) {
                return patchState(store, { consumptionsVisible: status })
            },
            toggleConsumptionDetailsVisible(status: boolean) {
                return patchState(store, { consumptionDetailsVisible: status })
            },
            toggleExhibitionsVisible() {
                return patchState(store, { exhibitionsVisible: !store.exhibitionsVisible() })
            },
            toggleExhibitionsListVisible(status: boolean) {
                return patchState(store, { exhibitionsListVisible: status });
            },
            async initExhibitionUC(exhibition: Exhibition) {
                console.log(exhibition);
                return patchState(store, { exhibitionUC: exhibition })
            },
            async toggleImagesAdminVisible(status: boolean) {
                return patchState(store, { imagesAdminVisible: status })
            },
            async toggleExhibitionsAdminDetailVisible(status: boolean) {
                return patchState(store, { exhibitionsAdminDetailVisible: status })
            },

        })
    ),
);
