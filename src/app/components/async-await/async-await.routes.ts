import { Routes } from '@angular/router';
export const ASYNC_AWAIT_ROUTES: Routes = [
    {
        path: 'beyond-java',
        loadComponent: () => import('./beyond-java/beyond-java.component')
            .then(c => c.BeyondJavaComponent)
    }
]
