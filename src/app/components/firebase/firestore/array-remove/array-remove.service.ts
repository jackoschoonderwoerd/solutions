import { Injectable, inject } from '@angular/core';

import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    collectionData,
    collectionGroup,
    deleteDoc,
    doc,
    docData,
    DocumentData,
    DocumentReference,
    Firestore,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { FirebaseError } from '@angular/fire/app';

@Injectable({
    providedIn: 'root'
})
export class ArrayRemoveService {

    constructor() { }

    firestore = inject(Firestore)



    removeElementFormHobbyNamesArray(pathToDocument: string, elementName: string) {
        const docRef = doc(this.firestore, pathToDocument)
        return updateDoc(docRef, {
            hobbyNames: arrayRemove(elementName)
        })
            .then((res: any) => console.log(res))
            .catch((err: FirebaseError) => console.log(`${err.message}`))
    }
    addElementToHobbyNamesArray(pathToDocument: string, hobbyName: string) {
        const docRef = doc(this.firestore, pathToDocument);
        return updateDoc(docRef, {
            hobbyNames: arrayUnion(hobbyName)
        })
    }
}
