import { Routes } from "@angular/router";

export const ARRAY_REMOVE_ROUTES: Routes = [
    {
        path: 'drinks',
        loadComponent: () => import('./drinks/drinks.component')
            .then(c => c.DrinksComponent)
    },
    {
        path: 'hobbies',
        loadComponent: () => import('./hobbies/hobbies.component')
            .then(c => c.HobbiesComponent)
    },
    {
        path: 'engelbewaarder',
        loadComponent: () => import('./engelbewaarder/engelbewaarder.component')
            .then(c => c.EngelbewaarderComponent)
    }
]
