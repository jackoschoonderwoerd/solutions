import { Injectable, inject } from '@angular/core';
import { delay, lastValueFrom, of, take } from "rxjs";
import { FirestoreService } from '../../../shared/firestore.service';
import { Item, Subject, Topic } from '../../../navigation/navigation.service';


@Injectable({
    providedIn: 'root'
})
export class SecondTryService {

    fsService = inject(FirestoreService)
    baseUrl = 'navigation';
    thirdTryDataMap = new Map<string, string[]>


    stringifiedMap: any;
    mappedSubjects: any;


    getSubjects() {

        this.fsService.collection(this.baseUrl).pipe(take(1))
            .subscribe((subjects: Subject[]) => {
                this.organizeSubjects(subjects)
            })

    }

    getRootlevelNodes() {
        const rootLevelNodes: string[] = []
        const promise = new Promise((resolve, reject) => {
            this.fsService.collection(this.baseUrl).subscribe((subjects: Subject[]) => {
                subjects.forEach((subject: Subject) => {
                    rootLevelNodes.push(subject.subjectName)
                })

            })
            resolve(rootLevelNodes)
        })
        return promise
    }

    getChildren(node: string) {
        return of(this.thirdTryDataMap.get(node)).pipe(delay(1000));
    }

    isExpandable(node: string) {

        return this.thirdTryDataMap.has(node);
    }

    organizeSubjects(subjects: Subject[]) {
        console.log('say hi')
        this.mappedSubjects = [];
        subjects.forEach((subject: Subject) => {
            const mappedSubject = []
            mappedSubject.push(subject.subjectName)
            if (subject.topicsArray && subject.topicsArray.length) {
                const topicsNames = []
                this.objectToArray(subject)
                subject.topicsArray.forEach((topic: Topic) => {
                    // console.log(topic)
                    const mappedTopic = []
                    topicsNames.push(topic.topicName)
                    // console.log(topicsNames)
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
        // console.log(this.mappedSubjects)
        // this.mappedSubjects.forEach(element => {
        //     console.log(element.length)
        //     // console.log(JSON.stringify(element))
        //     if (element.length = 1) {
        //         console.log(element, 'end of the line')
        //     } else {
        //         console.log(element)
        //     }
        // });

        this.thirdTryDataMap = new Map(this.mappedSubjects)
        // return this.mappedSubjects;
        return this.thirdTryDataMap
    }

    objectToArray(object: Object) {
        const keys: string[] = (Object.keys(object))
        keys.forEach((key: string) => {
            if (typeof (object[key]) != 'string') {
                // console.log(object[key])
            }
        })
    }
}
