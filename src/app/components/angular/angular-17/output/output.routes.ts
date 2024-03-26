import { Routes } from "@angular/router";

export const OUTPUT_ROUTES: Routes = [
    {
        path: 'vasco',
        loadComponent: () => import('./vasco/vasco.component')
            .then(c => c.VascoComponent)
    }
]
