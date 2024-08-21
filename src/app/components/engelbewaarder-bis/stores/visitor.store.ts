import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

import { effect, inject } from "@angular/core";
import { FirestoreService } from "../../../shared/firestore.service";
import { EbConsumption, Course, Exhibition } from '../types/eb-models';
import { EngelbewaarderService } from "../services/engelbewaarder.service";
import { take, pipe } from 'rxjs';
import { collection } from '@angular/fire/firestore';





type VisitorState = {

    selectedLanguage: string;

    beersByLanguage: EbConsumption[],

    desertsByLanguage: EbConsumption[],
    fishConsumptionsByLanguage: EbConsumption[],
    meatConsumptionsByLanguage: EbConsumption[],
    sideDishesConsumptionsByLanguage: EbConsumption[],
    starterConsumptionsByLanguage: EbConsumption[]
    vegetarianConsumptionsByLanguage: EbConsumption[],

    meatCourseByLanguage: Course;
    fishCourseByLanguage: Course;

    snacksFormOmaBobsByLanguage: EbConsumption[],
    snacksSweetByLanguage: EbConsumption[],
    snacksSavoryByLanguage: EbConsumption[],
    exhibitions: Exhibition[];
    exhibitionsByLanguage: Exhibition[];
    exhibitionByLanguage: Exhibition;
    selectedExhibition: Exhibition
}

const initialState: VisitorState = {

    selectedLanguage: 'nl',

    beersByLanguage: [],

    desertsByLanguage: [],
    fishConsumptionsByLanguage: [],
    meatConsumptionsByLanguage: [],
    sideDishesConsumptionsByLanguage: [],
    starterConsumptionsByLanguage: [],
    vegetarianConsumptionsByLanguage: [],

    meatCourseByLanguage: null,
    fishCourseByLanguage: null,

    snacksFormOmaBobsByLanguage: [],
    snacksSweetByLanguage: [],
    snacksSavoryByLanguage: [],
    exhibitions: [],
    exhibitionsByLanguage: [],
    exhibitionByLanguage: null,
    selectedExhibition: null
}





export const VisitorStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withState(initialState),

    withMethods(
        (store, fs = inject(FirestoreService)) => ({

            checkLS() {
                console.log('checkingLS')
            },
            languageSelected(language: string) {
                console.log(language)
                this.loadDesertsByLanguage();
                this.loadFishDishesByLanguage();
                this.loadBeersByLanguage();
                this.loadMeatDishesByLanguage();
                this.loadSideDishesConsumptionsByLanguage();
                this.loadStarterDishesByLanguage();
                this.loadVegetarianDishesByLanguage();

                this.loadSavorySnacksByLanguage();
                this.loadSnacksFormOmaBobsByLanguage();

                this.loadMeatCourseByLanguage();
                this.loadFishCourseByLanguage();

                this.loadExhibitions();
                this.loadExhibitionByLanguage();
                patchState(store, { selectedLanguage: language })
            },

            loadExhibitions() {

                const path = `engelbewaarder-exhibitions`;

                fs.collection(path)
                    .pipe(take(1))
                    .subscribe((exhibitions: Exhibition[]) => {
                        if (store.selectedLanguage() === 'nl') {
                            exhibitions.forEach((exhibition: Exhibition) => {
                                console.log(exhibition.id)
                                exhibition.descriptionSelectedLanguage = exhibition.descriptionDutch;
                            })
                            patchState(store, { exhibitions })
                        } else if (store.selectedLanguage() === 'en') {
                            exhibitions.forEach((exhibition: Exhibition) => {
                                console.log(exhibition.id)
                                exhibition.descriptionSelectedLanguage = exhibition.descriptionEnglish;
                            })
                            patchState(store, { exhibitions })
                        } else {
                            alert('no selected language')
                        }

                    })
            },

            loadExhibitionByLanguage(exhibition: Exhibition) {
                console.log('loading ex')
                if (store.selectedLanguage() === 'nl') {
                    exhibition.descriptionSelectedLanguage = exhibition.descriptionDutch;
                    patchState(store, { exhibitionByLanguage: exhibition })
                } else if (store.selectedLanguage() === 'en') {
                    exhibition.descriptionSelectedLanguage = exhibition.descriptionEnglish;
                    patchState(store, { exhibitionByLanguage: exhibition })
                }
                patchState(store, { exhibitionByLanguage: exhibition })
            },



            loadBeersByLanguage() {
                if (!store.beersByLanguage().length) {
                    patchState(store, { beersByLanguage: this.sortConsumptionsByLanguage('bier') })
                } else {
                    store.beersByLanguage().forEach((ebConsumption: EbConsumption) => {
                        this.switchName(ebConsumption)
                    })
                }
            },

            loadStarterDishesByLanguage() {
                if (!store.starterConsumptionsByLanguage().length) {
                    patchState(store, { starterConsumptionsByLanguage: this.sortConsumptionsByLanguage('voorgerechten') })
                } else {
                    store.starterConsumptionsByLanguage().forEach((ebConsumption: EbConsumption) => {
                        this.switchName(ebConsumption)
                    })
                }
            },

            loadDesertsByLanguage() {
                if (!store.desertsByLanguage().length) {
                    patchState(store, { desertsByLanguage: this.sortConsumptionsByLanguage('nagerechten') })
                } else {
                    store.desertsByLanguage().forEach((ebConsumption: EbConsumption) => {
                        this.switchName(ebConsumption)
                    })
                }
            },

            loadFishDishesByLanguage() {
                if (!store.fishConsumptionsByLanguage().length) {
                    patchState(store, { fishConsumptionsByLanguage: this.sortConsumptionsByLanguage('visgerechten') })
                } else {
                    store.fishConsumptionsByLanguage().forEach((ebConsumption: EbConsumption) => {
                        this.switchName(ebConsumption)
                    })
                }
            },

            loadMeatDishesByLanguage() {
                if (!store.meatConsumptionsByLanguage().length) {

                    patchState(store, { meatConsumptionsByLanguage: this.sortConsumptionsByLanguage('vleesgerechten') })
                } else {
                    store.meatConsumptionsByLanguage().forEach((ebConsumption: EbConsumption) => {
                        this.switchName(ebConsumption)
                    })
                }
            },

            loadSideDishesConsumptionsByLanguage() {
                if (!store.sideDishesConsumptionsByLanguage().length) {
                    patchState(store,
                        {
                            sideDishesConsumptionsByLanguage: this.sortConsumptionsByLanguage('bijgerechten')
                        }
                    )
                } else {
                    store.sideDishesConsumptionsByLanguage().forEach((ebConsumption: EbConsumption) => {
                        this.switchName(ebConsumption)
                    })
                }
            },

            loadVegetarianDishesByLanguage() {
                if (!store.vegetarianConsumptionsByLanguage().length) {
                    patchState(store, { vegetarianConsumptionsByLanguage: this.sortConsumptionsByLanguage('vegetarisch') })
                } else {
                    store.vegetarianConsumptionsByLanguage().forEach((ebConsumption: EbConsumption) => {
                        this.switchName(ebConsumption)
                    })
                }
            },

            loadSavorySnacksByLanguage() {
                if (!store.snacksSavoryByLanguage().length) {
                    patchState(store, { snacksSavoryByLanguage: this.sortConsumptionsByLanguage('snacks hartig') })
                } else {
                    store.snacksSavoryByLanguage().forEach((ebConsumption: EbConsumption) => {
                        this.switchName(ebConsumption)
                    })
                }
            },
            loadSweetSnacksByLanguage() {
                if (!store.snacksSweetByLanguage().length) {
                    patchState(store, { snacksSweetByLanguage: this.sortConsumptionsByLanguage('snacks zoet') })
                } else {
                    store.snacksSweetByLanguage().forEach((ebConsumption: EbConsumption) => {
                        this.switchName(ebConsumption)
                    })
                }
            },
            loadSnacksFormOmaBobsByLanguage() {
                if (!store.snacksFormOmaBobsByLanguage().length) {
                    patchState(store, { snacksFormOmaBobsByLanguage: this.sortConsumptionsByLanguage('snacks van oma bobs') })
                } else {
                    store.snacksFormOmaBobsByLanguage().forEach((ebConsumption: EbConsumption) => {
                        this.switchName(ebConsumption)
                    })
                }
            },



            sortConsumptionsByLanguage(courseName: string) {
                const consumptionsByLanguage: EbConsumption[] = [];
                fs.findCollectionArray(`engelbewaarder-courses`, 'nameDutch', courseName)
                    .pipe(take(1))
                    .subscribe((courseArray: Course[]) => {
                        console.log(courseArray, courseName)
                        if (courseArray.length && courseArray[0].consumptions) {
                            const consumptions: EbConsumption[] = courseArray[0].consumptions
                            consumptions.forEach((consumption: EbConsumption) => {
                                if (store.selectedLanguage() === 'en') {
                                    const ebConsumption: EbConsumption = {
                                        ...consumption,
                                        nameSelectedLanguage: consumption.nameEnglish,
                                        descriptionSelectedLanguage: consumption.descriptionEnglish
                                    }
                                    consumptionsByLanguage.push(ebConsumption)
                                } else if (store.selectedLanguage() === 'nl') {
                                    const ebConsumption: EbConsumption = {
                                        ...consumption,
                                        nameSelectedLanguage: consumption.nameDutch,
                                        descriptionSelectedLanguage: consumption.descriptionDutch
                                    }
                                    consumptionsByLanguage.push(ebConsumption)
                                }
                            })
                        }
                    })
                return consumptionsByLanguage
            },

            loadMeatCourseByLanguage() {
                fs.findDoc('engelbewaarder-courses', 'nameDutch', 'vleesgerechten')
                    .pipe(take(1))
                    .subscribe((courseArray: Course[]) => {
                        const course = courseArray[0]
                        console.log(courseArray[0]);
                        if (store.selectedLanguage() === 'nl') {
                            course.nameSelectedLanguage = course.nameDutch;

                        } else if (store.selectedLanguage() === 'en') {
                            course.nameSelectedLanguage = course.nameEnglish
                        }
                        course.consumptions.forEach((consumption: EbConsumption) => {
                            this.switchName(consumption)
                        })
                        patchState(store, { meatCourseByLanguage: course })

                    })
            },

            loadFishCourseByLanguage() {
                fs.findDoc('engelbewaarder-courses', 'nameDutch', 'visgerechten')
                    .pipe(take(1))
                    .subscribe((courseArray: Course[]) => {
                        const course = courseArray[0]
                        console.log(courseArray[0]);
                        if (store.selectedLanguage() === 'nl') {
                            course.nameSelectedLanguage = course.nameDutch;

                        } else if (store.selectedLanguage() === 'en') {
                            course.nameSelectedLanguage = course.nameEnglish
                        }
                        course.consumptions.forEach((consumption: EbConsumption) => {
                            this.switchName(consumption)
                        })
                        patchState(store, { fishCourseByLanguage: course })

                    })
            },


            switchName(ebConsumption: EbConsumption) {
                if (store.selectedLanguage() === 'en') {
                    ebConsumption.nameSelectedLanguage = ebConsumption.nameEnglish
                    ebConsumption.descriptionSelectedLanguage = ebConsumption.descriptionEnglish
                } else if (store.selectedLanguage() === 'nl') {
                    ebConsumption.nameSelectedLanguage = ebConsumption.nameDutch;
                    ebConsumption.descriptionSelectedLanguage = ebConsumption.descriptionDutch
                }
            },
            switchCourseName(course: Course) {
                if (store.selectedLanguage() === 'nl') {
                    course.nameSelectedLanguage = course.nameDutch;
                } else if (store.selectedLanguage() === 'en') {
                    course.nameSelectedLanguage = course.nameEnglish;
                }
            }

        })
    ),
);
