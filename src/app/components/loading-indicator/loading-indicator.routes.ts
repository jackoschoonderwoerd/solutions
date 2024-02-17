import { Routes } from "@angular/router";

export const LOADING_INDICATOR_ROUTES: Routes = [
    {
        path: 'vasco',
        loadComponent: () => import('./vasco/vasco.component')
            .then(c => c.VascoComponent)
    }


]
