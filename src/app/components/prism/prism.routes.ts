import { Routes } from "@angular/router";

export const PRISM_ROUTES: Routes = [
    {
        path: 'js-ua',
        loadComponent: () => import('./js-ua/js-ua.component')
            .then(c => c.JsUaComponent)
    },
    {
        path: 'atman',
        loadComponent: () => import('./atman/atman.component')
            .then(c => c.AtmanComponent)
    }

]
