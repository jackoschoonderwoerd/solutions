import { Routes } from "@angular/router";

export const HIGHLIGHTJS_ROUTES: Routes = [
    {
        path: 'jacko',
        loadComponent: () => import('./jacko/jacko.component')
            .then(c => c.JackoComponent)
    }
]
