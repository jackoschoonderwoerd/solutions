import { Routes } from "@angular/router";

export const AT_FOR_ROUTES: Routes = [
    {
        path: 'vasco',
        loadComponent: () => import('./vasco/vasco.component')
            .then(c => c.VascoComponent)
    }

]
