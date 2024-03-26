import { Routes } from "@angular/router";

export const ANGULAR_17_ROUTES: Routes = [
    {
        path: 'output',
        loadComponent: () => import('./output/output.component')
            .then(c => c.OutputComponent),
        loadChildren: () => import('./output/output.routes')
            .then(r => r.OUTPUT_ROUTES)
    }
]
