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

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor() { }

    firestore = inject(Firestore)


    addDoc(path: string, data: object): Promise<DocumentReference<object, DocumentData>> {
        console.log(path)
        console.log(data)
        const collectionRef = collection(this.firestore, path)
        return addDoc(collectionRef, data)
    }

    collection(path): Observable<any> {
        const collectionRef = collection(this.firestore, path)
        return collectionData(collectionRef, { idField: 'id' })
    }
    deleteDoc(path): Promise<void> {
        const docRef = doc(this.firestore, path)
        return deleteDoc(docRef);
    }
    updateDoc(path: string, value): Promise<void> {
        const docRef = doc(this.firestore, path)
        return updateDoc(docRef, value)
    }
    setDoc(path, object): Promise<void> {
        const docRef = doc(this.firestore, path);
        return setDoc(docRef, object)
    }
    getDoc(path): Observable<DocumentData> {
        const docRef = doc(this.firestore, path)
        return docData(docRef)
    }

}
