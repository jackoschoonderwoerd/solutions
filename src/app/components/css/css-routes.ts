import { Routes } from "@angular/router";

export const CSS_ROUTES: Routes = [
    {
        path: 'animations',
        loadComponent: () => import('./animations/animations.component')
            .then(c => c.AnimationsComponent)
    },
    {
        path: 'selectors',
        loadComponent: () => import('./selectors/selectors.component')
            .then(c => c.SelectorsComponent)
    },
    {
        path: 'aspect-ratio',
        loadComponent: () => import('./aspect-ratio/aspect-ratio.component')
            .then(c => c.AspectRatioComponent)
    }
]
