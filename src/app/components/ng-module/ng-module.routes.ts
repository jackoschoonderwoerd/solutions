import { Routes } from "@angular/router";

export const NG_MODULE_ROUTES: Routes = [
    {
        path: 'java-brains',
        loadComponent: () => import('./java-brains/java-brains.component')
            .then(c => c.JavaBrainsComponent)
    }
]
