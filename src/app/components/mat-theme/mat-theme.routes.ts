import { Routes } from "@angular/router";

export const MAT_THEME_ROUTES: Routes = [
    {
        path: 'ayyaz',
        loadComponent: () => import('./ayyaz/ayyaz.component')
            .then(c => c.AyyazComponent)
    }
]
