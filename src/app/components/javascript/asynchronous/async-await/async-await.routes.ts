import { Routes } from "@angular/router";

export const ASYNC_AWAIT_ROUTES: Routes = [
    {
        path: 'ayyaz',
        loadComponent: () => import('./ayyaz/ayyaz.component')
            .then(c => c.AyyazComponent)
    }
]
