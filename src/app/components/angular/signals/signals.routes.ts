import { Routes } from "@angular/router";

export const SIGNALS_ROUTES: Routes = [
    {
        path: 'model-function',
        loadComponent: () => import('./model-function/model-function.component')
            .then(c => c.ModelFunctionComponent),
        loadChildren: () => import('./model-function/model-function.routes')
            .then(r => r.MODEL_FUNCTION_ROUTES)
    },
]
