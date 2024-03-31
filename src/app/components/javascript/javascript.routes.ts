import { Routes } from "@angular/router";

export const JAVASCRIPT_ROUTES: Routes = [
    {
        path: 'asynchronous',
        loadChildren: () => import('./asynchronous/asynchronous.routes')
            .then(r => r.ASYNCHRONOUS_ROUTES)
    },
    {
        path: 'arrays',
        loadChildren: () => import('./arrays/arrays.routes')
            .then(r => r.ARRAYS_ROUTES)
    }
]
