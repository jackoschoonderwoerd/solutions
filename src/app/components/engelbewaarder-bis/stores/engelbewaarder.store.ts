import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

import { inject } from "@angular/core";
import { FirestoreService } from "../../../shared/firestore.service";
import { EbConsumption, Course, Exhibition } from '../types/eb-models';
import { EngelbewaarderService } from "../services/engelbewaarder.service";
import { take } from "rxjs";
import { setPersistence } from "@angular/fire/auth";




type EngelbewaarderState = {
    consumption: EbConsumption;
    consumptions: EbConsumption[];
    course: Course;
    courses: Course[];
    exhibitions: Exhibition[];
    consumptionLoading: boolean;
    coursesLoading: boolean;
    coursesVisible: boolean,
    courseDetailsVisible: boolean,
    consumptionsVisible: boolean,
    consumptionDetailsVisible: boolean,
    storeComponentVisible: boolean;
    isAdmin: boolean;
    beer: EbConsumption[];
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
    storeComponentVisible: false,
    isAdmin: false,
    beer: [],
    exhibitionUC: null,
}





export const EngelbewaarderStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withState(initialState),

    withMethods(
        (store, fs = inject(FirestoreService), ebService = inject(EngelbewaarderService)) => ({
            async loadCourses() {

                patchState(store, { coursesLoading: true });
                const path = `engelbewaarder-courses`
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
                    const sortedCourses = courses.sort((a: Course, b: Course) => a.nameDutch > b.nameDutch ? 1 : -1)
                    patchState(store, { courses: sortedCourses })
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





            async consumptionSelected(selectedConsumption: EbConsumption) {

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

            // toggleCoursesVisible(status: boolean) {
            //     return patchState(store, { coursesVisible: status })
            // },
            toggleCoursesVisible() {
                return patchState(store, { coursesVisible: !store.coursesVisible() })
            },
            toggleCourseDetailsVisible(status: boolean) {
                return patchState(store, { courseDetailsVisible: status })
            },
            toggleConsumptionsVisible(status: boolean) {
                return patchState(store, { consumptionsVisible: status })
            },
            toggleConsumptionDetailsVisible(status: boolean) {
                return patchState(store, { consumptionDetailsVisible: status })
            }

        })
    ),
);
