import { Injectable, inject } from '@angular/core';
import { FirestoreService } from '../../shared/firestore.service';
import { Item, Subject, Topic } from '../navigation.service';
import { of, take } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class NestedNavigationService {

    baseUrl: string = 'navigation'
    fsService = inject(FirestoreService)
    book = [];
    nodes: string[] = []

    rootLevelNodes: string[] = [];


    getChildren(node: string) {
        const bookMap = new Map(this.book)
        return of(bookMap.get(node));
    }
    addNode(node: string) {
        this.nodes.push(node)
    }
    getNodes() {
        return this.nodes;
    }

    isExpandable(node: string) {
        const bookMap = new Map(this.book)
        return bookMap.has(node)
    }


    getBook(): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            this.fsService.collection(this.baseUrl).pipe(take(1)).subscribe((subjects: Subject[]) => {
                const book = this.organizeSubjects(subjects)

                resolve(book);
            })
        })
        return promise
    }

    organizeSubjects(subjects: Subject[]) {
        const book: any = [];

        subjects.forEach((subject: Subject) => {
            this.rootLevelNodes.push(subject.subjectName)
            const subjectBooklet = []
            subjectBooklet.push(subject.subjectName)
            const topicNames: string[] = []
            subject.topicsArray.forEach((topic: Topic) => {
                topicNames.push(topic.topicName)
                const itemBooklet = []
                const itemNames = []
                topic.itemsArray.forEach((item: Item) => {
                    itemNames.push(item.itemName)
                    itemBooklet.push(topic.topicName)
                    itemBooklet.push(itemNames)
                })
                book.push(itemBooklet)
            })
            subjectBooklet.push(topicNames)
            book.push(subjectBooklet)
        })
        this.book = book
        return book
    }


    getRootLevelNodes() {
        return this.rootLevelNodes;
    }
}




