import { Injectable, inject, OnInit } from '@angular/core';
import { FirestoreService } from '../../../shared/firestore.service';
import { Item, Subject, Topic } from '../../../navigation/navigation.service';
import { delay, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JackoService {

    fsService = inject(FirestoreService)
    constructor() { }

    subjects: Subject[]

    dataMap = new Map<string, string[]>

    getSubjects() {
        const promise = new Promise((resolve, reject) => {
            const pathToSubjects = `navigation`
            this.fsService.collection(pathToSubjects)
                .subscribe((subjects: Subject[]) => {
                    this.organizeSubjects(subjects)
                    resolve(subjects)
                })
        })
        return promise
    }

    organizeSubjects(subjects: Subject[]) {
        // console.log(subjects)
        const skimmedSubjectsArray = []
        subjects.forEach((subject: Subject) => {
            const skimmedSubjectArray: any = []
            skimmedSubjectArray.push(subject.subjectName)
            if (subject.topicsArray) {
                const skimmedTopicsArray: any = []
                subject.topicsArray.forEach((topic: Topic) => {
                    skimmedTopicsArray.push(topic.topicName)
                    if (topic.itemsArray) {
                        const skimmedItemsArray: string[] = [];
                        topic.itemsArray.forEach((item: Item) => {
                            skimmedItemsArray.push(item.itemName)
                        })
                        if (skimmedItemsArray.length) {
                            skimmedTopicsArray.push(skimmedItemsArray)
                        }
                    }
                })
                if (skimmedTopicsArray.length) {
                    skimmedSubjectArray.push(skimmedTopicsArray)
                }
            }
            skimmedSubjectsArray.push(skimmedSubjectArray)
        })
        console.log(skimmedSubjectsArray)
        this.dataMap = new Map(skimmedSubjectsArray)
        // return skimmedSubjectsArray
    }

    getChildren(node: string) {
        return of(this.dataMap.get(node))
    }

    isExpandable(node: string): boolean {
        // console.log(node)
        // return true;
        return this.dataMap.has(node);
    }
    rootLevelNodes: string[] = [
        'firebase', '4', 'subject-without-topics'
    ]
}
