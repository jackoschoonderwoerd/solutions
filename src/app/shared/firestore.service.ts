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

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor() { }

    firestore = inject(Firestore)


    addDoc(path: string, imageData: object) {
        console.log(path)
        console.log(imageData)
        const collectionRef = collection(this.firestore, path)
        return addDoc(collectionRef, { imageData })
    }

    collection(path) {
        const collectionRef = collection(this.firestore, path)
        return collectionData(collectionRef, { idField: 'id' })
    }
    deleteDoc(path) {
        const docRef = doc(this.firestore, path)
        return deleteDoc(docRef);
    }

}
