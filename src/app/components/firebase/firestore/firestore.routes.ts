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
    },
    {
        path: 'update-doc',
        loadComponent: () => import('./update-doc/update-doc.component')
            .then(c => c.UpdateDocComponent)
    },
    {
        path: 'array-remove',
        loadComponent: () => import('./array-remove/array-remove.component')
            .then(c => c.ArrayRemoveComponent),
        loadChildren: () => import('./array-remove/array-remove.routes')
            .then(r => r.ARRAY_REMOVE_ROUTES)
    }
]
