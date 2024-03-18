import { Injectable } from '@angular/core';

export interface Item {
    itemName: string
}

export interface Topic {
    topicName: string;
    itemsArray: Item[]
}

export interface Subject {
    id?: string;
    subjectName: string;
    topicsArray: Topic[];
}


@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor() { }

    getSubjects() {
        return this.subjects;
    }
    getMenuItems() {
        return this.menuItems;
    }

    subjects: Subject[] = [
        {
            subjectName: 'firebase',
            topicsArray: [
                {
                    topicName: 'firestore',
                    itemsArray: [
                        { itemName: 'addDoc' },
                        { itemName: 'collection' }
                    ]
                },
                {
                    topicName: 'storage',
                    itemsArray: [
                        {
                            itemName: 'deleteFile'
                        },
                        {
                            itemName: 'upload file'
                        }
                    ]
                }
            ]

        },
        {
            subjectName: 'images',
            topicsArray: [
                {
                    topicName: 'upload',
                    itemsArray: []
                }
            ]
        }
    ]
    menuItems: string[] = [
        'signals',
        'ngrx-signals',
        'update-ng',
        'at-if',
        'at-for',
        'ng-module',
        'camera',
        'crop',
        'highlights',
        'prism',
        'loadingindicator',
        'count-visitors',
        'ngx-translate',
        'google-translate',
        'mat-theme',
        'form-array',
        'add-image',
        'uploadcare',
        'viewchild',
        'text-editor',
        'async-await',
        'dynamic-nested-menu',
        'map',
        'map-constructor',
        'model-function'
    ]
}
