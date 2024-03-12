import { Routes } from "@angular/router";

export const DYNAMIC_NESTED_MENU_ROUTES: Routes = [
    {
        path: 'dev',
        loadComponent: () => import('./dev/dev.component')
            .then(c => c.DevComponent)
    },

    {
        path: 'second-try',
        loadComponent: () => import('./second-try/second-try.component')
            .then(c => c.SecondTryComponent)
    }

]
