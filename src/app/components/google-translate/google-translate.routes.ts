import { Routes } from "@angular/router";

export const GOOGLE_TRANSLATE_ROUTES: Routes = [
    {
        path: 'swe',
        loadComponent: () => import('./swe/swe.component')
            .then(c => c.SweComponent)
    }
]
