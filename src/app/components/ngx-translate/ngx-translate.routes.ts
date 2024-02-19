import { Routes } from "@angular/router";

export const NGX_TRANSLATE_ROUTES: Routes = [
    {
        path: 'hano',
        loadComponent: () => import('./hano/hano.component')
            .then(c => c.HanoComponent)
    }
]
