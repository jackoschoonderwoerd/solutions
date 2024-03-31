import { Routes } from "@angular/router";

export const ARRAYS_ROUTES: Routes = [
    {
        path: 'swap-elements',
        loadComponent: () => import('./swap-elements/swap-elements.component')
            .then(c => c.SwapElementsComponent)
    }
]
