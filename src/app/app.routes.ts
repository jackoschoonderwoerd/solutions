import { Routes } from '@angular/router';
import { SignalsComponent } from './components/signals/signals.component';

export const routes: Routes = [
    {
        path: 'signals',
        loadComponent: () => import('./components/signals/signals.component')
            .then(c => c.SignalsComponent),
        loadChildren: () => import('./components/signals/signals.routes')
            .then(r => r.SIGNALS_ROUTES)
    },
    {
        path: 'update-ng',
        loadComponent: () => import('./components/update-ng/update-ng.component')
            .then(c => c.UpdateNgComponent),
        loadChildren: () => import('./components/update-ng/update-ng.routes')
            .then(r => r.UPDATE_NG_ROUTES)
    },
    {
        path: 'at-if',
        loadComponent: () => import('./components/at-if/at-if.component')
            .then(c => c.AtIfComponent),
        loadChildren: () => import('./components/at-if/at-if.routes')
            .then(r => r.AT_IF_ROUTES)
    },
    {
        path: 'at-for',
        loadComponent: () => import('./components/at-for/at-for.component')
            .then(c => c.AtForComponent),
        loadChildren: () => import('./components/at-for/at-for.routes')
            .then(r => r.AT_FOR_ROUTES)
    },
    {
        path: 'ng-module',
        loadComponent: () => import('./components/ng-module/ng-module.component')
            .then(c => c.NgModuleComponent),
        loadChildren: () => import('./components/ng-module/ng-module.routes')
            .then(r => r.NG_MODULE_ROUTES)
    },
    {
        path: 'camera',
        loadComponent: () => import('./components/camera/camera.component')
            .then(c => c.CameraComponent),
        loadChildren: () => import('./components/camera/camera.routes')
            .then(r => r.CAMERA_ROUTES)
    }
];
