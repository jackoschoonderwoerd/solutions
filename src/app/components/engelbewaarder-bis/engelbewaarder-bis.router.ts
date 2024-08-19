import { Routes } from "@angular/router";

export const ENGELBEWAARDER_BIS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./visitor/home/home.component')
            .then(c => c.HomeComponent)
    },
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
    },
    {
        path: 'snacks',
        loadComponent: () => import('./visitor/snacks/snacks.component')
            .then(c => c.SnacksComponent)
    },
    {
        path: 'exhibitions',
        loadComponent: () => import('./visitor/exhibitions/exhibitions.component')
            .then(c => c.ExhibitionsComponent)
    },
    {
        path: 'exhibition-details',
        loadComponent: () => import('./visitor/exhibitions/exhibition/exhibition-details/exhibition-details.component')
            .then(c => c.ExhibitionDetailsComponent)
    },
    {
        path: '**', redirectTo: 'home', pathMatch: 'full'
    },
]
