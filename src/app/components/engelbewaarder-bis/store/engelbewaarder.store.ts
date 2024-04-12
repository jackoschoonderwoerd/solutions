import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

import { inject } from "@angular/core";
import { FirestoreService } from "../../../shared/firestore.service";


import { Consumption } from "../models";

import { Course } from "../types/models";


type EngelbewaarderState = {
    consumption: Consumption;
    consumptions: Consumption[];
    course: Course;
    courses: Course[]

    consumptionLoading: boolean;
    typesLoading: boolean;

    consumptionDetailsVisible: boolean,
    consumptionsVisible: boolean,
    courseDetailsVisible: boolean,
    coursesVisible: boolean,

    storeComponentVisible: boolean;
    res: any;
}

const initialState: EngelbewaarderState = {
    consumption: null,
    consumptions: [],
    course: null,
    courses: [],

    typesLoading: false,
    consumptionLoading: false,

    consumptionDetailsVisible: false,
    consumptionsVisible: false,
    courseDetailsVisible: false,
    coursesVisible: true,
    storeComponentVisible: true,
    res: null
}





export const EngelbewaarderStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withMethods(
        (store, fs = inject(FirestoreService)) => ({
            async loadCourses() {
                patchState(store, { typesLoading: true });
                const path = `engelbewaarder-consumptions`
                fs.collection(path).subscribe((courses: Course[]) => {
                    console.log(courses)
                    patchState(store, { courses })
                    patchState(store, { typesLoading: false });
                })

            },
            courseSelected(course) {
                patchState(store, { course })
                patchState(store, { consumptions: course.consumptions })
            },
            async updateCourse(course) {
                console.log(`updating`, course)
                patchState(store, { course })
                patchState(store, { consumptions: course.consumptions })
            },
            async consumptionSelected(consumption: Consumption) {
                console.log(consumption)
                if (consumption) {
                    patchState(store, { consumption: consumption })
                } else {
                    patchState(store, { consumption: null })
                }
            },
            toggleStoreComponentVisible() {
                return patchState(store, { storeComponentVisible: !store.storeComponentVisible() })
            },

            toggleCoursesVisible(status: boolean) {
                return patchState(store, { coursesVisible: status })
            },
            async toggleCourseDetailsVisible(status: boolean) {
                return patchState(store, { courseDetailsVisible: status })
            },
            async toggleConsumptionsVisible(status: boolean) {
                return patchState(store, { consumptionsVisible: status })
            },
            async toggleConsumptionDetailsVisible(status: boolean) {
                return patchState(store, { consumptionDetailsVisible: status })
            },
            updateStore() {

            }
        })
    ),
);
