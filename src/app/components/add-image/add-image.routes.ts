import { Routes } from '@angular/router';
export const ADD_IMAGE_ROUTES: Routes = [
    {
        path: 'ayyaz',
        loadComponent: () => import('./ayyaz/ayyaz.component')
            .then(c => c.AyyazComponent)

    },
    {
        path: 'shiksha',
        loadComponent: () => import('./shiksha/shiksha.component')
            .then(c => c.ShikshaComponent)
    }

]
