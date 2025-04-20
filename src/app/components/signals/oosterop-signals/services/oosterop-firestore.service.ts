import { EventEmitter, inject, Injectable } from '@angular/core';


import {
    addDoc,
    arrayRemove,
    arrayUnion,
    getDocs,
    getDoc,
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
import { firstValueFrom, merge, Observable } from 'rxjs';
import { Person } from '../../udemy-signals/models/person.model';
import { LoadingService } from '../../../../shared/loading/loading.service';
import { Band } from '../models/band.model';




@Injectable({
    providedIn: 'root'
})
export class OosteropFirestoreService {

    personToEdit = new EventEmitter<Person>()

    constructor() { }
    loadingService = inject(LoadingService)

    firestore = inject(Firestore)

    async collectionAsPromise(path: string, orderedBy: string, direction: any): Promise<Band[]> {
        const bandsRef = collection(this.firestore, path);
        const queryRef = query(bandsRef, orderBy(orderedBy, direction))
        const snapshot = await getDocs(queryRef)
        const bands: Band[] = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            bandname: doc.data().bandname,
        }))

        return bands
    }
    // C
    async addDoc(path: string, data: object): Promise<DocumentReference<object, DocumentData>> {
        const collectionRef = collection(this.firestore, path)
        return await addDoc(collectionRef, data)
    }
    // R
    async getDocAsync(path): Promise<any> {
        const docRef = doc(this.firestore, path)
        const person: any = firstValueFrom(docData(docRef, { idField: 'id' }))
        return person
    }

    async getTheDoc(path): Promise<any> {
        const docRef = doc(this.firestore, path)
        const snapshot = await getDoc(docRef)
        const person: Person = {
            ...snapshot.data(),
            name: snapshot.data().name,
            age: snapshot.data().age,
            id: snapshot.id,
            religion: snapshot.data().religion ? snapshot.data().religion : 'CATHOLIC'
        }
        return person
    }

    // U
    async setDocAsync(path, object): Promise<void> {
        const docRef = doc(this.firestore, path);
        return await setDoc(docRef, object)
    }
    // D
    async deleteDoc(path): Promise<void> {
        const docRef = doc(this.firestore, path)
        return deleteDoc(docRef);
    }

    async updateDoc(path: string, value): Promise<void> {
        const docRef = doc(this.firestore, path)
        return await updateDoc(docRef, value)
    }

    async updateDocReturnsUpdatedDocument(path: string, value): Promise<Person> {
        const docRef = doc(this.firestore, path)
        await updateDoc(docRef, value)
        return await this.getDocAsync(path)
    }

    async addDocReturnsTheNewElement(path: string, bandname: any): Promise<any> {
        const bandsCollection = collection(this.firestore, path)
        const docRef = await addDoc(bandsCollection, bandname)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            return { id: docRef.id, ...userData };
        } else {
            console.log('No such document!');
            return null;
        }

    }




    collection(path): Observable<any> {
        const collectionRef = collection(this.firestore, path)

        return collectionData(collectionRef, { idField: 'id' })
    }



    sortedCollection(path, orderedBy, direction) {
        const collectionRef = collection(this.firestore, path)
        const q = query(collectionRef, orderBy(orderedBy, direction))
        return collectionData(q, { idField: 'id' })
    }


    // updateDoc(path: string, value): Promise<void> {
    //     const docRef = doc(this.firestore, path)
    //     return updateDoc(docRef, value)
    // }
    setDoc(path, object): Promise<void> {
        const docRef = doc(this.firestore, path);
        return setDoc(docRef, object)
    }
    getDoc(path): Observable<DocumentData> {
        const docRef = doc(this.firestore, path)
        return docData(docRef, { idField: 'id' })
    }


    findDoc(path, field, value) {
        const collectionRef = collection(this.firestore, path)
        const queryRef = query(collectionRef, where(field, '==', value))
        return collectionData(queryRef, { idField: 'id' })
    }
    removeElementFromArray(pathToDocument: string, arrayName: string, value: object): Promise<void> {

        const docRef = doc(this.firestore, pathToDocument)
        return updateDoc(docRef, {
            [arrayName]: arrayRemove(value)
        })
    }
    addElementToArray(pathToDocument: string, arrayName: string, value: object): Promise<void> {
        console.log(arrayName)
        const docRef = doc(this.firestore, pathToDocument);
        return updateDoc(docRef, {
            // spiritsArray: arrayUnion(spirit)
            [arrayName]: arrayUnion(value)
        })
    }
    addElementToArrayF(pathToDocument: string, arrayName: string, value: object): Promise<void> {
        console.log(pathToDocument)
        console.log(arrayName)
        const docRef = doc(this.firestore, pathToDocument);
        return setDoc(
            docRef,
            {
                [arrayName]: arrayUnion(value)
            },
            {
                merge: true
            },
        )
    }
    async updateField(path: string, fieldName: string, newValue: unknown) {
        const docRef = doc(this.firestore, path);
        return await updateDoc(docRef, { [fieldName]: newValue })
    }
    findCollectionArray(path, fieldName, value) {
        const collectionRef = collection(this.firestore, path)
        const q = query(collectionRef, where(fieldName, '==', value))
        return collectionData(q, { idField: 'id' })
    }
}

