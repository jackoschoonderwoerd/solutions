import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

import { inject } from "@angular/core";
import { FirestoreService } from "../../../shared/firestore.service";




import { Consumption, Course } from "../types/models";


type EngelbewaarderState = {
    consumption: Consumption;
    consumptions: Consumption[];
    course: Course;
    courses: Course[]

    consumptionLoading: boolean;
    coursesLoading: boolean;

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

    coursesLoading: false,
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

            courseSelected(course) {
                patchState(store, { course })
                patchState(store, { consumptions: course.consumptions })
            },
            clearCourse() {
                patchState(store, { course: null })
                patchState(store, { consumptions: null })
            },

            async consumptionSelected(selectedConsumption: Consumption) {

                if (selectedConsumption) {
                    patchState(store, { consumption: selectedConsumption })
                } else {
                    patchState(store, { consumption: null })
                }
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
        })
    ),
);
