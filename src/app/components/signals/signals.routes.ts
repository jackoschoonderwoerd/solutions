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
    },
    {
        path: 'monsterlessons',
        loadComponent: () => import('./monsterlessons/monsterlessons.component')
            .then(c => c.MonsterlessonsComponent)
    },
    {
        path: 'max',
        loadComponent: () => import('./max/max.component')
            .then(c => c.MaxComponent)
    },
    {
        path: 'udemy-signals',
        loadComponent: () => import('./udemy-signals/udemy-signals.component')
            .then(c => c.UdemySignalsComponent)
    },
    {
        path: 'signals-store',
        loadComponent: () => import('./signal-store/signal-store.component')
            .then(c => c.SignalStoreComponent)
    },
    {
        path: 'oosterop-signals',
        loadComponent: () => import('./oosterop-signals/oosterop-signals.component')
            .then(c => c.OosteropSignalsComponent)
    }


]
