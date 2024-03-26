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

import { Spirit } from './engelbewaarder.component';

@Injectable({
    providedIn: 'root'
})
export class EngelbewaarderService {

    firestore = inject(Firestore)

    removeElementFromArray(pathToDocument: string, arrayName: string, spirit: Spirit): Promise<void> {
        const docRef = doc(this.firestore, pathToDocument)
        return updateDoc(docRef, {
            [arrayName]: arrayRemove(spirit)
        })
    }
    addElementToArray(pathToDocument: string, arrayName: string, spirit: Spirit): Promise<void> {
        const docRef = doc(this.firestore, pathToDocument);
        return updateDoc(docRef, {
            // spiritsArray: arrayUnion(spirit)
            [arrayName]: arrayUnion(spirit)
        })
    }

    getDoc(path): Observable<DocumentData> {
        const docRef = doc(this.firestore, path)
        return docData(docRef)
    }
    updateDoc(path: string, value: object): Promise<void> {
        const docRef = doc(this.firestore, path)
        return updateDoc(docRef, value)
    }
}
