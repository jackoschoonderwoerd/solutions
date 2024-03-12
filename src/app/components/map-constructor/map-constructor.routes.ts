import { Routes } from '@angular/router';
export const MAP_CONTRUCTOR_ROUTES: Routes = [
    {
        path: 'steve',
        loadComponent: () => import('./steve/steve.component').then(c => c.SteveComponent)
    },
    {
        path: 'monsterlessons',
        loadComponent: () => import('./monsterlessons/monsterlessons.component')
            .then(c => c.MonsterlessonsComponent)
    }
]
