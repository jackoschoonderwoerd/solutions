import { Routes } from "@angular/router";

export const COUNT_VISITORS_ROUTES: Routes = [
    {
        path: 'jacko',
        loadComponent: () => import('./jacko/jacko.component')
            .then(c => c.JackoComponent)
    }

]
