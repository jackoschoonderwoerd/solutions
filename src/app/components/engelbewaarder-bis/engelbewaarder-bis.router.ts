import { Routes } from "@angular/router";

export const ENGELBEWAARDER_BIS_ROUTES: Routes = [
    {
        path: 'beer',
        loadComponent: () => import('./visitor/beer/beer.component')
            .then(c => c.BeerComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./visitor/home/home.component')
            .then(c => c.HomeComponent)
    },
    {
        path: 'dinner',
        loadComponent: () => import('./visitor/dinner/dinner.component')
            .then(c => c.DinnerComponent)
    }
]
