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
        'add-image',
        'async-await',
        'at-for',
        'at-if',
        'camera',
        'control-value-accessor',
        'count-visitors',
        'crop',
        'css',
        'dynamic-nested-menu',
        'engelbewaarder-bis',
        'engelbewaarder',
        'form-array',
        'google-translate',
        'highlights',
        'loading-indicator',
        'map-constructor',
        'map',
        'mat-theme',
        'model-function',
        'ng-module',
        'ngrx-signals',
        'ngx-translate',
        'prism',
        'signals',
        'text-editor',
        'update-ng',
        'uploadcare',
        'viewchild',
        'timepicker',
        'webpage-in-app',
        'images'
    ]
}
