import { Routes } from "@angular/router";

export const MODEL_FUNCTION_ROUTES: Routes = [
    {
        path: 'basal',
        loadComponent: () => import('./basal/basal.component')
            .then(c => c.BasalComponent)
    }
]
