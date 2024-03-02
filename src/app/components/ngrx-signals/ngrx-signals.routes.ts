import { Routes } from "@angular/router";

export const NGRX_SIGNALS_ROUTES: Routes = [
    {
        path: 'monsterlessons',
        loadComponent: () => import('./monsterlessons/monsterlessons.component')
            .then(c => c.MonsterlessonsComponent)
    },
    {
        path: 'vasco',
        loadComponent: () => import('./vasco/vasco.component')
            .then(c => c.VascoComponent)
    }
]
