import { Routes } from "@angular/router";

export const MAP_ROUTES: Routes = [
    {
        path: 'mosh',

        loadComponent: () => import('./mosh/mosh.component')
            .then(c => c.MoshComponent)
    }
]
