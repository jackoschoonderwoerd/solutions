import { Component, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { FirestoreService } from '../../../shared/firestore.service';
import { take } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
    selector: 'app-jacko',
    standalone: true,
    imports: [],
    templateUrl: './jacko.component.html',
    styleUrl: './jacko.component.scss'
})
export class JackoComponent implements OnInit {

    newCount: number;
    // counter = signal(0)
    // total = computed(() => this.counter() * 2)
    // actions: Signal<string[]> = signal<string[]>(['true', 'true', 'false'])

    fsService = inject(FirestoreService)
    ngOnInit(): void {
        const path = 'count-visitors/jacko/visitors-count'
        this.fsService.collection(path).pipe(take(1)).subscribe((data: any) => {
            if (data.length) {
                let currentCount = data[0].count;
                this.newCount = currentCount += 1
                const id = data[0].id
                this.addToCount(id, this.newCount)
            } else {
                this.startCount(path)
            }
        })
    }


    private startCount(path) {
        console.log('start counting')
        this.fsService.addDoc(path, { count: 1 })
            .then((res: DocumentReference) => {
                const path = 'count-visitors/jacko/visitors-count'
                this.fsService.collection(path).pipe(take(1)).subscribe((data: any) => {
                    this.newCount = data[0].count
                })
            })
    }

    private addToCount(id, newCount: number) {
        const newCountObject = { count: newCount }
        const path = `count-visitors/jacko/visitors-count/${id}`
        console.log(path)
        this.fsService.setDoc(path, newCountObject)
            .then((res: any) => {
                console.log(`visitor count updated; ${res}`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to update visitor count; ${err.message}`)
            })
    }
}

