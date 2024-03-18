import { Routes } from "@angular/router";

export const FIRESTORE_ROUTES: Routes = [
    {
        path: 'collection',
        loadComponent: () => import('./collection/collection.component')
            .then(c => c.CollectionComponent)
    },
    {
        path: 'doc',
        loadComponent: () => import('./doc/doc.component')
            .then(c => c.DocComponent)
    }
]
