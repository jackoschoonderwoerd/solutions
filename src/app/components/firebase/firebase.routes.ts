import { Routes } from "@angular/router";

export const FIREBASE_ROUTES: Routes = [
    {
        path: 'firestore',
        loadChildren: () => import('./firestore/firestore.routes')
            .then(r => r.FIRESTORE_ROUTES)
    }
]
