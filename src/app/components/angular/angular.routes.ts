import { Routes } from "@angular/router";

export const ANGULAR_ROUTES: Routes = [
    {
        path: 'signals',
        loadChildren: () => import('./signals/signals.routes')
            .then(r => r.SIGNALS_ROUTES)
    },
]
