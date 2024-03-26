import { Routes } from "@angular/router";

export const ANGULAR_ROUTES: Routes = [
    {
        path: 'signals',
        loadChildren: () => import('./signals/signals.routes')
            .then(r => r.SIGNALS_ROUTES)
    },
    {
        path: 'angular-17',
        loadChildren: () => import('./angular-17/angular-17.routes')
            .then(r => r.ANGULAR_17_ROUTES)
    }
]
