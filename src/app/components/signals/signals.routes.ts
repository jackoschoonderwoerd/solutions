import { Routes } from "@angular/router";

export const SIGNALS_ROUTES: Routes = [
    {
        path: 'vasco',
        loadComponent: () => import('./vasco/vasco.component')
            .then(c => c.VascoComponent)
    },
    {
        path: 'zoaib',
        loadComponent: () => import('./zoaib/zoaib.component')
            .then(c => c.ZoaibComponent)
    },
    {
        path: 'kurata',
        loadComponent: () => import('./kurata/kurata.component')
            .then(c => c.KurataComponent)
    }
]
