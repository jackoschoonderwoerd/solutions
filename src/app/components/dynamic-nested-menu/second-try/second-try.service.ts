import { Injectable, inject } from '@angular/core';
import { delay, lastValueFrom, of } from "rxjs";
import { FirestoreService } from '../../../shared/firestore.service';
import { Item, Subject, Topic } from '../../../navigation/navigation.service';


@Injectable({
    providedIn: 'root'
})
export class SecondTryService {

    fsService = inject(FirestoreService)
    baseUrl = 'navigation';
    secondTryDataMap = new Map<string, string[]>
    thirdTryDataMap = new Map<string, string[]>


    dataMap = new Map<string, string[]>([
        ["Fruits", ["Apple", "Orange", "Banana"]],
        ["Vegetables", ["Tomato", "Potato", "Onion"]],
        ["Apple", ["Fuji", "Macintosh"]],
        ["Onion", ["Yellow", "White", "Purple"]],
        ["Macintosh", ["Yellow", "White", "Purple"]],
    ]);
    stringifiedMap: any;
    mappedSubjects: any;

    // rootLevelNodes: string[] = ["Fruits", "Vegetables"];
    rootLevelNodes: string[] = ["firebase", "4", "subject-without-topics"]

    getSubjects(node: string): Promise<unknown> {

        const promise = new Promise((resolve, reject) => {

            this.fsService.collection(this.baseUrl)
                .subscribe((subjects: Subject[]) => {

                    resolve(this.organizeSubjectsAgain(subjects))
                })
        })
        return promise
    }

    getChildren(node: string) {

        return of(this.thirdTryDataMap.get(node)).pipe(delay(1000));
    }

    isExpandable(node: string): boolean {


        return this.thirdTryDataMap.has(node);
    }

    organizeSubjectsAgain(subjects: Subject[]) {
        // console.log(subjects);
        this.mappedSubjects = [];
        subjects.forEach((subject: Subject) => {
            const mappedSubject = []
            mappedSubject.push(subject.subjectName)
            if (subject.topicsArray && subject.topicsArray.length) {
                // console.log(subject.topicsArray.length)
                const topicsNames = []
                subject.topicsArray.forEach((topic: Topic) => {
                    console.log(topic)
                    const mappedTopic = []
                    topicsNames.push(topic.topicName)
                    console.log(topicsNames)
                    mappedTopic.push(topic.topicName)
                    if (topic.itemsArray && topic.itemsArray.length) {
                        const itemNames: string[] = []
                        topic.itemsArray.forEach((item: Item) => {
                            // console.log(item)
                            itemNames.push(item.itemName)
                        })
                        mappedTopic.push(itemNames)
                    }
                    this.mappedSubjects.push(mappedTopic)
                })
                mappedSubject.push(topicsNames)
            }
            this.mappedSubjects.push(mappedSubject)
        })
        console.log(this.mappedSubjects)

        this.thirdTryDataMap = new Map(this.mappedSubjects)

        return this.mappedSubjects
    }

    // organizeSubjects(subjects: Subject[]) {
    //     const skimmedSubjectsArray = []
    //     subjects.forEach((subject: Subject) => {
    //         const skimmedSubjectArray: any = []
    //         skimmedSubjectArray.push(subject.subjectName)
    //         if (subject.topicsArray) {
    //             const skimmedTopicsArray: any = []
    //             subject.topicsArray.forEach((topic: Topic) => {
    //                 skimmedTopicsArray.push(topic.topicName)
    //                 if (topic.itemsArray) {
    //                     const skimmedItemsArray: string[] = [];
    //                     topic.itemsArray.forEach((item: Item) => {
    //                         skimmedItemsArray.push(item.itemName)
    //                     })
    //                     if (skimmedItemsArray.length) {
    //                         skimmedTopicsArray.push(skimmedItemsArray)
    //                     }
    //                 }
    //             })
    //             if (skimmedTopicsArray.length) {
    //                 skimmedSubjectArray.push(skimmedTopicsArray)
    //             }
    //         }
    //         skimmedSubjectsArray.push(skimmedSubjectArray)
    //     })
    //     const newMap = new Map<string, string[]>(skimmedSubjectsArray)
    //     this.stringifiedMap = JSON.stringify(Array.from(newMap.entries()))
    //     return newMap
    // }

    getStringifiedOriginalDataMap() {
        return JSON.stringify(Array.from(this.dataMap.entries()))
    }

}
