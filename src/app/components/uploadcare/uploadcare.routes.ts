import { Routes } from "@angular/router";

export const UPLOADCARE_ROUTES: Routes = [
    {
        path: 'monsterlessons',
        loadComponent: () => import('./monsterlessons/monsterlessons.component')
            .then(c => c.MonsterlessonsComponent)
    }
]
