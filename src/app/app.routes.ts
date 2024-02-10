import { Routes } from '@angular/router';
import { SignalsComponent } from './components/signals/signals.component';

export const routes: Routes = [
    {
        path: 'signals',
        loadComponent: () => import('./components/signals/signals.component')
            .then(c => c.SignalsComponent),
        loadChildren: () => import('./components/signals/signals.routes')
            .then(r => r.SIGNALS_ROUTES)
    }
];
