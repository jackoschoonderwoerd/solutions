import { Routes } from "@angular/router";

export const ASYNCHRONOUS_ROUTES: Routes = [
    {
        path: 'async-await',
        loadComponent: () => import('./async-await/async-await.component')
            .then(c => c.AsyncAwaitComponent),
        loadChildren: () => import('./async-await/async-await.routes')
            .then(r => r.ASYNC_AWAIT_ROUTES)

    }
]
